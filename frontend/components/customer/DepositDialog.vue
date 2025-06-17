<script setup lang="ts">
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

const props = defineProps<{
  modelValue: boolean
  selectedOrderId: string | null
  products: Product[]
  selectedProduct: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:selectedProduct', value: string): void
  (e: 'deposit'): void
}>()
</script>

<template>
  <VDialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">用戶加值</VCardTitle>
      <VCardText>
        <div class="mb-4">
          <div class="text-subtitle-1 mb-2">加值訂單編號：{{ selectedOrderId }}</div>
        </div>
        <VForm>
          <VSelect
            :model-value="selectedProduct"
            @update:model-value="emit('update:selectedProduct', $event)"
            label="選擇加值包"
            :items="products"
            item-title="name"
            item-value="productId"
            :rules="[v => !!v || '請選擇加值包']"
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
          </VSelect>
        </VForm>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="error" variant="tonal" @click="emit('update:modelValue', false)">取消</VBtn>
        <VBtn color="success" :disabled="!selectedProduct" @click="emit('deposit')">確認加值</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template> 