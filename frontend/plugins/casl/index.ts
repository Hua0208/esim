import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'
import type { Rule } from './ability'

export default defineNuxtPlugin(nuxtApp => {
  // const userAbilityRules = useCookie<Rule[]>('userAbilityRules') OLD
  // const initialAbility = createMongoAbility(userAbilityRules.value ?? [])

  // 直接從 NextAuth session 獲取權限規則
  const { data: session } = useAuth()
  const initialAbility = createMongoAbility(session.value?.user?.abilityRules ?? [])

  nuxtApp.vueApp.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
})
