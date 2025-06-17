<template>
  <VCard class="session-debugger">
    <VCardTitle class="d-flex align-center justify-space-between">
      <span>Session 除錯工具</span>
      <VBtn
        icon
        size="small"
        @click="isExpanded = !isExpanded"
      >
        <VIcon>{{ isExpanded ? 'tabler-chevron-up' : 'tabler-chevron-down' }}</VIcon>
      </VBtn>
    </VCardTitle>
    
    <VExpandTransition>
      <VCardText v-show="isExpanded">
        <VRow>
          <!-- Session 狀態 -->
          <VCol cols="12" md="6">
            <VCard variant="outlined">
              <VCardTitle class="text-h6">Session 狀態</VCardTitle>
              <VCardText>
                <div class="d-flex flex-column gap-2">
                  <div class="d-flex justify-space-between">
                    <span>登入狀態:</span>
                    <VChip
                      :color="isLoggedIn ? 'success' : 'error'"
                      size="small"
                    >
                      {{ isLoggedIn ? '已登入' : '未登入' }}
                    </VChip>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>認證狀態:</span>
                    <span class="text-body-2">{{ status }}</span>
                  </div>
                  <div v-if="sessionData" class="d-flex justify-space-between">
                    <span>Session 過期時間:</span>
                    <span class="text-body-2">{{ formatExpires(sessionData.expires) }}</span>
                  </div>
                  <div v-if="sessionData" class="d-flex justify-space-between">
                    <span>是否已過期:</span>
                    <VChip
                      :color="isSessionExpired ? 'error' : 'success'"
                      size="small"
                    >
                      {{ isSessionExpired ? '已過期' : '有效' }}
                    </VChip>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- 權限檢查 -->
          <VCol cols="12" md="6">
            <VCard variant="outlined">
              <VCardTitle class="text-h6">權限檢查</VCardTitle>
              <VCardText>
                <div class="d-flex flex-column gap-2">
                  <div class="d-flex justify-space-between">
                    <span>當前路由:</span>
                    <span class="text-body-2">{{ currentRoute }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>路由權限:</span>
                    <span class="text-body-2">{{ routePermissions }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>canNavigate 結果:</span>
                    <VChip
                      :color="canNavigateResult ? 'success' : 'error'"
                      size="small"
                    >
                      {{ canNavigateResult ? '允許' : '拒絕' }}
                    </VChip>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>用戶權限:</span>
                    <span class="text-body-2">{{ userPermissions }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>CASL 權限:</span>
                    <VChip
                      :color="caslPermissionsCount > 0 ? 'success' : 'error'"
                      size="small"
                    >
                      {{ caslPermissionsCount }} 個規則
                    </VChip>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- 操作按鈕 -->
          <VCol cols="12">
            <VCard variant="outlined">
              <VCardTitle class="text-h6">操作</VCardTitle>
              <VCardText>
                <div class="d-flex flex-wrap gap-3">
                  <VBtn
                    color="error"
                    variant="outlined"
                    @click="clearSession"
                    :loading="isClearing"
                  >
                    <VIcon start>tabler-trash</VIcon>
                    清理 Session
                  </VBtn>
                  
                  <VBtn
                    color="warning"
                    variant="outlined"
                    @click="refreshSession"
                    :loading="isRefreshing"
                  >
                    <VIcon start>tabler-refresh</VIcon>
                    重新整理 Session
                  </VBtn>
                  
                  <VBtn
                    color="info"
                    variant="outlined"
                    @click="showSessionData"
                  >
                    <VIcon start>tabler-eye</VIcon>
                    顯示 Session 資料
                  </VBtn>

                  <VBtn
                    color="info"
                    variant="outlined"
                    @click="showCookieDetails = !showCookieDetails"
                  >
                    <VIcon start>tabler-cookie</VIcon>
                    {{ showCookieDetails ? '隱藏 Cookie 資料' : '顯示 Cookie 資料' }}
                  </VBtn>

                  <VBtn
                    color="primary"
                    variant="outlined"
                    @click="testPermissions"
                  >
                    <VIcon start>tabler-test-pipe</VIcon>
                    測試權限
                  </VBtn>

                  <VBtn
                    color="secondary"
                    variant="outlined"
                    @click="syncPermissions"
                    :loading="isSyncing"
                  >
                    <VIcon start>tabler-refresh-dot</VIcon>
                    同步權限
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <!-- Session 資料顯示 -->
        <VExpansionPanels v-if="showSessionDetails" class="mt-4">
          <VExpansionPanel>
            <VExpansionPanelTitle>Session 詳細資料</VExpansionPanelTitle>
            <VExpansionPanelText>
              <pre class="text-body-2">{{ JSON.stringify(sessionData, null, 2) }}</pre>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <!-- Cookie 資料顯示 -->
        <VExpansionPanels v-if="showCookieDetails" class="mt-4">
          <VExpansionPanel>
            <VExpansionPanelTitle>Cookie 詳細資料</VExpansionPanelTitle>
            <VExpansionPanelText>
              <div class="mb-2">
                <strong>userData Cookie:</strong>
                <pre class="text-body-2">{{ userDataCookieDisplay }}</pre>
              </div>
              <div>
                <strong>userAbilityRules Cookie:</strong>
                <pre class="text-body-2">{{ userAbilityRulesCookieDisplay }}</pre>
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <!-- 權限測試結果 -->
        <VExpansionPanels v-if="showPermissionTest" class="mt-4">
          <VExpansionPanel>
            <VExpansionPanelTitle>權限測試結果</VExpansionPanelTitle>
            <VExpansionPanelText>
              <pre class="text-body-2">{{ permissionTestResults }}</pre>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCardText>
    </VExpandTransition>
  </VCard>
</template>

<script setup lang="ts">
import { canNavigate } from '@layouts/plugins/casl'
import { useCookie } from '#app'

const { status, data: sessionData, signOut } = useAuth()
const ability = useAbility()
const route = useRoute()

const isExpanded = ref(false)
const isClearing = ref(false)
const isRefreshing = ref(false)
const isSyncing = ref(false)
const showSessionDetails = ref(false)
const showPermissionTest = ref(false)
const permissionTestResults = ref('')
const showCookieDetails = ref(false)

const userDataCookie = useCookie('userData')
const userAbilityRulesCookie = useCookie('userAbilityRules')

const userDataCookieDisplay = computed(() => {
  if (!userDataCookie || typeof userDataCookie.value === 'undefined' || userDataCookie.value === null) return '無'
  if (typeof userDataCookie.value === 'string') return userDataCookie.value
  return JSON.stringify(userDataCookie.value, null, 2)
})
const userAbilityRulesCookieDisplay = computed(() => {
  if (!userAbilityRulesCookie || typeof userAbilityRulesCookie.value === 'undefined' || userAbilityRulesCookie.value === null) return '無'
  if (typeof userAbilityRulesCookie.value === 'string') return userAbilityRulesCookie.value
  return JSON.stringify(userAbilityRulesCookie.value, null, 2)
})

const isLoggedIn = computed(() => status.value === 'authenticated')

const isSessionExpired = computed(() => {
  if (!sessionData.value?.expires) return false
  const now = Math.floor(Date.now() / 1000)
  const expires = new Date(sessionData.value.expires).getTime() / 1000
  return now > expires
})

const currentRoute = computed(() => route.path)

const routePermissions = computed(() => {
  const targetRoute = route.matched[route.matched.length - 1]
  if (targetRoute?.meta?.action && targetRoute?.meta?.subject) {
    return `${targetRoute.meta.action} ${targetRoute.meta.subject}`
  }
  return '無權限配置'
})

const canNavigateResult = computed(() => {
  try {
    return canNavigate(route)
  } catch (error) {
    console.error('canNavigate 檢查失敗:', error)
    return false
  }
})

const userPermissions = computed(() => {
  if (!sessionData.value?.user?.abilityRules) return '無權限'
  return sessionData.value.user.abilityRules.map(rule => `${rule.action} ${rule.subject}`).join(', ')
})

const caslPermissionsCount = computed(() => {
  try {
    // 嘗試獲取 CASL 的規則數量
    return ability.rules.length
  } catch (error) {
    return 0
  }
})

const formatExpires = (expires: string | undefined) => {
  if (!expires) return '無'
  return new Date(expires).toLocaleString('zh-TW')
}

const clearSession = async () => {
  try {
    isClearing.value = true
    console.log('開始清理 Session...')
    
    // 清除認證狀態
    await signOut({ redirect: false })
    
    // 清除相關 cookies
    userDataCookie.value = null
    userAbilityRulesCookie.value = null
    
    // 重置權限
    ability.update([])
    
    console.log('Session 清理完成')
    console.log('✅ Session 已清理')
    
  } catch (error) {
    console.error('清理 Session 時發生錯誤:', error)
    console.error('❌ 清理 Session 失敗')
  } finally {
    isClearing.value = false
  }
}

const refreshSession = async () => {
  try {
    isRefreshing.value = true
    console.log('重新整理 Session...')
    
    // 重新整理頁面來重新獲取 session
    await navigateTo(route.fullPath, { replace: true })
    
  } catch (error) {
    console.error('重新整理 Session 時發生錯誤:', error)
    console.error('❌ 重新整理 Session 失敗')
  } finally {
    isRefreshing.value = false
  }
}

const syncPermissions = async () => {
  try {
    isSyncing.value = true
    console.log('開始同步權限...')
    
    if (sessionData.value?.user?.abilityRules) {
      // 更新 CASL 權限
      ability.update(sessionData.value.user.abilityRules as any)
      
      // 更新 cookie
      userAbilityRulesCookie.value = sessionData.value.user.abilityRules as any
      
      console.log('✅ 權限同步完成')
      console.log('同步的權限:', sessionData.value.user.abilityRules)
    } else {
      console.log('❌ 沒有可同步的權限')
    }
    
  } catch (error) {
    console.error('同步權限時發生錯誤:', error)
    console.error('❌ 權限同步失敗')
  } finally {
    isSyncing.value = false
  }
}

const showSessionData = () => {
  showSessionDetails.value = !showSessionDetails.value
  if (showSessionDetails.value) {
    console.log('Session 資料:', sessionData.value)
  }
}

const testPermissions = () => {
  showPermissionTest.value = true
  
  const results = {
    當前路由: route.path,
    路由權限配置: routePermissions.value,
    canNavigate結果: canNavigateResult.value,
    用戶權限: userPermissions.value,
    CASL權限數量: caslPermissionsCount.value,
    權限檢查詳情: {
      目標路由: route.matched[route.matched.length - 1]?.path,
      目標路由權限: route.matched[route.matched.length - 1]?.meta,
      父路由權限: route.matched.slice(0, -1).map(r => ({
        path: r.path,
        meta: r.meta
      }))
    }
  }
  
  permissionTestResults.value = JSON.stringify(results, null, 2)
  console.log('權限測試結果:', results)
}
</script>

<style scoped>
.session-debugger {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 500px;
  max-width: 90vw;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

pre {
  /* background: #f5f5f5; */
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}
</style> 