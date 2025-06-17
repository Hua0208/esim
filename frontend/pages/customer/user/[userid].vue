<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useApi } from '@/composables/useApi'
import dayjs from 'dayjs'


definePageMeta({
  layout: 'default',
  name: 'customer-user-detail',
  middleware: ['sidebase-auth'],
})

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

interface User {
  id: number
  name: string
  email: string
  Group?: { name: string }
  orderCount?: number
  note: string
  orders: Order[]
  totalSpent?: number
}

interface ApiResponse<T> {
  code: number
  message: string
  data?: T
}

interface Product {
  id: number
  productId: string
  name: string
  productCategory: 'esim_realtime' | 'esim_addon'
  enabled: boolean
  createdAt: string
  updatedAt: string
  Details: {
    providerName: string
    providerLogo: string
    retailPrice: number
    currencyCode: string
    regions: string[]
    countries: string[]
    productDetails: {
      PLAN_DATA_LIMIT: number
      PLAN_VALIDITY: number
      PLAN_DATA_UNIT: string
      HOTSPOT: number
    }
  }
}

const route = useRoute()
const userId = computed(() => {
  const params = route.params as { userid: string }
  return params.userid || ''
})

const { data: userData, pending: loading, refresh: refreshUser } = useApi<ApiResponse<User>>(`/users/${userId.value}`, {
  key: 'user-detail',
  watch: false,
  immediate: true
})

const orders = computed(() => {
  const orderList = userData.value?.data?.orders ?? []
  return orderList.map(order => ({
    ...order,
    productName: order.Product?.name || '未知產品',
    iccid: order.Card?.iccid || '-'
  }))
})

const { data: products, error: productsError } = useApi<ApiResponse<Product[]>>('/products')

const cardOptions = computed(() => {
  const productList = products.value?.data || []
  return productList
    .filter(item => item.productCategory === 'esim_realtime')
    .map(item => ({
      ...item,
      name: item.name,
      productId: item.productId,
      Details: item.Details
    }))
})

const safeProducts = computed(() => {
  const productList = products.value?.data || []
  return productList
    .filter(item => item.productCategory === 'esim_addon')
    .map(item => ({
      ...item,
      Details: item.Details || {
        providerName: '',
        providerLogo: '',
        retailPrice: 0,
        currencyCode: '',
        regions: [],
        countries: [],
        productDetails: {
          PLAN_DATA_LIMIT: 0,
          PLAN_VALIDITY: 0,
          PLAN_DATA_UNIT: '',
          HOTSPOT: 0
        }
      }
    }))
})

const selectedNewProduct = ref('')
const selectedTopupProduct = ref('')
const purchaseLoading = ref(false)

const snackbar = ref(false)
const snackbarColor = ref('success')
const snackbarText = ref('')

function showSnackbar(message: string, color: string = 'success') {
  snackbarText.value = message
  snackbarColor.value = color
  snackbar.value = true
}

const handlePurchase = async () => {
  if (!selectedNewProduct.value) {
    showSnackbar('請選擇商品', 'error')
    return
  }
  try {
    purchaseLoading.value = true
    const { data, error } = await useApi<ApiResponse<{ result: { orderId: string } }>>('/esim', {
      method: 'POST',
      body: {
        productId: selectedNewProduct.value,
        customerId: userId.value
      }
    })
    
    if (error.value) {
      const errorData = error.value.data as ApiResponse<any>
      showSnackbar(errorData?.message || '購買失敗', 'error')
      return
    }

    if (data.value?.code !== 200) {
      showSnackbar(data.value?.message || '購買失敗', 'error')
      return
    }

    if (!data.value?.data?.result?.orderId) {
      showSnackbar('購買失敗', 'error')
      return
    }

    const orderIdFromResponse = data.value.data.result.orderId
    const { error: completeError } = await useApi<ApiResponse<void>>('/esim/complete', {
      method: 'POST',
      body: {
        orderId: String(orderIdFromResponse)
      }
    })
    if (completeError.value) {
      showSnackbar('完成訂單失敗', 'error')
      return
    }
    showSnackbar('購買成功', 'success')
    selectedNewProduct.value = ''
    await refreshUser()
  } catch (err) {
    showSnackbar('購買失敗，請稍後再試', 'error')
  } finally {
    purchaseLoading.value = false
  }
}

const selectedOrderId = ref<string | null>(null)
const showDepositDialog = ref(false)

const handleOpenDeposit = (orderId: number) => {
  selectedOrderId.value = String(orderId)
  selectedTopupProduct.value = ''
  showDepositDialog.value = true
}

const handleDeposit = async () => {
  if (!selectedTopupProduct.value) {
    showSnackbar('請選擇加值包', 'error')
    return
  }
  try {
    const { data, error } = await useApi<ApiResponse<void>>('/esim/topup', {
      method: 'POST',
      body: {
        orderId: selectedOrderId.value,
        productId: selectedTopupProduct.value
      }
    })
    if (error.value || data.value?.code !== 200) {
      const msg = error.value?.message || data.value?.message || ''
      if (msg.includes('Incompatible products: Unable to top-up products from different families.')) {
        showSnackbar('選擇錯的加值包．不同電信商之間儲值包不通用。', 'error')
      } else {
        showSnackbar('加值失敗，請稍後再試', 'error')
      }
      return
    }
    showSnackbar('加值成功', 'success')
    showDepositDialog.value = false
    await refreshUser()
  } catch (error) {
    showSnackbar('加值失敗，請稍後再試', 'error')
  }
}

const detailDialog = ref(false)
const detailData = ref<any>(null)
const detailLoading = ref(false)

const handleShowDetail = async (iccid: string) => {
  detailDialog.value = true
  detailLoading.value = true
  try {
    const { data, error } = await useApi<any>(`/esim/order?iccid=${iccid}`, {
      method: 'GET'
    })
    if (error.value || data.value?.code !== 200) {
      showSnackbar(error.value?.message || data.value?.message || '查詢詳情失敗，請稍後再試', 'error')
      return
    }
    detailData.value = data.value.data || null
  } catch (error) {
    showSnackbar('查詢詳情失敗，請稍後再試', 'error')
  } finally {
    detailLoading.value = false
  }
}

const handleCompleteOrder = async (id: number) => {
  try {
    const { data, error } = await useApi<ApiResponse<void>>('/esim/complete', {
      method: 'POST',
      body: JSON.stringify({ 
        orderId: id.toString()
      })
    })

    if (error.value || data.value?.code !== 200) {
      const msg = error.value?.message || data.value?.message || ''
      if (msg === '訂單已取消，自動取消') {
        showSnackbar('訂單已取消，自動取消', 'error')
      } else {
        showSnackbar('確認訂單失敗，請稍後再試', 'error')
      }
      return
    }
    
    showSnackbar('訂單確認成功', 'success')
  } catch (error) {
    console.error('確認訂單失敗:', error)
    showSnackbar('確認訂單失敗，請稍後再試', 'error')
  } finally {
    await refreshUser()
  }
}

onMounted(() => {
  refreshUser()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <UserDetail :user-data="userData?.data || null" />

      <VCard class="mb-6">
        <VCardText>
          <VForm>
            <VRow>
              <VCol cols="12" md="8">
                <AppSelect
                  v-model="selectedNewProduct"
                  label="新購卡片"
                  :items="cardOptions"
                  item-title="name"
                  item-value="productId"
                  required
                >
                  <template #item="{ props, item }">
                    <VListItem v-bind="props">
                      <div class="d-flex justify-space-between align-center w-100">
                        <div>
                          <div class="text-body-1">{{ item.raw.name }}</div>
                          <div class="text-caption text-medium-emphasis">
                            {{ item.raw.Details.productDetails.PLAN_DATA_LIMIT }} {{ item.raw.Details.productDetails.PLAN_DATA_UNIT }} /
                            {{ item.raw.Details.productDetails.PLAN_VALIDITY }} 小時
                          </div>
                        </div>
                      </div>
                    </VListItem>
                  </template>
                </AppSelect>
              </VCol>
              <VCol cols="12" md="4" class="d-flex align-end">
                <VBtn
                  color="primary"
                  :loading="purchaseLoading"
                  @click="handlePurchase"
                  style="min-width: 120px; margin-left: 16px;"
                >
                  確認購買
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>

      <OrderList
        :orders="orders"
        :loading="loading"
        @complete="handleCompleteOrder"
        @deposit="handleOpenDeposit"
        @show-detail="handleShowDetail"
      />
    </VCol>

    <!-- Snackbar -->
    <VSnackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </VSnackbar>

    <!-- 訂單詳情對話框 -->
    <OrderDetailDialog
      v-model="detailDialog"
      :detail-data="detailData"
      :loading="detailLoading"
    />

    <!-- 加值對話框 -->
    <DepositDialog
      v-model="showDepositDialog"
      :selected-order-id="selectedOrderId"
      :products="safeProducts"
      :selected-product="selectedTopupProduct"
      @update:selected-product="selectedTopupProduct = $event"
      @deposit="handleDeposit"
    />
  </VRow>
</template>

<style scoped>
.detail-table {
  width: 100%;
  margin-bottom: 0.5rem;
  border-collapse: separate;
  border-spacing: 0 0.2em;
}
.detail-table th {
  text-align: center;
  font-weight: 700;
  color: #222;
  background: #f2f4f8;
  font-size: 1rem;
  padding: 0.5em 0.7em;
}
.detail-table td {
  text-align: center;
  color: #222;
  font-size: 1rem;
  padding: 0.5em 0.7em;
}
.package-usage-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 #0001;
  background: #fff;
}
.package-usage-table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.package-usage-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 1rem;
}
.package-usage-table th {
  background: #f2f4f8;
  font-weight: 700;
  color: #222;
  padding: 0.7em 1em;
  text-align: left;
}
.package-usage-table td {
  padding: 0.7em 1em;
  color: #222;
  text-align: left;
  font-size: 1rem;
}
.package-usage-table td.text-right {
  text-align: right;
}
.package-usage-table tr {
  border-bottom: 1px solid #e0e0e0;
}
.package-usage-table tr:last-child {
  border-bottom: none;
}
</style> 