### 공통 컴포넌트 분리하기

> vue 에서는 공통컴포넌트로 분리할 때 독특한 방식으로 분리한다

1. `app-grid` 에 items 로 posts 를 전달
2. 해당하는 items 의 item 을 v-slot 으로 전달
3. v-slot 은 app-grid 내에서 각각 slot 으로 해당 컴포넌트가 들어갈 곳을 정의

```vue
<template>
  <app-grid :items="posts">
    <template v-slot="{ item }">
      <post-item
        :title="item.title"
        :content="item.content"
        :created-at="item.createdAt"
        @click="goPage(item.id)"
      >
      </post-item>
    </template>
  </app-grid>
</template>
```

### event-bubbling 과 event-capturing

> vue 에서 event 를 bubbling, captuiring 할 때에는 각각 defineProps, defineEmit 으로 사용

```vue
<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isPrevPage">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('page', currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="$emit('page', page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="isNextPage">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit(`page`, currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  }
})

defineEmits(['page'])

const isPrevPage = computed(() => {
  return { disabled: !(props.currentPage > 1) }
})

const isNextPage = computed(() => {
  return { disabled: !(props.currentPage < props.pageCount) }
})
</script>

<style lang="scss" scoped></style>
```
