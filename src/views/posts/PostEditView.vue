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
import { getPostById, updatePost } from '@/apis/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'

const { vAlert, vSuccess } = useAlert()

const route = useRoute()
const router = useRouter()
const id = route.params.id

const error = ref(null)
const loading = ref(false)
const editError = ref(null)
const editLoading = ref(false)

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  try {
    loading.value = true
    const { data } = await getPostById(id)
    setForm(data)
  } catch (err) {
    console.error(err)
    error.value = err
    vAlert('네트워크 오류!')
  } finally {
    loading.value = false
  }
}

const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}

const goDetailPage = () => {
  router.push({
    name: 'PostDetail',
    params: { id }
  })
}

const edit = async () => {
  try {
    editLoading.value = true
    await updatePost(id, { ...form.value })
    vSuccess('수정이 완료되었습니다.')
    goDetailPage()
  } catch (err) {
    console.error(err)
    vAlert(err.message)
    editError.value = err
  } finally {
    editLoading.value = false
  }
}

fetchPost()
</script>

<style lang="scss" scoped></style>
