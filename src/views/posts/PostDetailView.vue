<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
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
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from '@/apis/posts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
    const { data } = await getPostById(props.id)
    // console.log(props.id)
    // 객체를 참조하고 있으므로 값이 변동 되어도 함께 변동 됨
    setPost(data)
  } catch (error) {
    console.error(error)
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
    if (!confirm('삭제하시겠습니까?')) return
    await deletePost(props.id)
    goListPage()
  } catch (error) {
    console.error(error)
  }
}

fetchPost()
</script>

<style lang="scss" scoped></style>
