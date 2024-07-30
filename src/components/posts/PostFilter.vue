<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          @input="$emit('update:title', $event.target.value)"
          type="text"
          class="form-control"
          placeholder="제목으로 작성해주세요."
        />
      </div>
      <div class="col">
        <select
          :value="limit"
          @input="$emit('update:limit', $event.target.value)"
          class="form-select"
        >
          <option value="3">3개 씩 보기</option>
          <option value="6">6개 씩 보기</option>
          <option value="9">9개 씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  titleLike: String,
  limit: Number
})

defineEmits(['update:title', 'update:limit'])
</script>

<style lang="scss" scoped></style>
