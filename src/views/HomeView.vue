<template>
  <div>
    <h2>HOME VIEW</h2>
    <button class="btn btn-primary" @click="goAboutPage">ABOUT 으로 이동</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goAboutPage = () => {
  router.push('/about')
}
</script>

<style lang="scss" scoped></style>
