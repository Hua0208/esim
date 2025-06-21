<!-- ❗Errors in the form are set on line 60 -->
<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
import type { User } from 'next-auth'

import { VForm } from 'vuetify/components/VForm'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRoute } from 'vue-router'
// import { useAuth } from '@/composables/useAuth'  // useAuth 是 Nuxt 全域 composable，不需要 import
// import { usePermissions } from '@/composables/usePermissions'  // 此文件已被刪除

const { signIn, data: sessionData } = useAuth()

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
})

const isPasswordVisible = ref(false)
const isTotpVisible = ref(false)

const route = useRoute()

const ability = useAbility()

const errors = ref<Record<string, string | undefined>>({
  username: undefined,
  password: undefined,
  totpToken: undefined,
})

const refVForm = ref<VForm>()

const credentials = ref({
  username: 'admin',
  password: 'localhost!',
  totpToken: '',
})

const rememberMe = ref(false)

// TOTP 相關狀態
const requireTotp = ref(false)
const totpUserId = ref<number | null>(null)
// const totpSessionId = ref<string | null>(null) // 不再需要 sessionId
const isVerifyingTotp = ref(false)

const errorMsg = computed(() => {
  switch (route.query.error) {
    case 'CredentialsSignin':
      return 'Invalid username or password'
    case 'AccessDenied':
      return 'Access denied'
    case 'default':
      return 'Login failed, please try again'
    default:
      return ''
  }
})

// 驗證 TOTP 代碼
const verifyTotp = async () => {
  if (!credentials.value.totpToken || !totpUserId.value) {
    errors.value.totpToken = 'Please enter verification code'
    return
  }

  try {
    isVerifyingTotp.value = true
    errors.value.totpToken = undefined

    // TOTP 驗證成功，重新調用 NextAuth 登入流程
    const loginResponse = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      username: credentials.value.username,
      password: credentials.value.password,
      totpToken: credentials.value.totpToken
    })

    if (loginResponse && loginResponse.error) {
      console.error('Login with TOTP failed:', loginResponse.error)
      errors.value.totpToken = 'Login failed after TOTP verification'
      return
    }

    // 登入成功
    errors.value = {}
    
    // 更新權限
    if (sessionData.value?.user?.abilityRules) {
      ability.update(sessionData.value.user.abilityRules)
    }

    // 導航到首頁
    navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true })
  } catch (error: any) {
    console.error('TOTP verification failed:', error)
    errors.value.totpToken = error.data?.message || 'Invalid verification code'
  } finally {
    isVerifyingTotp.value = false
  }
}

// 使用備用代碼
const useBackupCode = async () => {
  const backupCode = prompt('Please enter backup code:')
  if (!backupCode || !totpUserId.value) return

  try {
    isVerifyingTotp.value = true
    errors.value.totpToken = undefined

    const config = useRuntimeConfig()
    const response = await $fetch<any>(`${config.public.apiBaseUrl}/auth/totp/backup`, {
      method: 'POST',
      body: {
        userId: totpUserId.value,
        backupCode: backupCode
      }
    })

    // 備用代碼驗證成功，直接使用返回的 JWT token
    if (response.accessToken) {
      // 將 JWT token 存儲到 cookie 中
      const cookie = useCookie('auth-token', {
        default: () => null,
        watch: true,
        httpOnly: false,
        secure: true,
        sameSite: 'lax'
      })
      cookie.value = response.accessToken

      // 更新權限
      if (response.user?.abilityRules) {
        ability.update(response.user.abilityRules)
      }

      // 導航到首頁
      navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true })
    } else {
      errors.value.totpToken = 'Login failed after backup code verification'
    }
  } catch (error: any) {
    console.error('Backup code verification failed:', error)
    errors.value.totpToken = error.data?.message || 'Invalid backup code'
  } finally {
    isVerifyingTotp.value = false
  }
}

// 完成登入流程
const completeLogin = async () => {
  // 重置錯誤
  errors.value = {}

  // 更新權限 - 權限信息已經在 NextAuth session 中
  if (sessionData.value?.user?.abilityRules) {
    ability.update(sessionData.value.user.abilityRules)
  }

  navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true })
}

async function login() {
  const response = await signIn('credentials', {
    callbackUrl: '/',
    redirect: false,
    ...credentials.value,
  })

  // If error is not null => Error is occurred
  if (response && response.error) {
    try {
      const parsedError = JSON.parse(response.error)
      
      // 檢查是否需要 TOTP 驗證
      if (parsedError.requireTotp && parsedError.userId) {
        requireTotp.value = true
        totpUserId.value = parsedError.userId
        errors.value = {}
        return
      }
      
      // 自動對應 message 到欄位
      if (parsedError.message) {
        errors.value = {
          username: parsedError.message,
        }
      } else {
        errors.value = parsedError
      }
    } catch (e) {
      errors.value = {}
    }

    // If err => Don't execute further
    return
  }

  // Reset error on successful login
  errors.value = {}

  // 更新權限 - 權限信息已經在 NextAuth session 中
  if (sessionData.value?.user?.abilityRules) {
    ability.update(sessionData.value.user.abilityRules)
  }

  navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true })
}

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid) {
        if (requireTotp.value) {
          verifyTotp()
        } else {
          login()
        }
      }
    })
}

// 重置 TOTP 狀態
const resetTotpState = () => {
  requireTotp.value = false
  totpUserId.value = null
  credentials.value.totpToken = ''
  errors.value.totpToken = undefined
}

// 返回密碼登入
const backToPasswordLogin = () => {
  resetTotpState()
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <VAlert v-if="errorMsg" type="error" class="mb-4">{{ errorMsg }}</VAlert>
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <VCardTitle>
            <NuxtLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </NuxtLink>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- username (只在非 TOTP 模式下顯示) -->
              <VCol v-if="!requireTotp" cols="12">
                <AppTextField
                  v-model="credentials.username"
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  autofocus
                  :rules="[requiredValidator]"
                  :error-messages="errors.username"
                />
              </VCol>

              <!-- password (只在非 TOTP 模式下顯示) -->
              <VCol v-if="!requireTotp" cols="12">
                <AppTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between my-6">
                  <VCheckbox
                    :id="useId()"
                    v-model="rememberMe"
                    label="Remember me"
                  />
                  <NuxtLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </NuxtLink>
                </div>
              </VCol>

              <!-- TOTP 驗證碼輸入 -->
              <VCol v-if="requireTotp" cols="12">
                <AppTextField
                  v-model="credentials.totpToken"
                  label="Verification Code"
                  placeholder="123 456"
                  type="text"
                  autofocus
                  :rules="[
                    (v: string) => !!v || 'Please enter verification code',
                    (v: string) => /^\d{6}$/.test(v) || 'Please enter 6-digit code'
                  ]"
                  :error-messages="errors.totpToken"
                />
              </VCol>

              <!-- 登入按鈕 -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                  :loading="isVerifyingTotp"
                  :disabled="isVerifyingTotp"
                >
                  {{ requireTotp ? 'Verify' : 'Login' }}
                </VBtn>
              </VCol>

              <!-- TOTP 相關按鈕 -->
              <VCol v-if="requireTotp" cols="12">
                <div class="d-flex align-center justify-space-between">
                  <VBtn
                    variant="text"
                    color="primary"
                    @click="useBackupCode"
                    :disabled="isVerifyingTotp"
                  >
                    Use Backup Code
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="secondary"
                    @click="backToPasswordLogin"
                    :disabled="isVerifyingTotp"
                  >
                    Back
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
