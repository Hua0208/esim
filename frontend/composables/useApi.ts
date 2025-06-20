import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  //  const accessToken = useCookie('accessToken')
  // 使用 NextAuth session 而不是 accessToken cookie
  const { data: session, signOut } = useAuth()
  
  // 創建認證 headers
  let authHeaders = {}
  if (session.value?.user) {
    // 只使用後端的 JWT token
    if (session.value.backendToken) {
      authHeaders = { Authorization: `Bearer ${session.value.backendToken}` }
    } else {
      console.error('JWT token 不存在，無法進行 API 調用')
      // 註解掉 base64 編碼回退邏輯
      /*
      console.log('JWT token 不存在，使用 base64 編碼')
      // 如果沒有 JWT token，回退到 base64 編碼（向後兼容）
      const authData = {
        username: session.value.user.username,
        role: session.value.user.role,
        email: session.value.user.email,
        timestamp: Date.now()
      }
      const base64Token = btoa(JSON.stringify(authData))
      authHeaders = { Authorization: `Bearer ${base64Token}` }
      */
    }
  }

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    key: toValue(url),
    //    headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
    headers: authHeaders,
    // 確保只在客戶端執行
    server: false,
    // 跨網域認證設定：
    // 如果前後端網域不同，需要添加以下設定：
    // credentials: 'include', // 讓瀏覽器自動帶 cookie
    // 注意：這需要後端 CORS 設定允許 credentials
    // 添加錯誤處理
    onResponseError({ response }) {
      // 如果收到 401 錯誤，可能是 token 過期
      if (response.status === 401) {
        console.log('Token 可能已過期，自動登出')
        signOut({ redirect: false })
        navigateTo('/login')
      }
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
