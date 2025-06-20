<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useApi } from '@/composables/useApi'
import { useI18n } from 'vue-i18n'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
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

const { t } = useI18n()

definePageMeta({
  layout: 'default',
  name: 'esim-info-topup',
  middleware: ['sidebase-auth'],
})

const { data: products, error } = useApi<ApiResponse<Product[]>>('/products', {
  params: {
    productCategory: 'esim_addon'
  }
})

const safeProducts = computed(() => {
  const productList = products.value?.data || []
  return productList.map(product => ({
    ...product,
    Details: product.Details || {
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

watch(products, (newProducts) => {
  console.log('API Response:', newProducts)
}, { immediate: true })

function countryName(code: string) {
  const name = t('CountryNames.' + code)
  return name === 'CountryNames.' + code ? code : name
}

const expandedCards = ref<Set<number>>(new Set())

const toggleCard = (productId: number) => {
  if (expandedCards.value.has(productId)) {
    expandedCards.value.delete(productId)
  } else {
    expandedCards.value.add(productId)
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <h2 class="text-h4 mb-6">
            {{ t('TopupPackageIntro') }}
          </h2>
          


          <VRow v-if="error">
            <VCol cols="12">
              <VAlert
                type="error"
                :text="error?.message || '發生錯誤'"
              />
            </VCol>
          </VRow>

          <VRow v-else>
            <VCol
              v-for="product in safeProducts"
              :key="product.id"
              cols="12"
              md="6"
              lg="4"
            >
              <VCard>
                <VCardText>
                  <div class="d-flex align-center mb-4">
                    <img 
                      v-if="product.Details?.providerLogo"
                      :src="product.Details.providerLogo" 
                      :alt="product.Details.providerName"
                      class="me-4"
                      style="height: 40px; object-fit: contain;"
                    />
                    <h3 class="text-h5 mb-0">{{ product.name }}</h3>
                  </div>
                  <p class="mb-2">
                      <strong>{{ t('Price') }}：</strong>{{ product.Details.retailPrice }} {{ product.Details.currencyCode }}
                    </p>
                  <!-- <p class="mb-2">
                    <strong>{{ t('ProductId') }}：</strong>{{ product.productId }}
                  </p> -->
                  <p class="mb-2">
                    <strong>{{ t('Status') }}：</strong>{{ product.enabled ? t('Enabled') : t('Disabled') }}
                  </p>
                  <template v-if="product.Details">
                    
                    <p class="mb-2">
                      <strong>{{ t('Provider') }}：</strong>{{ product.Details.providerName }}
                    </p>
                    <p class="mb-2">
                      <strong>{{ t('Region') }}：</strong>{{ product.Details.regions?.join(', ') }}
                    </p>
                    <p class="mb-2">
                      <strong>{{ t('Country') }}：</strong>
                      <VBtn
                        size="small"
                        variant="text"
                        color="primary"
                        class="ml-2"
                        @click="toggleCard(product.id)"
                      >
                        {{ expandedCards.has(product.id) ? t('Collapse') : t('Expand') }}
                        ({{ product.Details.countries?.length || 0 }})
                      </VBtn>
                    </p>
                    <div v-show="expandedCards.has(product.id)" class="mt-2 mb-2">
                      {{ product.Details.countries?.map(code => countryName(code)).join(', ') }}
                    </div>
                    <p class="mb-2">
                      <strong>{{ t('DataLimit') }}：</strong>{{ product.Details.productDetails?.PLAN_DATA_LIMIT }} {{ product.Details.productDetails?.PLAN_DATA_UNIT }}
                    </p>
                    <p class="mb-2">
                      <strong>{{ t('Validity') }}：</strong>{{ product.Details.productDetails?.PLAN_VALIDITY }} {{ t('Hour') }}
                    </p>
                    <p class="mb-2">
                      <strong>{{ t('Hotspot') }}：</strong>{{ product.Details.productDetails?.HOTSPOT ? t('Support') : t('NotSupport') }}
                    </p>
                  </template>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template> 