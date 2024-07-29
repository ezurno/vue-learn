<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <post-item
          :title="post.title"
          :content="post.content"
          :createdAt="post.createdAt"
          @click="goPage(post.id)"
        />
      </div>
    </div>
    <hr class="my-4" />
    <app-card>
      <post-detail-view :id="3"></post-detail-view>
      <!-- <PostDetailView :id="2"></PostDetailView> -->
    </app-card>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue'
import { getPosts } from '@/apis/posts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import AppCard from '@/components/AppCard.vue'

const router = useRouter()
const posts = ref([])

const fetchPosts = () => {
  posts.value = getPosts()
}

const goPage = (id) => {
  // router.push(`/posts/${id}`)
  router.push({
    name: 'PostDetail',
    params: {
      id
    }
  })
}

fetchPosts()
</script>

<style lang="scss" scoped></style>
