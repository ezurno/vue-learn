<template>
  <div>
    <h2>HOME VIEW</h2>
    <button class="btn btn-primary" @click="goAboutPage">ABOUT 으로 이동</button>
    <hr class="my-4" />
    <app-grid :items="items" v-slot="{ item }" col-class="col-3">
      <app-card>{{ item }}</app-card>
    </app-grid>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppCard from '@/components/AppCard.vue'
import AppGrid from '@/components/AppGrid.vue'
import { ref } from 'vue'

const router = useRouter()

const goAboutPage = () => {
  router.push('/about')
}

const items = ref(['사과', '딸기', '포도', '바나나'])
</script>

<style lang="scss" scoped></style>
