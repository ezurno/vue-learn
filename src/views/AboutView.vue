<template>
  <div>
    <h2>ABOUT VIEW</h2>
    <button class="btn btn-primary" @click="$router.push('/')">HOME 으로 이동</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>

<style lang="scss" scoped></style>
