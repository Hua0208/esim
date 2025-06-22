<script setup lang="ts">
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'confirm', password: string): void
}
interface Props {
  isDialogVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const password = ref('')
const isPasswordVisible = ref(false)
const form = ref<any>(null)

const onConfirmation = async () => {
  const { valid } = await form.value.validate()
  if (!valid)
    return

  emit('confirm', password.value)
  closeDialog()
}

const closeDialog = () => {
  emit('update:isDialogVisible', false)
  password.value = ''
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
    :model-value="props.isDialogVisible"
    @update:model-value="closeDialog"
  >
    <VCard title="確認密碼">
      <VCardText>
        為了安全起見，請輸入您的密碼以繼續。
      </VCardText>

      <VForm ref="form" @submit.prevent="onConfirmation">
        <VCardText>
          <AppTextField
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            label="密碼"
            autocomplete="current-password"
            placeholder="············"
            :rules="[v => !!v || '請輸入密碼']"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          />
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="secondary"
            variant="tonal"
            @click="closeDialog"
          >
            取消
          </VBtn>
          <VBtn type="submit">
            確認
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template> 