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

const route = useRoute()

const ability = useAbility()

const errors = ref<Record<string, string | undefined>>({
  username: undefined,
  password: undefined,
})

const refVForm = ref<VForm>()

const credentials = ref({
  username: 'admin',
  password: 'admin',
})

const rememberMe = ref(false)

const errorMsg = computed(() => {
  switch (route.query.error) {
    case 'CredentialsSignin':
      return '帳號或密碼錯誤'
    case 'AccessDenied':
      return '權限不足'
    case 'default':
      return '登入失敗，請再試一次'
    default:
      return ''
  }
})

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
      // 自動對應 message 到欄位
      if (parsedError.message) {
        errors.value = {
          username: parsedError.message,
          //password: parsedError.message,
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
      if (isValid)
        login()
    })
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

        <!-- <VCardText>
          <h4 class="text-h4 mb-1">
             Welcome to <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻 -->
          <!-- </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VAlert
            color="primary"
            variant="tonal"
          >
            <p class="text-sm mb-2">
              Admin Email: <strong>admin@demo.com</strong> / Pass: <strong>admin</strong>
            </p>
            <p class="text-sm mb-0">
              Client Email: <strong>client@demo.com</strong> / Pass: <strong>client</strong>
            </p>
          </VAlert>
        </VCardText> --> 

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- username -->
              <VCol cols="12">
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

              <!-- password -->
              <VCol cols="12">
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

                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <!-- <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">New on our platform?</span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'register' }"
                >
                  Create an account
                </NuxtLink>
              </VCol> -->
              <!-- <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol> -->

              <!-- auth providers -->
              <!-- <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol> -->
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
