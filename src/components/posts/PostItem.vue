<template>
  <app-card>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdDate }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-view-list"></i>
        </button>
      </div>
    </template>
  </app-card>
</template>

<script setup>
import AppCard from '@/components/app/AppCard.vue'
import { computed, inject } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: [String, Date, Number]
  }
})
const dayjs = inject('dayjs')
const createdDate = computed(() => dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'))
defineEmits(['modal', 'preview'])
</script>

<style lang="scss" scoped></style>
