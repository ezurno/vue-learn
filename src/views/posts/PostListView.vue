<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <post-filter v-model:title="params.title_like" v-model:limit="params._limit" />
    <hr class="my-4" />

    <app-loading v-if="loading" />
    <app-error :message="error.message" v-else-if="error" />

    <template v-else>
      <app-grid :items="posts">
        <template v-slot="{ item }">
          <post-item
            :title="item.title"
            :content="item.content"
            :createdAt="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          />
        </template>
      </app-grid>
    </template>

    <teleport to="#modal">
      <post-modal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </teleport>

    <app-pagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />
    <template v-if="previewId">
      <hr class="my-5" />
      <app-card>
        <post-detail-view :id="previewId"></post-detail-view>
        <!-- <PostDetailView :id="2"></PostDetailView> -->
      </app-card>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import AppPagination from '@/components/app/AppPagination.vue'
import AppCard from '@/components/app/AppCard.vue'
import AppGrid from '@/components/app/AppGrid.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostModal from '@/components/posts/PostModal.vue'
// import { getPosts } from '@/apis/posts'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/hooks/useAxios'

const router = useRouter()
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1, // 현재 페이지
  _limit: 3,
  title_like: null
})
const previewId = ref(null)
const { data: posts, error, loading, response: totalCount } = useAxios('/posts', { params })
const selectPreview = (id) => (previewId.value = id)

// pagination
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

const goPage = (id) => {
  router.push({
    name: 'PostDetail',
    params: {
      id
    }
  })
}

// modal
const show = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalCreatedAt = ref('')

const openModal = ({ title, content, createdAt }) => {
  show.value = true
  modalTitle.value = title
  modalContent.value = content
  modalCreatedAt.value = createdAt
}
</script>

<style lang="scss" scoped></style>
