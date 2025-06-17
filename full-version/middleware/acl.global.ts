import { canNavigate } from '@layouts/plugins/casl'

export default defineNuxtRouteMiddleware(to => {
  /*
     * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
     * Examples of public routes are, 404, under maintenance, etc.
     */
  if (to.meta.public)
    return

  const { status } = useAuth()
  const isLoggedIn = status.value === 'authenticated'
  console.log('isLoggedIn', isLoggedIn)
  console.log('status', status)
  /*
      如果用戶已登入且嘗試訪問登入頁面，則重定向到首頁
      否則允許訪問該頁面
      (警告：不要使用 return 語句允許繼續執行，因為後續代碼會檢查權限)
     */
  if (to.meta.unauthenticatedOnly) {
    if (isLoggedIn)
      return navigateTo('/')
    else
      return undefined
  }

  if (!canNavigate(to) && to.matched.length) {
    /* eslint-disable indent */
    return navigateTo(isLoggedIn
      ? { name: 'not-authorized' }
      : {
          name: 'login',
          query: {
            ...to.query,
            to: to.fullPath !== '/' ? to.path : undefined,
          },
        })
    /* eslint-enable indent */
  }
})
