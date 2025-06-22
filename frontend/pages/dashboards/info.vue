<script setup lang="ts">

//definePageMeta({
  //layout: 'default',
  //name: 'dashboards-info',
  //middleware: ['sidebase-auth'],
//})

const { t } = useI18n()

const features = [
  {
    title: t('dashboards.info.features.esim.title'),
    icon: 'tabler-device-mobile',
    description: t('dashboards.info.features.esim.description'),
  },
  {
    title: t('dashboards.info.features.user.title'),
    icon: 'tabler-users',
    description: t('dashboards.info.features.user.description'),
  },
  {
    title: t('dashboards.info.features.order.title'),
    icon: 'tabler-shopping-cart',
    description: t('dashboards.info.features.order.description'),
  },
  {
    title: t('dashboards.info.features.analytics.title'),
    icon: 'tabler-chart-bar',
    description: t('dashboards.info.features.analytics.description'),
  },
]

const systemInfo = {
  version: '1.2.0',
  lastUpdate: '2025-06-23',
  features: [
    t('dashboards.info.systemFeatures.providers'),
    t('dashboards.info.systemFeatures.realtime'),
    t('dashboards.info.systemFeatures.automation'),
    t('dashboards.info.systemFeatures.multilingual'),
    t('dashboards.info.systemFeatures.responsive'),
    t('dashboards.info.systemFeatures.security'),
  ],
}
</script>

<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol cols="12">
          <h2 class="text-h4 mb-6">
            {{ t('dashboards.info.title') }}
          </h2>
          <p class="text-body-1 mb-6">
            {{ t('dashboards.info.description') }}
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
                    {{ t('dashboards.info.kyc.title') }}
                  </h4>
                  <p class="text-body-1 mb-2">
                    {{ t('dashboards.info.kyc.description') }}
                  </p>
                  <ul class="text-body-1 ps-4 mb-0">
                    <li>{{ t('dashboards.info.kyc.point1') }}</li>
                    <li>{{ t('dashboards.info.kyc.point2') }}</li>
                    <li class="font-weight-bold text-error">
                      {{ t('dashboards.info.kyc.point3') }}
                    </li>
                  </ul>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12">
          <h3 class="text-h5 mb-4">
            {{ t('dashboards.info.systemInfo.title') }}
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
                        {{ t('dashboards.info.systemInfo.version') }}
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
                        {{ t('dashboards.info.systemInfo.lastUpdate') }}
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
                {{ t('dashboards.info.systemInfo.features') }}
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
