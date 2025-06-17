<script setup lang="ts">
import dayjs from 'dayjs'

interface Order {
  id: number
  orderNumber: string
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  amount: number
  productId: string
  Product?: {
    name: string
    productId: string
  }
  Card?: {
    iccid: string
  }
}

const props = defineProps<{
  orders: Order[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'complete', id: number): void
  (e: 'deposit', id: number): void
  (e: 'showDetail', iccid: string): void
}>()

const orderHeaders = [
  { title: '訂單編號', key: 'id', width: '150' },
  { title: '產品名稱', key: 'productName' },
  { title: 'ICCID', key: 'iccid', width: '150' },
  { title: '金額', key: 'amount', align: 'end' as const },
  { title: '建立時間', key: 'createdAt', width: '180' },
  { title: '狀態', key: 'status', width: '120' },
  { title: '操作', key: 'actions', width: '200', sortable: false },
]

const statusMap = {
  pending: { text: '待處理', color: 'warning' },
  processing: { text: '處理中', color: 'info' },
  completed: { text: '已完成', color: 'success' },
  cancelled: { text: '已取消', color: 'error' }
}
</script>

<template>
  <VCard>
    <VCardText>
      <VDataTable
        :headers="orderHeaders"
        :items="orders"
        :loading="loading"
        class="mt-4"
      >
        <template #item.status="{ item }">
          <VChip
            :color="statusMap[item.status].color"
            size="small"
          >
            {{ statusMap[item.status].text }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-2">
            <VBtn
              v-if="item.status === 'pending'"
              color="success"
              size="small"
              @click="emit('complete', item.id)"
            >
              確認訂單
            </VBtn>
            <VBtn
              v-if="item.status === 'completed'"
              color="primary"
              size="small"
              @click="emit('deposit', item.id)"
            >
              加值
            </VBtn>
            <VBtn
              v-if="item.status === 'completed'"
              color="info"
              size="small"
              @click="emit('showDetail', item.Card?.iccid || '')"
            >
              詳情
            </VBtn>
          </div>
        </template>

        <template #item.amount="{ item }">
          {{ item.amount.toLocaleString() }} 元
        </template>

        <template #item.createdAt="{ item }">
          {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>

        <template v-slot:item.productName="{ item }">
          <span>{{ item.Product?.name || '未知產品' }}</span>
        </template>

        <template v-slot:item.iccid="{ item }">
          <span>{{ item.Card?.iccid || '-' }}</span>
        </template>

        <template #no-data>
          <div class="text-center py-6 text-medium-emphasis">
            暫無訂單資料
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template> 