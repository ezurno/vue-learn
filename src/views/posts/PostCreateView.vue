<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <post-form v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import PostForm from '@/components/posts/PostForm.vue'
import { createPost } from '@/apis/posts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  title: null,
  content: null
})

const save = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: String(Date.now())
    })
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
  }
}

const goListPage = () => {
  router.push({ name: 'PostList' })
}
</script>

<style lang="scss" scoped></style>
