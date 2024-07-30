<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <post-form v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import { getPostById, updatePost } from '@/apis/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  const { data } = await getPostById(id)
  setForm(data)
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
    await updatePost(id, { ...form.value })
    goDetailPage()
  } catch (error) {
    console.error(error)
  }
}

fetchPost()
</script>

<style lang="scss" scoped></style>
