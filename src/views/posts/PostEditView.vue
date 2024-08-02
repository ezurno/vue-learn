<template>
  <app-loading v-if="loading" />
  <app-error v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <app-error v-if="editError" :message="editError.message" />
    <post-form v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취 소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수 정</template>
        </button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/hooks/useAxios'

const { vAlert, vSuccess } = useAlert()

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: form, error, loading } = useAxios(`/posts/${id}`)
const {
  error: editError,
  loading: editLoading,
  execute
} = useAxios(
  `/posts/${id}`,
  { method: `patch` },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다.')
      goDetailPage()
    },
    onError: (err) => {
      vAlert(err.message)
    }
  }
)

const edit = () => {
  execute({
    ...form.value
  })
}

const goDetailPage = () => {
  router.push({
    name: 'PostDetail',
    params: { id }
  })
}
</script>

<style lang="scss" scoped></style>
