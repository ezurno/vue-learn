<template>
  <div>
    <h2>ABOUT VIEW</h2>
    <button class="btn btn-primary" @click="$router.push('/')">HOME 으로 이동</button>
    <h2>STORE</h2>
    <p>counter : {{ counter }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button @click="increment()">CLICK</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const route = useRoute()
console.log(`route.path: ${route.path}`)

const store = useCounterStore()
const { increment } = store
const { counter, doubleCount } = storeToRefs(store)
// 구조분해 할당
</script>

<style lang="scss" scoped></style>
