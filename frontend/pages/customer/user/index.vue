<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useApi } from '@/composables/useApi'
import dayjs from 'dayjs'

definePageMeta({
  layout: 'default',
  name: 'customer-user',
  middleware: ['sidebase-auth'],
})

interface User {
  id: number
  name: string
  email: string
  group: string
  orderCount: number
  note: string
}

interface Order {
  id: number
  orderNumber: string
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  amount: number
  productName: string
  customerName: string
}

interface Group {
  id: number
  name: string
}

interface ApiResponse<T> {
  code: number
  message: string
  data?: T
}

const searchQuery = ref('')
const selectedUser = ref<User | null>(null)
const showAddDialog = ref(false)
const showNoteDialog = ref(false)
const editingNote = ref('')
const snackbar = ref(false)
const snackbarColor = ref('success')
const snackbarText = ref('')

const newUser = ref({
  name: '',
  email: '',
  groupId: '',
  note: ''
})

const headers = [
  { title: '用戶名稱', key: 'name' },
  { title: '電子郵件', key: 'email' },
  { title: '群組', key: 'group' },
  { title: '訂單數量', key: 'orderCount', align: 'center' as const },
  { title: '備注', key: 'note' },
  { title: '操作', key: 'actions', sortable: false },
]

const orderHeaders = [
  { title: '訂單編號', key: 'id', width: '150' },
  { title: '產品名稱', key: 'productName' },
  { title: '金額', key: 'amount', align: 'end' as const },
  { title: '建立時間', key: 'createdAt', width: '180' },
  { title: '狀態', key: 'status', width: '120' },
]

const statusMap = {
  pending: { text: '待處理', color: 'warning' },
  processing: { text: '處理中', color: 'info' },
  completed: { text: '已完成', color: 'success' },
  cancelled: { text: '已取消', color: 'error' }
}

function showSnackbar(message: string, color: string = 'success') {
  snackbarText.value = message
  snackbarColor.value = color
  snackbar.value = true
}

// 使用 useApi 取得用戶與群組列表
const { data: usersData, pending: loading, error: userError, refresh: refreshUsers } = useApi<ApiResponse<User[]>>('/users', {
  key: 'users',
  watch: false
})
const { data: groupsData, error: groupError, refresh: refreshGroups } = useApi<ApiResponse<Group[]>>('/groups', {
  key: 'groups',
  watch: false
})

const users = computed(() => usersData.value?.data ?? [])
const groups = computed(() => groupsData.value?.data ?? [])

// 創建用戶
const handleCreateUser = async () => {
  if (!newUser.value.groupId) {
    showSnackbar('請選擇用戶群組', 'error')
    return
  }
  
  try {
    const { data, error } = await useApi<ApiResponse<User>>('/users', {
      method: 'POST',
      body: JSON.stringify(newUser.value)
    })
    
    if (error.value || data.value?.code !== 200) {
      showSnackbar(error.value?.message || data.value?.message || '創建用戶失敗', 'error')
      return
    }
    
    showSnackbar('創建用戶成功', 'success')
    showAddDialog.value = false
    newUser.value = { name: '', email: '', groupId: '', note: '' }
    await refreshUsers()
  } catch (error) {
    console.error('創建用戶失敗:', error)
    showSnackbar('創建用戶失敗，請稍後再試', 'error')
  }
}

// 更新用戶備註
const handleUpdateNote = async () => {
  if (!selectedUser.value) return
  try {
    const { data, error } = await useApi<ApiResponse<User>>(`/users/${selectedUser.value.id}/note`, {
      method: 'PATCH',
      body: JSON.stringify({
        note: editingNote.value
      })
    })
    
    if (error.value || data.value?.code !== 200) {
      showSnackbar(error.value?.message || data.value?.message || '更新備註失敗', 'error')
      return
    }
    
    selectedUser.value.note = editingNote.value
    showNoteDialog.value = false
    showSnackbar('更新備註成功', 'success')
    refreshUsers()
  } catch (error) {
    console.error('更新用戶備注失敗:', error)
    showSnackbar('更新備註失敗，請稍後再試', 'error')
  }
}

// 查看訂單
const handleViewOrders = (user: User) => {
  navigateTo(`/customer/user/${user.id}`)
}

// 編輯備註
const handleEditNote = (user: User) => {
  selectedUser.value = user
  editingNote.value = user.note
  showNoteDialog.value = true
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
    if (selectedUser.value) {
      await handleViewOrders(selectedUser.value)
    }
  }
}

onMounted(() => {
  refreshUsers()
  refreshGroups()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <h2 class="text-h4 mb-6">
            客戶用戶管理
          </h2>

          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="searchQuery"
                label="搜索用戶"
                placeholder="請輸入用戶名稱或電子郵件"
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
                @click="refreshUsers"
              >
                刷新
              </VBtn>
              <VBtn
                color="success"
                prepend-icon="tabler-plus"
                @click="showAddDialog = true"
              >
                新增客戶
              </VBtn>
            </VCol>
          </VRow>

          <VDataTable
            :headers="headers"
            :items="users"
            :loading="loading"
            :search="searchQuery"
            class="mt-6"
          >
            <template #item.name="{ item }">
              <VBtn
                variant="text"
                color="primary"
                class="text-none"
                @click="handleViewOrders(item)"
              >
                {{ item.name }}
              </VBtn>
            </template>

            <template #item.orderCount="{ item }">
              <VChip
                color="primary"
                size="small"
              >
                {{ item.orderCount }}
              </VChip>
            </template>

            <template #item.note="{ item }">
              <div class="d-flex align-center">
                <span class="text-truncate" style="max-width: 200px;">
                  {{ item.note || '-' }}
                </span>
                <VBtn
                  icon
                  variant="text"
                  color="primary"
                  size="small"
                  class="ms-2"
                  @click="handleEditNote(item)"
                >
                  <VIcon icon="tabler-edit" />
                </VBtn>
              </div>
            </template>

            <template #item.actions="{ item }">
              <!-- 刪除按鈕已移除 -->
            </template>

            <template #no-data>
              <div class="text-center py-6 text-medium-emphasis">
                暫無用戶資料
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 新增用戶對話框 -->
  <VDialog
    v-model="showAddDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        新增客戶
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="handleCreateUser">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="newUser.name"
                label="用戶名稱"
                required
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="newUser.email"
                label="電子郵件"
                type="email"
                required
              />
            </VCol>

            <VCol cols="12">
              <VSelect
                v-model="newUser.groupId"
                label="群組"
                :items="groups"
                item-title="name"
                item-value="id"
                required
                :rules="[v => !!v || '請選擇群組']"
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="newUser.note"
                label="備注"
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
          @click="handleCreateUser"
        >
          確認
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- 編輯備注對話框 -->
  <VDialog
    v-model="showNoteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        編輯備注
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="handleUpdateNote">
          <VRow>
            <VCol cols="12">
              <VTextarea
                v-model="editingNote"
                label="備注"
                rows="3"
                auto-grow
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
          @click="showNoteDialog = false"
        >
          取消
        </VBtn>
        <VBtn
          color="success"
          @click="handleUpdateNote"
        >
          保存
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Snackbar -->
  <VSnackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
  >
    {{ snackbarText }}
  </VSnackbar>
</template>