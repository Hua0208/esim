export const $api = $fetch.create({

  // Request interceptor
  async onRequest({ options }) {
    // Set baseUrl for all API calls
    options.baseURL = useRuntimeConfig().public.apiBaseUrl || '/api'

    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },

  // Response interceptor
  async onResponseError({ response }) {
    // 如果收到 401 錯誤，清除認證狀態並重定向到登入頁面
    if (response.status === 401) {
      const { signOut } = useAuth()
      
      // 清除認證狀態
      await signOut({ redirect: false })
      
      // 清除相關 cookies
      const accessToken = useCookie('accessToken')
      const userData = useCookie('userData')
      const userAbilityRules = useCookie('userAbilityRules')
      
      accessToken.value = null
      userData.value = null
      userAbilityRules.value = null
      
      // 重定向到登入頁面
      await navigateTo('/login')
    }
  },
}) 