<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  Group?: { name: string }
  orderCount?: number
  note: string
  orders: any[]
  totalSpent?: number
}

defineProps<{
  userData: User | null
}>()
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <div class="d-flex align-center mb-6">
        <VBtn
          icon
          variant="text"
          color="primary"
          class="me-4"
          @click="navigateTo('/customer/detail')"
        >
          <VIcon icon="tabler-arrow-left" />
        </VBtn>
        <h2 class="text-h4">
          {{ userData?.name }} 的訂單列表
        </h2>
      </div>

      <VRow>
        <VCol cols="12" md="3">
          <div class="text-subtitle-1 text-medium-emphasis mb-1">電子郵件</div>
          <div class="text-body-1 font-weight-medium">{{ userData?.email }}</div>
        </VCol>
        <VCol cols="12" md="3">
          <div class="text-subtitle-1 text-medium-emphasis mb-1">群組</div>
          <div class="text-body-1 font-weight-medium">{{ userData?.Group?.name || '無' }}</div>
        </VCol>
        <VCol cols="12" md="3">
          <div class="text-subtitle-1 text-medium-emphasis mb-1">訂單數量</div>
          <div class="text-body-1 font-weight-medium">{{ userData?.orders?.length ?? 0 }}</div>
        </VCol>
        <VCol cols="12" md="3">
          <div class="text-subtitle-1 text-medium-emphasis mb-1">累積消費</div>
          <div class="text-body-1 font-weight-medium">{{ userData?.totalSpent ?? 0 }} 元</div>
        </VCol>
        <VCol cols="12" class="mt-4">
          <div class="text-subtitle-1 text-medium-emphasis mb-1">備註</div>
          <div class="text-body-1 font-weight-medium">{{ userData?.note || '無' }}</div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template> 