<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const id = route.params.id
</script>

<template>
  <div class="room">
    <slot name="image"></slot>
    <div class="room__data">
      <slot name="title"></slot>
      <slot name="space"></slot>
      <slot name="sleep"></slot>
      <slot name="beds"></slot>
      <router-link :to="`/checkout/${id}`" class="room__btn">Reserve suite</router-link>
    </div>
  </div>
</template>

<style scoped>
.room {
  @apply flex flex-col shadow-sm;
}

.room__btn {
  @apply flex justify-center items-center py-4 px-7 text-white mt-6 rounded-lg text-2xl font-medium leading-9 tracking-wide transition-all duration-100 hover:bg-blue-600;

  background-color: #2f80ed;
}

.room__data {
  @apply px-6 bg-white pb-6;
  border-radius: 0 0 6px 6px;
}
</style>
