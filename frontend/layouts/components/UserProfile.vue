<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'

const ability = useAbility()
const { t } = useI18n()

// 使用 NextAuth session 而不是 cookie
const { data: session } = useAuth()
const { signOut } = useAuth()

async function logout() {
  try {
    await signOut({ redirect: false })

    // Reset user abilities
    ability.update([])

    navigateTo({ name: 'login' })
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : '發生未知錯誤'
    })
  }
}

interface NavItem {
  type: 'navItem'
  icon: string
  title: string
  to: RouteLocationRaw
  badgeProps?: { color: string; content: string }
}

interface Divider {
  type: 'divider'
}

type UserProfileItem = NavItem | Divider

const userProfileList: UserProfileItem[] = [
  { type: 'divider' },
  //{ type: 'navItem', icon: 'tabler-user', title: 'Profile', to: { name: 'apps-user-view-id', params: { id: 21 } } },
  { type: 'navItem', icon: 'tabler-settings', title: 'Settings', to: { name: 'pages-account-settings-tab', params: { tab: 'security' } } },
  //{ type: 'navItem', icon: 'tabler-file-dollar', title: 'Billing Plan', to: { name: 'pages-account-settings-tab', params: { tab: 'billing-plans' } }, badgeProps: { color: 'error', content: '4' } },
  { type: 'divider' },
  //{ type: 'navItem', icon: 'tabler-currency-dollar', title: 'Pricing', to: { name: 'pages-pricing' } },
  //{ type: 'navItem', icon: 'tabler-question-mark', title: 'FAQ', to: { name: 'pages-faq' } },
]
</script>

<template>
  <VBadge
    v-if="session?.user"
    dot
    bordered
    location="bottom right"
    offset-x="1"
    offset-y="2"
    color="success"
  >
    <VAvatar
      size="38"
      class="cursor-pointer"
      :color="!(session?.user?.avatar) ? 'primary' : undefined"
      :variant="!(session?.user?.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="session?.user?.avatar"
        :src="session.user.avatar"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="240"
        location="bottom end"
        offset="12px"
      >
        <VList>
          <VListItem>
            <div class="d-flex gap-2 align-center">
              <VListItemAction>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                  bordered
                >
                  <VAvatar
                    :color="!(session?.user?.avatar) ? 'primary' : undefined"
                    :variant="!(session?.user?.avatar) ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="session?.user?.avatar"
                      :src="session.user.avatar"
                    />
                    <VIcon
                      v-else
                      icon="tabler-user"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>

              <div>
                <h6 class="text-h6 font-weight-medium">
                  {{ session?.user?.fullName || session?.user?.username }}
                </h6>
                <VListItemSubtitle class="text-capitalize text-disabled">
                  {{ session?.user?.role }}
                </VListItemSubtitle>
              </div>
            </div>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="(item, index) in userProfileList"
              :key="item.type === 'navItem' ? item.title : `divider-${index}`"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="(item as NavItem).to"
              >
                <template #prepend>
                  <VIcon
                    :icon="(item as NavItem).icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ (item as NavItem).title }}</VListItemTitle>

                <template
                  v-if="(item as NavItem).badgeProps"
                  #append
                >
                  <VBadge
                    rounded="sm"
                    class="me-3"
                    v-bind="(item as NavItem).badgeProps"
                  />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-2"
              />
            </template>

            <div class="px-4 py-2">
              <VBtn
                block
                size="small"
                color="error"
                append-icon="tabler-logout"
                @click="logout"
              >
                Logout
              </VBtn>
            </div>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
