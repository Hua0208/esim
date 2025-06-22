<script lang="ts" setup>
import PasswordConfirmationDialog from '@/components/dialogs/PasswordConfirmationDialog.vue'
import laptopGirl from '@images/illustrations/laptop-girl.png'
import { useApi } from '@/composables/useApi'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 表單驗證狀態
const formErrors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  general: ''
})

// 載入狀態
const isLoading = ref(false)

// 成功訊息
const successMessage = ref('')

// TOTP 狀態
const totpStatus = ref<{
  totpEnabled: boolean
  backupCodes?: string[]
} | null>(null)
const isLoadingTotpStatus = ref(false)

const passwordRequirements = [
  '至少8個字元',
  '至少一個小寫字母',
  '至少一個數字, 符號, 或空白字元',
]

// 獲取用戶資料（包括 TOTP 狀態）
const fetchUserProfile = async () => {
  try {
    isLoadingTotpStatus.value = true
    
    const { data, error } = await useApi('/auth/profile')
    
    if (error.value) {
      console.error('獲取用戶資料失敗:', error.value)
      return
    }
    
    const responseData = data.value as any

    // API 回應的資料在 data.value.data 中
    if (responseData && responseData.data) {
      const userData = responseData.data
      totpStatus.value = {
        totpEnabled: userData.totpEnabled || false,
        backupCodes: userData.backupCodes || []
      }
    }
  } catch (err) {
    console.error('獲取用戶資料錯誤:', err)
  } finally {
    isLoadingTotpStatus.value = false
  }
}

// 密碼強度驗證
const validatePassword = (password: string) => {
  const errors = []
  if (password.length < 8) errors.push('密碼至少需要8個字元')
  if (!/[a-z]/.test(password)) errors.push('密碼需要包含至少一個小寫字母')
  if (!/[0-9!@#$%^&*(),.?":{}|<> ]/.test(password)) errors.push('密碼需要包含至少一個數字、符號或空白字元')
  return errors
}

// 表單驗證
const validateForm = () => {
  formErrors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  }

  let isValid = true

  // 驗證當前密碼
  if (!currentPassword.value) {
    formErrors.value.currentPassword = '請輸入當前密碼'
    isValid = false
  }

  // 驗證新密碼
  if (!newPassword.value) {
    formErrors.value.newPassword = '請輸入新密碼'
    isValid = false
  } else {
    const passwordErrors = validatePassword(newPassword.value)
    if (passwordErrors.length > 0) {
      formErrors.value.newPassword = passwordErrors.join(', ')
      isValid = false
    }
  }

  // 驗證確認密碼
  if (!confirmPassword.value) {
    formErrors.value.confirmPassword = '請確認新密碼'
    isValid = false
  } else if (newPassword.value !== confirmPassword.value) {
    formErrors.value.confirmPassword = '確認密碼與新密碼不符'
    isValid = false
  }

  return isValid
}

// 修改密碼
const changePassword = async () => {
  if (!validateForm()) return

  isLoading.value = true
  formErrors.value.general = ''
  successMessage.value = ''

  try {
    const { data, error } = await useApi('/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      }
    })

    if (error.value) {
      // 處理錯誤回應
      const errorData = error.value.data
      if (errorData && errorData.message) {
        formErrors.value.general = errorData.message
      } else {
        formErrors.value.general = '修改密碼失敗，請再試一次'
      }
      return
    }

    // 成功
    successMessage.value = '密碼修改成功！'
    
    // 清空表單
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    
    // 3秒後清除成功訊息
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (err) {
    console.error('修改密碼錯誤:', err)
    formErrors.value.general = '修改密碼失敗，請再試一次'
  } finally {
    isLoading.value = false
  }
}

// 重置表單
const resetForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  formErrors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  }
  successMessage.value = ''
}

// TOTP 相關
const isOneTimePasswordDialogVisible = ref(false)
const isPasswordConfirmationDialogVisible = ref(false)

// 處理 TOTP 啟用成功
const handleTotpEnabled = (backupCodes: string[]) => {
  // 更新 TOTP 狀態
  totpStatus.value = {
    totpEnabled: true,
    backupCodes: backupCodes
  }
  
  // 關閉對話框
  isOneTimePasswordDialogVisible.value = false
}

// 禁用 TOTP
const disableTotp = async (password: string) => {
  try {
    const { error } = await useApi('/auth/totp/disable', {
      method: 'POST',
      body: { password },
      skipGlobalErrorHandler: true,
    } as any)

    if (error.value) {
      // 本地處理錯誤，而不是觸發全域登出
      alert(error.value.data?.message || '禁用雙因素驗證失敗，請檢查您的密碼。')

      return
    }

    // 更新狀態
    totpStatus.value = {
      totpEnabled: false,
      backupCodes: [],
    }

    alert('雙因素驗證已禁用')
  }
  catch (err) {
    console.error('禁用 TOTP 錯誤:', err)
    alert('禁用雙因素驗證失敗')
  }
}

const openPasswordConfirmationDialog = () => {
  isPasswordConfirmationDialogVisible.value = true
}

// 頁面載入時獲取用戶資料
onMounted(() => {
  // 檢查 session 狀態
  const { data: session } = useAuth()
  console.log('Session 狀態:', session.value)
  console.log('Backend Token:', session.value?.backendToken)
  
  fetchUserProfile()
})

const recentDevicesHeaders = [
  { title: 'BROWSER', key: 'browser' },
  { title: 'DEVICE', key: 'device' },
  { title: 'LOCATION', key: 'location' },
  { title: 'RECENT ACTIVITY', key: 'recentActivity' },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'tabler-brand-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'tabler-device-mobile', color: 'error' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'tabler-brand-android', color: 'success' },
  },
  {
    browser: 'Chrome on macOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'tabler-brand-apple', color: 'secondary' },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'tabler-brand-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'tabler-brand-android', color: 'success' },
  },
]
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="密碼修改">
        <!-- 成功訊息 -->
        <VAlert
          v-if="successMessage"
          type="success"
          variant="tonal"
          closable
          class="ma-4"
        >
          {{ successMessage }}
        </VAlert>

        <!-- 一般錯誤訊息 -->
        <VAlert
          v-if="formErrors.general"
          type="error"
          variant="tonal"
          closable
          class="ma-4"
        >
          {{ formErrors.general }}
        </VAlert>

        <VForm @submit.prevent="changePassword">
          <VCardText class="pt-0">
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <AppTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="舊密碼"
                  autocomplete="current-password"
                  placeholder="············"
                  :error-messages="formErrors.currentPassword"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <AppTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="新密碼"
                  autocomplete="new-password"
                  placeholder="············"
                  :error-messages="formErrors.newPassword"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <AppTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="確認新密碼"
                  autocomplete="new-password"
                  placeholder="············"
                  :error-messages="formErrors.confirmPassword"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <h6 class="text-h6 text-medium-emphasis mb-4">
              密碼安全要求:
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                class="text-medium-emphasis"
              >
                <template #prepend>
                  <VIcon
                    size="10"
                    icon="tabler-circle-filled"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isLoading ? '修改中...' : '儲存變更' }}
            </VBtn>

            <VBtn
              type="button"
              color="secondary"
              variant="tonal"
              :disabled="isLoading"
              @click="resetForm"
            >
              重置
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <VCol cols="12">
      <VCard title="雙因素驗證">
        <VCardText>
          <!-- 載入中 -->
          <div v-if="isLoadingTotpStatus" class="d-flex justify-center mb-4">
            <VProgressCircular
              indeterminate
              color="primary"
            />
          </div>

          <!-- TOTP 已啟用 -->
          <div v-else-if="totpStatus?.totpEnabled">
            <VAlert
              type="success"
              variant="tonal"
              class="mb-4"
            >
              <template #title>雙因素驗證已啟用</template>
              <template #text>
                您的帳戶已受到雙因素驗證保護。登入時需要密碼和驗證碼。
              </template>
            </VAlert>

            <div class="d-flex gap-4">
              <VBtn
                color="error"
                variant="tonal"
                @click="openPasswordConfirmationDialog"
              >
                禁用雙因素驗證
              </VBtn>
            </div>
          </div>

          <!-- TOTP 未啟用 -->
          <div v-else>
            <h5 class="text-h5 text-medium-emphasis mb-4">
              兩步驟驗證尚未啟用。
            </h5>
            <p class="mb-6">
              兩步驟驗證可以增加帳號的安全性，需要密碼和驗證碼才能登入。
              <a
                href="javascript:void(0)"
                class="text-decoration-none"
              >Learn more.</a>
            </p>

            <VBtn @click="isOneTimePasswordDialogVisible = true">
              啟用兩步驟驗證
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Recent Devices -->
    <!-- <VCol cols="12">
      <!-- 👉 Table -->
      <!-- <VCard title="Recent Devices">
        <VDivider />

        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          hide-default-footer
          class="text-no-wrap"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                size="22"
                :icon="item.deviceIcon.icon"
                :color="item.deviceIcon.color"
              />
              <div class="text-high-emphasis text-body-1 font-weight-medium">
                {{ item.browser }}
              </div>
            </div>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- SECTION Enable One time password -->
  <TwoFactorAuthDialog 
    v-model:is-dialog-visible="isOneTimePasswordDialogVisible" 
    @totp-enabled="handleTotpEnabled"
  />
  <!-- !SECTION -->

  <!-- SECTION Password Confirmation Dialog -->
  <PasswordConfirmationDialog
    v-model:is-dialog-visible="isPasswordConfirmationDialogVisible"
    @confirm="disableTotp"
  />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}

.server-close-btn {
  inset-inline-end: 0.5rem;
}
</style>
