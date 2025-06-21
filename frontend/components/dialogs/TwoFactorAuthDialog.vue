<script setup lang="ts">
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'totp-enabled', backupCodes: string[]): void
}
interface Props {
  isDialogVisible: boolean
  authAppCode?: string
}

const props = withDefaults(defineProps<Props>(), {
  isDialogVisible: false,
  authAppCode: '',
})

const emit = defineEmits<Emit>()

const config = useRuntimeConfig()
const { data: session } = useAuth()

// 創建 API 調用函數
const apiCall = async (endpoint: string, options: any = {}) => {
  const headers: Record<string, string> = {}
  
  if (session.value?.backendToken) {
    headers.Authorization = `Bearer ${session.value.backendToken}`
  }

  return await $fetch(`${config.public.apiBaseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  })
}

const authMethods = [
  {
    title: 'Authenticator Apps',
    desc: 'Get code from an app like Google Authenticator or Microsoft Authenticator.',
    value: 'authApp',
  },
]

const selectedMethod = ref('authApp')
const isAuthAppDialogVisible = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// TOTP 設置相關
const totpSetup = ref<{
  secret: string
  qrCode: string
  otpauthUrl: string
} | null>(null)

// 驗證代碼
const verificationCode = ref('')
const isVerifying = ref(false)

// 備用代碼
const backupCodes = ref<string[]>([])
const showBackupCodes = ref(false)

// 獲取 TOTP 設置
const getTotpSetup = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    const response = await apiCall('/auth/totp/setup') as any
    totpSetup.value = response.data
  } catch (error: any) {
    console.error('獲取 TOTP 設置失敗:', error)
    errorMessage.value = error.data?.message || '獲取 TOTP 設置失敗'
  } finally {
    isLoading.value = false
  }
}

// 驗證並啟用 TOTP
const enableTotp = async () => {
  if (!verificationCode.value || !totpSetup.value) {
    errorMessage.value = '請輸入驗證碼'
    return
  }

  try {
    isVerifying.value = true
    errorMessage.value = ''
    
    const response = await apiCall('/auth/totp/enable', {
      method: 'POST',
      body: {
        secret: totpSetup.value.secret,
        token: verificationCode.value
      }
    }) as any
    
    backupCodes.value = response.data.backupCodes
    showBackupCodes.value = true
    
    // 通知父組件 TOTP 已啟用
    emit('totp-enabled', backupCodes.value)
  } catch (error: any) {
    console.error('啟用 TOTP 失敗:', error)
    errorMessage.value = error.data?.message || '啟用 TOTP 失敗'
  } finally {
    isVerifying.value = false
  }
}

// 重新生成備用代碼
const regenerateBackupCodes = async () => {
  try {
    const password = prompt('請輸入您的密碼以重新生成備用代碼：')
    if (!password) return
    
    const response = await apiCall('/auth/totp/regenerate-backup', {
      method: 'POST',
      body: { password }
    }) as any
    
    backupCodes.value = response.data.backupCodes
    showBackupCodes.value = true
  } catch (error: any) {
    console.error('重新生成備用代碼失敗:', error)
    errorMessage.value = error.data?.message || '重新生成備用代碼失敗'
  }
}

// 關閉對話框
const closeDialog = () => {
  emit('update:isDialogVisible', false)
  // 重置狀態
  totpSetup.value = null
  verificationCode.value = ''
  errorMessage.value = ''
  showBackupCodes.value = false
  backupCodes.value = []
}

// 打開驗證器應用程式設置
const openSelectedMethodDialog = async () => {
  if (selectedMethod.value === 'authApp') {
    await getTotpSetup()
    isAuthAppDialogVisible.value = true
    emit('update:isDialogVisible', false)
  }
}

// 監聽對話框開啟
watch(() => props.isDialogVisible, (newVal) => {
  if (newVal) {
    // 對話框開啟時重置狀態
    totpSetup.value = null
    verificationCode.value = ''
    errorMessage.value = ''
    showBackupCodes.value = false
    backupCodes.value = []
  }
})
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 800"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <VCard class="pa-2 pa-sm-10">
      <VCardText>
        <!-- 👉 Title -->
        <div class="mb-6">
          <h4 class="text-h4 text-center mb-2">
            雙因素驗證
          </h4>
          <p class="text-body-1 text-center mb-6">
            請選擇驗證方式來保護您的帳戶安全
          </p>
          <CustomRadios
            v-model:selected-radio="selectedMethod"
            :radio-content="authMethods"
            :grid-column="{ cols: '12' }"
          >
            <template #default="items">
              <div class="d-flex flex-column">
                <h6 class="text-h6">
                  {{ items.item.title }}
                </h6>
                <p class="text-body-2 mb-0">
                  {{ items.item.desc }}
                </p>
              </div>
            </template>
          </CustomRadios>
        </div>

        <div class="d-flex gap-4 justify-center">
          <VBtn 
            @click="openSelectedMethodDialog"
            :loading="isLoading"
            :disabled="isLoading"
          >
            繼續
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            @click="closeDialog"
          >
            取消
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- TOTP 設置對話框 -->
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="isAuthAppDialogVisible"
    @update:model-value="(val) => isAuthAppDialogVisible = val"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isAuthAppDialogVisible = false" />

    <VCard class="pa-2 pa-sm-10">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-6">
          設置驗證器應用程式
        </h4>

        <!-- 錯誤訊息 -->
        <VAlert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          class="mb-6"
          closable
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </VAlert>

        <!-- 備用代碼顯示 -->
        <div v-if="showBackupCodes" class="mb-6">
          <VAlert
            type="warning"
            variant="tonal"
            class="mb-4"
          >
            <template #title>重要：請保存您的備用代碼</template>
            <template #text>
              請將以下備用代碼保存在安全的地方。如果您無法使用驗證器應用程式，可以使用這些代碼來登入。
            </template>
          </VAlert>

          <div class="d-flex flex-wrap gap-2 mb-4">
            <VChip
              v-for="(code, index) in backupCodes"
              :key="index"
              variant="outlined"
              class="font-mono"
            >
              {{ code }}
            </VChip>
          </div>

          <div class="d-flex gap-4 justify-center">
            <VBtn
              color="primary"
              @click="isAuthAppDialogVisible = false"
            >
              完成設置
            </VBtn>
            <VBtn
              color="secondary"
              variant="tonal"
              @click="regenerateBackupCodes"
            >
              重新生成備用代碼
            </VBtn>
          </div>
        </div>

        <!-- TOTP 設置表單 -->
        <div v-else>
          <h5 class="text-h5 mb-2">
            驗證器應用程式
          </h5>

          <p class="text-body-1 mb-6">
            使用 Google Authenticator、Microsoft Authenticator、Authy 或 1Password 等驗證器應用程式掃描下方的 QR 碼。它將為您生成一個 6 位數的代碼，請在下方輸入。
          </p>

          <!-- QR Code -->
          <div v-if="totpSetup" class="mb-6">
            <div class="d-flex justify-center mb-4">
              <VImg
                :src="totpSetup.qrCode"
                width="200"
                height="200"
                class="border rounded"
              />
            </div>

            <VAlert
              :title="totpSetup.secret"
              text="如果您無法掃描 QR 碼，可以手動輸入上方的密鑰。"
              variant="tonal"
              color="warning"
              class="mb-6"
            />
          </div>

          <!-- 載入中 -->
          <div v-else-if="isLoading" class="d-flex justify-center mb-6">
            <VProgressCircular
              indeterminate
              color="primary"
            />
          </div>

          <!-- 驗證碼輸入 -->
          <VForm @submit.prevent="enableTotp">
            <AppTextField
              v-model="verificationCode"
              name="verification-code"
              label="輸入驗證碼"
              placeholder="123 456"
              class="mb-6"
              :rules="[
                (v: string) => !!v || '請輸入驗證碼',
                (v: string) => /^\d{6}$/.test(v) || '請輸入 6 位數驗證碼'
              ]"
            />

            <div class="d-flex justify-end flex-wrap gap-4">
              <VBtn
                color="secondary"
                variant="tonal"
                @click="isAuthAppDialogVisible = false"
              >
                取消
              </VBtn>

              <VBtn
                type="submit"
                :loading="isVerifying"
                :disabled="isVerifying || !verificationCode || verificationCode.length !== 6"
              >
                啟用雙因素驗證
                <VIcon
                  end
                  icon="tabler-arrow-right"
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<!--
使用示例：

<template>
  <TwoFactorAuthDialog
    v-model:is-dialog-visible="isTwoFactorDialogVisible"
    @totp-enabled="handleTotpEnabled"
  />
</template>

<script setup>
const isTwoFactorDialogVisible = ref(false)

const handleTotpEnabled = (backupCodes: string[]) => {
  console.log('TOTP 已啟用，備用代碼：', backupCodes)
  // 可以在這裡顯示備用代碼或進行其他操作
}
</script>
-->
