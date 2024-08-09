import { defineStore } from 'pinia'

// naming 에 관행이 있음
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 1
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
