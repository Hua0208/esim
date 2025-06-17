import CredentialsProvider from 'next-auth/providers/credentials'
import type { NuxtError } from 'nuxt/app'
import { NuxtAuthHandler } from '#auth'

// import GoogleProvider from 'next-auth/providers/google'

// const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [

    // GoogleProvider.default({
    //   clientId: runtimeConfig.public.AUTH_PROVIDER_GOOGLE_CLIENT_ID,
    //   clientSecret: runtimeConfig.public.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET,
    // }),

    // @ts-expect-error 您需要在這裡使用 .default 才能在 SSR 期間正常工作。可能在某個時候通過 Vite 修復
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {}, // 物件是必需的，但可以留空。
      async authorize(credentials: any) {
        const { user } = await $fetch<any>(`${process.env.NUXT_PUBLIC_API_BASE_URL ?? '/api'}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
        }).catch((err: NuxtError) => {
          throw createError({
            statusCode: err.statusCode || 403,
            statusMessage: JSON.stringify(err.data),
          })
        })

        return user || null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      /*
       * 為了在會話中為用戶添加自定義參數，我們首先需要在 token 中添加這些參數
       * 然後這些參數將在 `session()` 回調中可用
       */
      if (user) {
        token.username = user.username
        token.fullName = user.fullName
        token.avatar = user.avatar
        token.abilityRules = user.abilityRules
        token.role = user.role
      }

      return token
    },
    async session({ session, token }) {
      // 將會話中用戶的自定義參數添加到 `jwt()` 回調中通過 `token` 參數添加的參數
      if (session.user) {
        session.user.username = token.username
        session.user.fullName = token.fullName
        session.user.avatar = token.avatar
        session.user.abilityRules = token.abilityRules
        session.user.role = token.role
      }

      return session
    },
  },
})
