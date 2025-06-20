import type { DefaultSession } from 'next-auth'
import { Rule } from './plugins/casl/ability'


interface UserAdditionalData {
  username?: string
  fullName?: string
  avatar?: string
  role?: string
  abilityRules?: Rule[]
  accessToken?: string
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends UserAdditionalData {
    backendToken?: string
  }
}

declare module "next-auth" {
    
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserAdditionalData & DefaultSession['user']
    backendToken?: string
  }

  interface User extends UserAdditionalData { }
}