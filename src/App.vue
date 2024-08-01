<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
import TheView from '@/layouts/TheView.vue'
import { useAlert } from '@/composables/alert'
import AppAlert from '@/components/app/AppAlert.vue'
const { alerts } = useAlert()
</script>

<template>
  <TheHeader />
  <TheView />
  <app-alert :items="alerts" />
</template>

<style lang="scss" scoped></style>
