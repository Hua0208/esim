import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

// 定義一個新的 interface 來擴展 UseFetchOptions
interface CustomUseFetchOptions<T> extends UseFetchOptions<T> {
  skipGlobalErrorHandler?: boolean
}

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: CustomUseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  const { data: session, signOut } = useAuth()
  
  // 創建認證 headers
  let authHeaders = {}
  if (session.value?.backendToken) {
    authHeaders = { Authorization: `Bearer ${session.value.backendToken}` }
  } else {
    console.warn('JWT token not found in session.')
  }

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    key: toValue(url),
    headers: authHeaders,
    // 確保只在客戶端執行
    server: false,
    // 跨網域認證設定：
    // 如果前後端網域不同，需要添加以下設定：
    // credentials: 'include', // 讓瀏覽器自動帶 cookie
    // 注意：這需要後端 CORS 設定允許 credentials
    // 添加錯誤處理
    onResponseError({ response }) {
      // 如果 skipGlobalErrorHandler 為 true，則跳過全域錯誤處理
      if (options.skipGlobalErrorHandler)
        return

      // 如果收到 401 錯誤，可能是 token 過期
      if (response.status === 401) {
        console.log('Token might be expired, signing out.')
        signOut({ redirect: false })
        navigateTo('/login')
      }
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
