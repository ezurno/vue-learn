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
    <!-- <app-alert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
    <app-alert :items="alerts" />
  </div>
</template>

<script setup>
import { getPostById, updatePost } from '@/apis/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'
import AppAlert from '@/components/AppAlert.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id)
    setForm(data)
  } catch (error) {
    console.error(error)
    vAlert('네트워크 오류!')
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
    await updatePost(id, { ...form.value })
    // goDetailPage()
    vAlert('수정이 완료되었습니다.', 'success')
  } catch (error) {
    console.error(error)
    vAlert(error.message)
  }
}

fetchPost()

// alert
// const showAlert = ref(false)
// const alertMessage = ref('')
// const alertType = ref('')

const alerts = ref([])

const vAlert = (message, type = 'error') => {
  alert.value.push({ message, type })
  // showAlert.value = true
  // alertMessage.value = message
  // alertType.value = type
  setTimeout(() => {
    // showAlert.value = false
    alerts.value.shift()
  }, 2000)
}
</script>

<style lang="scss" scoped></style>
