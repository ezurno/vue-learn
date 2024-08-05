<template>
  <app-loading v-if="loading" />
  <app-error v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
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
import { useRouter } from 'vue-router'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/hooks/useAxios'
import { useAlert } from '@/composables/alert'
import { computed } from 'vue'
import { useNumber } from '@/composables/number'
import { toRef } from 'vue'

const { vAlert, vSuccess } = useAlert()
const router = useRouter()

const props = defineProps({
  id: [Number, String]
})
const idRef = toRef(props, 'id')
// props 의 id 값을 추출, 대신 반응형을 잃지 않게,
const { isOdd } = useNumber(idRef)
const url = computed(() => `/posts/${props.id}`)
const { error, loading, data: post } = useAxios(url)
const {
  error: removeError,
  loading: removeLoading,
  execute
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.')
      goListPage()
    },
    onError: (err) => {
      vAlert(err.message)
    }
  }
)

const goListPage = () => {
  router.push({ name: 'PostList' })
}
const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } })
}

const remove = async () => {
  if (!confirm('삭제하시겠습니까?')) return
  execute()
}
</script>

<style lang="scss" scoped></style>
