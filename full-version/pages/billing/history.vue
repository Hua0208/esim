<script setup lang="ts">
import { ref, watch } from 'vue'
import { useApi } from '@/composables/useApi'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

definePageMeta({
  layout: 'default',
  name: 'billing-history',
  middleware: ['sidebase-auth'],
})

const { t } = useI18n()

const headers = [
  { title: t('Date'), key: 'date' },
  { title: t('Description'), key: 'description' },
  { title: t('Type'), key: 'type' },
  { title: t('Amount'), key: 'amount' },
  { title: t('Status'), key: 'status' },
  { title: t('Reference'), key: 'reference' },
]

const items = ref([])
const currentBalance = ref(0)
const monthlyStats = ref({ buyCount: 0, depositCount: 0, totalSpent: 0 })
const loading = ref(true)
const error = ref<string | null>(null)

const { data, error: apiError } = useApi<any>('/billing/center')

watch(data, (val) => {
  if (val) {
    if (val.code === 200) {
      items.value = val.data.items
      currentBalance.value = val.data.currentBalance
      monthlyStats.value = val.data.monthlyStats
      error.value = null
    } else {
      error.value = val.message
    }
  }
  loading.value = false
}, { immediate: true })

watch(apiError, (val) => {
  if (val) {
    error.value = val.message || '獲取數據失敗'
    loading.value = false
  }
})
</script>

<template>
  <VRow>
    <!-- 錯誤提示 -->
    <VCol v-if="error" cols="12">
      <VAlert
        type="error"
        variant="tonal"
        closable
        class="mb-4"
      >
        {{ error }}
      </VAlert>
    </VCol>

    <!-- 載入中提示 -->
    <VCol v-if="loading" cols="12">
      <VCard>
        <VCardText class="d-flex justify-center">
          <VProgressCircular
            indeterminate
            color="primary"
          />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 目前餘額與統計卡片 -->
    <VCol v-else cols="12">
      <VCard>
        <VCardText>
          <VRow>
            <VCol cols="12" md="6" lg="3">
              <VCard border flat>
                <VCardText>
                  <div class="d-flex align-center">
                    <VAvatar
                      color="primary"
                      variant="tonal"
                      rounded
                      class="me-3"
                    >
                      <VIcon icon="tabler-cash" />
                    </VAvatar>
                    <div>
                      <div class="text-body-2">{{ t('CurrentBalance') }}</div>
                      <div class="text-h5 font-weight-medium">
                        ${{ currentBalance }}
                      </div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <!-- 新增三個統計卡片 -->
            <VCol cols="12" md="6" lg="3">
              <VCard border flat>
                <VCardText>
                  <div class="d-flex align-center">
                    <VAvatar color="info" variant="tonal" rounded class="me-3">
                      <VIcon icon="tabler-credit-card" />
                    </VAvatar>
                    <div>
                      <div class="text-body-2">{{ t('MonthlyCardPurchase') }}</div>
                      <div class="text-h5 font-weight-medium">{{ monthlyStats.buyCount }}</div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" md="6" lg="3">
              <VCard border flat>
                <VCardText>
                  <div class="d-flex align-center">
                    <VAvatar color="success" variant="tonal" rounded class="me-3">
                      <VIcon icon="tabler-wallet" />
                    </VAvatar>
                    <div>
                      <div class="text-body-2">{{ t('MonthlyDepositCount') }}</div>
                      <div class="text-h5 font-weight-medium">{{ monthlyStats.depositCount }}</div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" md="6" lg="3">
              <VCard border flat>
                <VCardText>
                  <div class="d-flex align-center">
                    <VAvatar color="error" variant="tonal" rounded class="me-3">
                      <VIcon icon="tabler-report-money" />
                    </VAvatar>
                    <div>
                      <div class="text-body-2">{{ t('MonthlyTotalSpent') }}</div>
                      <div class="text-h5 font-weight-medium">${{ monthlyStats.totalSpent }}</div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 帳務歷史表格 -->
    <VCol v-if="!loading" cols="12">
      <VCard>
        <VCardText>
          <h2 class="text-h4 mb-6">{{ t('BillingHistory') }}</h2>
          <VDataTable
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="mt-6"
            :loading="loading"
          >
            <template #item.type="{ item }">
              <VChip
                :color="(item as any).type === 'purchase'
                  ? 'warning'
                  : ((item as any).type === 'deposit'
                    ? 'success'
                    : ((item as any).type === 'topup'
                      ? 'info'
                      : 'secondary'))"
                size="small"
                label
                class="text-capitalize"
              > 
                {{ (item as any).type === 'purchase'
                  ? t('Purchase')
                  : ((item as any).type === 'deposit'
                    ? t('Deposit')
                    : ((item as any).type === 'topup'
                      ? t('Topup')
                      : (item as any).type)) }}
              </VChip>
            </template>
            <template #item.date="{ item }">
              {{ (item as any).date ? dayjs((item as any).date).format('YYYY-MM-DD HH:mm:ss') : '' }}
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template> 