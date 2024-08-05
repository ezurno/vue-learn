<template>
  <div>
    <h2>HOME VIEW</h2>
    <button class="btn btn-primary" @click="goAboutPage">ABOUT 으로 이동</button>
    <hr class="my-4" />
    <app-grid :items="items" v-slot="{ item }" col-class="col-3">
      <app-card>{{ item }}</app-card>
    </app-grid>
    <hr class="my-4" />
    <h2>{{ $person.name }}</h2>
    <button @click="person.say">CLICK PERSON</button>
    <div>x : {{ x }}, y : {{ y }}</div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$person.name)
  }
}
</script>

<script setup>
import { useRouter } from 'vue-router'
import AppCard from '@/components/app/AppCard.vue'
import AppGrid from '@/components/app/AppGrid.vue'
import { inject, reactive, ref, toRefs } from 'vue'

const router = useRouter()

const goAboutPage = () => {
  router.push('/about')
}

const items = ref(['사과', '딸기', '포도', '바나나'])
const person = inject('person')
console.log(`person.name`, person.name)

const position = reactive({
  x: 100,
  y: 1000
})

// const x = positino.x;
// const {x, y} = postition;
// const x = ref(position.x);
// const x = toRef(position, "x")

const { x, y } = toRefs(position)
</script>

<style lang="scss" scoped></style>
