<template>
  <app-loading v-if="loading" />
  <app-error v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
    <hr class="my-4" />
    <app-error v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전 글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음 글</button>
      </div>
      <div class="col-auto me-auto" />
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목 록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수 정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove" :disabled="removeLoading">
          <template v-if="removeLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>삭 제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from '@/apis/posts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'

const error = ref(null)
const loading = ref(false)

const removeError = ref(null)
const removeLoading = ref(false)

const props = defineProps({
  id: [Number, String]
})

const router = useRouter()
const post = ref({
  title: null,
  content: null,
  createdAt: null
})

const fetchPost = async () => {
  try {
    loading.value = true
    const { data } = await getPostById(props.id)
    // console.log(props.id)
    // 객체를 참조하고 있으므로 값이 변동 되어도 함께 변동 됨
    setPost(data)
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    loading.value = false
  }
}

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}

const goListPage = () => {
  router.push({ name: 'PostList' })
}
const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } })
}

const remove = async () => {
  try {
    removeLoading.value = true
    if (!confirm('삭제하시겠습니까?')) return
    await deletePost(props.id)
    goListPage()
  } catch (err) {
    console.error(err)
    removeError.value = err
  } finally {
    removeLoading.value = false
  }
}

fetchPost()
</script>

<style lang="scss" scoped></style>
