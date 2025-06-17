<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

interface EsimOrderStatusResponse {
  code: number
  message: string
  data?: {
    order?: {
      orderState?: string
      orderNumber?: string
      created?: string
      updated?: string
    }
    esim?: {
      ICCID?: string
      PHONE_NUMBER?: string
      ACCESS_POINT_NAME?: string
      RECHARGABLE?: string
      ACTIVATION_CODE?: string
      QR_CODE?: string
      LOCAL_PROFILE_ASSISTANT?: string
    }
    providerInfo?: {
      esim?: {
        smdpCode?: string
        status?: string
        installationDate?: string
        puk?: string
      }
      packages?: Array<{
        activationDate?: string
        expirationDate?: string
        totalAllowanceMb?: number
        usedMb?: number
      }>
    }
  }
}

const props = defineProps<{
  modelValue: boolean
  detailData: EsimOrderStatusResponse['data'] | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const getPkgStats = (pkg: any) => {
  const today = dayjs()
  const end = pkg.expirationDate ? dayjs(pkg.expirationDate) : null
  const remainingDays = end ? Math.max(end.diff(today, 'day'), 0) : '-'
  const used = pkg.usedMb || 0
  const total = pkg.totalAllowanceMb || 0
  const usedPercent = total > 0 ? Math.round((used / total) * 100) : 0
  return { remainingDays, usedPercent }
}
</script>

<template>
  <VDialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="1200"
  >
    <VCard class="pa-6" style=" min-height:400px;">
      <template v-if="loading">
        <div class="d-flex flex-column align-center justify-center" style="height:350px;">
          <VProgressCircular indeterminate color="primary" size="64" class="mb-4" />
          <div class="text-h6 mt-2">載入中，請稍候…</div>
        </div>
      </template>
      <template v-else>
        <VCardTitle class="text-h5 font-weight-bold pb-2">
          {{ detailData?.order?.orderNumber || '訂單詳情' }}
        </VCardTitle>
        <VCardText>
          <VRow>
            <!-- 左側主資訊 -->
            <VCol cols="12" md="8">
              <!-- Order Details 卡片 -->
              <VCard class="mb-4 pa-4" elevation="1">
                <div class="text-h6 font-weight-bold mb-2">訂單資訊</div>
                <VRow>
                  <VCol cols="12" sm="6">
                    <div class="mb-2">
                      <span class="font-weight-bold">狀態：</span>{{ detailData?.order?.orderState }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">電話號碼：</span>{{ detailData?.esim?.PHONE_NUMBER || 'N/A' }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">APN：</span>{{ detailData?.esim?.ACCESS_POINT_NAME }}
                    </div>
                  </VCol>
                  <VCol cols="12" sm="6">
                    <div class="mb-2">
                      <span class="font-weight-bold">建立時間：</span>
                      {{ detailData?.order?.created ? dayjs(detailData.order.created).format('YYYY-MM-DD HH:mm:ss') : '' }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">更新時間：</span>
                      {{ detailData?.order?.updated ? dayjs(detailData.order.updated).format('YYYY-MM-DD HH:mm:ss') : '' }}
                    </div>
                  </VCol>
                </VRow>
              </VCard>

              <!-- ESIM Details 卡片 -->
              <VCard class="mb-4 pa-4" elevation="1">
                <div class="text-h6 font-weight-bold mb-2">eSIM 詳細資訊</div>
                <VRow>
                  <VCol cols="12" sm="6">
                    <div class="mb-2">
                      <span class="font-weight-bold">ICCID：</span>{{ detailData?.esim?.ICCID }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">eSIM 狀態：</span>{{ detailData?.providerInfo?.esim?.smdpCode || 'N/A' }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">eSIM 安裝：</span>{{ detailData?.providerInfo?.esim?.status || 'N/A' }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">安裝日期：</span>
                      {{ detailData?.providerInfo?.esim?.installationDate ? dayjs(detailData.providerInfo.esim.installationDate).format('YYYY-MM-DD HH:mm:ss') : '' }}
                    </div>
                  </VCol>
                  <VCol cols="12" sm="6">
                    <div class="mb-2">
                      <span class="font-weight-bold">可加值：</span>
                      {{ detailData?.esim?.RECHARGABLE === 'True' ? '是' : (detailData?.esim?.RECHARGABLE === 'False' ? '否' : detailData?.esim?.RECHARGABLE) }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">啟用碼：</span>{{ detailData?.esim?.ACTIVATION_CODE }}
                    </div>
                    <div class="mb-2">
                      <span class="font-weight-bold">PUK解鎖密碼：</span>
                      {{ detailData?.providerInfo?.esim?.puk }}
                    </div>
                  </VCol>
                </VRow>
              </VCard>

              <!-- Package Usage 卡片 -->
              <VCard class="mb-4 pa-4 package-usage-card" elevation="1">
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="text-h6 font-weight-bold">方案用量</div>
                  <div v-if="Array.isArray(detailData?.providerInfo?.packages) && detailData.providerInfo.packages.length > 0" class="text-body-1 font-weight-bold" style="color:#222;">
                    剩餘天數：{{ getPkgStats(detailData.providerInfo.packages[0]).remainingDays }} 天
                  </div>
                </div>
                <div class="package-usage-table-wrapper">
                  <table class="package-usage-table">
                    <thead>
                      <tr>
                        <th>啟用日期</th>
                        <th>到期日期</th>
                        <th>總流量</th>
                        <th>剩餘流量</th>
                        <th>已用百分比</th>
                      </tr>
                    </thead>
                    <tbody v-if="Array.isArray(detailData?.providerInfo?.packages) && detailData.providerInfo.packages.length > 0">
                      <tr v-for="(pkg, idx) in detailData.providerInfo.packages" :key="idx">
                        <td>{{ pkg.activationDate ? dayjs(pkg.activationDate).format('YYYY-MM-DD HH:mm:ss') : '' }}</td>
                        <td :style="{color: pkg.expirationDate && dayjs(pkg.expirationDate).isBefore(dayjs()) ? 'red' : 'green'}">
                          {{ pkg.expirationDate ? dayjs(pkg.expirationDate).format('YYYY-MM-DD HH:mm:ss') : '' }}
                        </td>
                        <td class="text-right">{{ pkg.totalAllowanceMb || 0 }} MB</td>
                        <td class="text-right" :style="{color: (pkg.usedMb || 0) >= (pkg.totalAllowanceMb || 0) ? 'red' : 'inherit'}">
                          {{ ((pkg.totalAllowanceMb || 0) - (pkg.usedMb || 0)) }} MB
                        </td>
                        <td class="text-right">
                          <span>
                            {{ getPkgStats(pkg).usedPercent }}%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="5" class="text-center text-medium-emphasis">不支援查詢</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </VCard>
            </VCol>

            <!-- 右側 QR Code 區塊 -->
            <!-- <VCol cols="12" md="4" class="d-flex flex-column align-center justify-center"> -->
            <VCol cols="12" md="4" class="d-flex flex-column align-start">
              <VCard class="pa-4 mb-4" elevation="1" style="width:100%;text-align:center;">
                <div v-if="detailData?.esim?.QR_CODE && detailData.esim.QR_CODE.startsWith('data:image')">
                  <img :src="detailData.esim.QR_CODE" alt="QR Code" style="max-width:180px;max-height:180px;" />
                </div>
                <div v-else class="text-disabled">無 QR CODE</div>
                <div class="mt-2" style="word-break:break-all; font-size:0.95em; color:#333;">
                  {{ detailData?.esim?.LOCAL_PROFILE_ASSISTANT || detailData?.esim?.ACTIVATION_CODE }}
                </div>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="emit('update:modelValue', false)">關閉</VBtn>
        </VCardActions>
      </template>
    </VCard>
  </VDialog>
</template>

<style scoped>
.package-usage-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 #0001;
  /* background: #fff; */
}
.package-usage-table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.package-usage-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  /* background: #f8fafc; */
  border-radius: 8px;
  font-size: 1rem;
}
.package-usage-table th {
  /* background: #f2f4f8; */
  font-weight: 700;
  color: #222;
  padding: 0.7em 1em;
  text-align: left;
}
.package-usage-table td {
  padding: 0.7em 1em;
  /* color: #222; */
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