<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <app-error v-if="error" :message="error.message" />
    <post-form v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저 장</template>
        </button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import PostForm from '@/components/posts/PostForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/alert'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/hooks/useAxios'

const { vAlert, vSuccess } = useAlert()

const router = useRouter()
const form = ref({
  title: null,
  content: null
})

const { error, loading, execute } = useAxios(
  `/posts`,
  {
    method: 'post',
    data: { ...form.value, createdAt: Date.now() }
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostList' })
      vSuccess('등록이 완료되었습니다')
    },
    onError: (err) => {
      vAlert(err.message)
    }
  }
)

const save = async () => {
  execute({ ...form.value, createdAt: Date.now() })
}

const goListPage = () => {
  router.push({ name: 'PostList' })
}
</script>

<style lang="scss" scoped></style>
