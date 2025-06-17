<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'billing-topup',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <h2 class="text-h4 mb-6">
            加值作業
          </h2>
          <VAlert
            type="warning"
            variant="elevated"
            class="mb-6"
          >
            <template #title>
              功能維護中
            </template>
            親愛的用戶您好，目前頁面正在維護作業，暫停服務。<br>
            <br>
            維護時間：Never<br>
            維護原因：受限的功能，無法使用
          </VAlert>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template> 