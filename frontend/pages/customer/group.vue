<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'

definePageMeta({
  layout: 'default',
  name: 'customer-group',
  middleware: ['sidebase-auth'],
})

interface Group {
  id: number
  name: string
  description: string
  memberCount: number
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

const searchQuery = ref('')
const groups = ref<Group[]>([])
const loading = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const selectedGroup = ref<Group | null>(null)
const editingGroup = ref<Group>({
  id: 0,
  name: '',
  description: '',
  memberCount: 0
})

const newGroup = ref({
  name: '',
  description: ''
})

const headers = [
  { title: '群組名稱', key: 'name' },
  { title: '描述', key: 'description' },
  { title: '成員數量', key: 'memberCount' },
  { title: '操作', key: 'actions', sortable: false },
]

// 使用 useApi 取得群組列表（新版 API 格式）
const { data: groupsData, pending: loadingData, error, refresh } = useApi<ApiResponse<Group[]>>('/groups', {
  key: 'groups',
  watch: false //自動監聽
})

// 保證 VDataTable items 一定是 array，適應新版 API 格式
const groupItems = computed(() => groupsData.value?.data ?? [])

// 創建新群組
const handleCreateGroup = async () => {
  try {
    await useApi('/groups', {
      method: 'POST',
      body: newGroup.value
    })
    showAddDialog.value = false
    newGroup.value = { name: '', description: '' }
    await refresh()
  } catch (error) {
    console.error('創建群組失敗:', error)
  }
}

// 更新群組
const handleUpdateGroup = async () => {
  if (!selectedGroup.value) return
  
  try {
    await useApi(`/groups/${selectedGroup.value.id}`, {
      method: 'PUT',
      body: {
        name: editingGroup.value.name,
        description: editingGroup.value.description
      }
    })
    showEditDialog.value = false
    await refresh()
  } catch (error) {
    console.error('更新群組失敗:', error)
  }
}

// 刪除群組
const handleDeleteGroup = async (id: number) => {
  if (!confirm('確定要刪除此群組嗎？')) return
  
  try {
    await useApi(`/groups/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('刪除群組失敗:', error)
  }
}

// 編輯群組
const handleEditGroup = (group: Group) => {
  selectedGroup.value = group
  editingGroup.value = { ...group }
  showEditDialog.value = true
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <h2 class="text-h4 mb-6">
            客戶群組管理
          </h2>

          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="searchQuery"
                label="搜索群組"
                placeholder="請輸入群組名稱"
                prepend-inner-icon="tabler-search"
                single-line
                hide-details
              />
            </VCol>

            <VCol cols="12" md="6" class="d-flex justify-end gap-4">
              <VBtn
                color="primary"
                prepend-icon="tabler-refresh"
                :loading="loading"
                @click="refresh"
              >
                刷新
              </VBtn>
              <VBtn
                color="success"
                prepend-icon="tabler-plus"
                @click="showAddDialog = true"
              >
                新增群組
              </VBtn>
            </VCol>
          </VRow>

          <VDataTable
            :headers="headers"
            :items="groupItems"
            :loading="loading"
            :search="searchQuery"
            class="mt-6"
          >
            <template #item.actions="{ item }">
              <VBtn
                icon
                variant="text"
                color="primary"
                size="small"
                class="me-2"
                @click="handleEditGroup(item)"
              >
                <VIcon icon="tabler-edit" />
              </VBtn>
              <!-- <VBtn
                icon
                variant="text"
                color="error"
                size="small"
                @click="handleDeleteGroup(item.id)"
              >
                <VIcon icon="tabler-trash" />
              </VBtn> -->
            </template>

            <template #no-data>
              <div class="text-center py-6 text-medium-emphasis">
                暫無群組資料
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 新增群組對話框 -->
  <VDialog
    v-model="showAddDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        新增群組
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="handleCreateGroup">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="newGroup.name"
                label="群組名稱"
                required
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="newGroup.description"
                label="描述"
                rows="3"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          variant="tonal"
          @click="showAddDialog = false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="handleCreateGroup"
        >
          確認
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- 編輯群組對話框 -->
  <VDialog
    v-model="showEditDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        編輯群組
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="handleUpdateGroup">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="editingGroup.name"
                label="群組名稱"
                required
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="editingGroup.description"
                label="描述"
                rows="3"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          variant="tonal"
          @click="showEditDialog = false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="handleUpdateGroup"
        >
          保存
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>