<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전 글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음 글</button>
      </div>
      <div class="col-auto me-auto" />
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPostById } from '@/apis/posts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  id: Number
})

const router = useRouter()
const form = ref({})

const fetchPost = () => {
  const data = getPostById(props.id)
  // 객체를 참조하고 있으므로 값이 변동 되어도 함께 변동 됨
  form.value = { ...data }
}

const goListPage = () => {
  router.push({ name: 'PostList' })
}
const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } })
}

fetchPost()
</script>

<style lang="scss" scoped></style>
