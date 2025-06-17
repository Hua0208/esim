<script setup lang="ts">

//definePageMeta({
  //layout: 'default',
  //name: 'dashboards-info',
  //middleware: ['sidebase-auth'],
//})

const features = [
  {
    title: 'eSIM 管理',
    icon: 'tabler-device-mobile',
    description: '提供完整的 eSIM 生命週期管理，包括訂購、啟用、監控和停用等功能。',
  },
  {
    title: '用戶管理',
    icon: 'tabler-users',
    description: '集中管理用戶帳戶、權限和群組，確保系統安全性和可訪問性。',
  },
  {
    title: '訂單追蹤',
    icon: 'tabler-shopping-cart',
    description: '即時追蹤訂單狀態，提供詳細的訂單歷史記錄和報表。',
  },
  {
    title: '數據分析',
    icon: 'tabler-chart-bar',
    description: '提供全面的數據分析工具，幫助您了解使用情況和業務趨勢。',
  },
]

const systemInfo = {
  version: '1.0.0',
  lastUpdate: '2025-06-15',
  features: [
    '支援多種 eSIM 供應商',
    '即時訂單處理',
    '自動化工作流程',
    '多語言支援',
    '響應式設計',
    '安全認證',
  ],
}
</script>

<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol cols="12">
          <h2 class="text-h4 mb-6">
            系統介紹
          </h2>
          <p class="text-body-1 mb-6">
            歡迎使用 eSIM 管理系統。本系統提供完整的 eSIM 生命週期管理解決方案，幫助您輕鬆管理 eSIM 訂單、用戶和數據。
          </p>
        </VCol>

        <VCol
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          md="6"
          lg="3"
        >
          <VCard
            variant="outlined"
            class="h-100"
          >
            <VCardText>
              <div class="d-flex align-center mb-4">
                <VIcon
                  :icon="feature.icon"
                  size="32"
                  color="primary"
                  class="me-3"
                />
                <h3 class="text-h6">
                  {{ feature.title }}
                </h3>
              </div>
              <p class="text-body-2">
                {{ feature.description }}
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <VDivider class="my-6" />
        </VCol>

        <VCol cols="12">
          <VCard
            color="warning"
            variant="tonal"
            class="mb-6"
          >
            <VCardText>
              <div class="d-flex align-start">
                <VIcon
                  icon="tabler-alert-triangle"
                  size="24"
                  color="warning"
                  class="me-3 mt-1"
                />
                <div>
                  <h4 class="text-h6 mb-2">
                    KYC 認證重要說明
                  </h4>
                  <p class="text-body-1 mb-2">
                    對於 3HK 等特定供應商的 eSIM 服務，客戶需要完成 KYC 認證。請注意以下重要事項：
                  </p>
                  <ul class="text-body-1 ps-4 mb-0">
                    <li>請在簡訊中完成系統商註明的認證流程</li>
                    <li>使用證件掃描時，請保持原始內容不變</li>
                    <li class="font-weight-bold text-error">
                      任何對掃描內容結果修改都將導致進入人工審核流程
                    </li>
                  </ul>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <h3 class="text-h5 mb-4">
            系統資訊
          </h3>
          <VCard variant="outlined">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <div class="d-flex align-center mb-4">
                    <VIcon
                      icon="tabler-info-circle"
                      size="24"
                      color="primary"
                      class="me-3"
                    />
                    <div>
                      <div class="text-subtitle-2">
                        版本
                      </div>
                      <div class="text-body-1">
                        {{ systemInfo.version }}
                      </div>
                    </div>
                  </div>
                </VCol>
                <VCol cols="12" md="6">
                  <div class="d-flex align-center mb-4">
                    <VIcon
                      icon="tabler-calendar"
                      size="24"
                      color="primary"
                      class="me-3"
                    />
                    <div>
                      <div class="text-subtitle-2">
                        最後更新
                      </div>
                      <div class="text-body-1">
                        {{ systemInfo.lastUpdate }}
                      </div>
                    </div>
                  </div>
                </VCol>
              </VRow>

              <VDivider class="my-4" />

              <h4 class="text-h6 mb-4">
                主要功能
              </h4>
              <VRow>
                <VCol
                  v-for="(feature, index) in systemInfo.features"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <div class="d-flex align-center">
                    <VIcon
                      icon="tabler-check"
                      size="20"
                      color="success"
                      class="me-2"
                    />
                    <span class="text-body-1">{{ feature }}</span>
                  </div>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
