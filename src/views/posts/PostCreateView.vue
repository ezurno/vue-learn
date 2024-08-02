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
import { createPost } from '@/apis/posts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/alert'
import AppError from '@/components/app/AppError.vue'

const { vAlert, vSuccess } = useAlert()

const loading = ref(false)
const error = ref(null)

const router = useRouter()
const form = ref({
  title: null,
  content: null
})

const save = async () => {
  try {
    loading.value = true
    await createPost({
      ...form.value,
      createdAt: String(Date.now())
    })

    goListPage()
    vSuccess('등록이 완료되었습니다.')
  } catch (err) {
    console.error(err)
    error.value = err
    vAlert(err.message)
  } finally {
    loading.value = false
  }
}

const goListPage = () => {
  router.push({ name: 'PostList' })
}
</script>

<style lang="scss" scoped></style>
