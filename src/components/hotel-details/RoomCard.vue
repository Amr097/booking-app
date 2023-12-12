<template>
  <div class="room">
    <slot name="image"></slot>
    <div class="room__data">
      <slot name="title"></slot>
      <slot name="space"></slot>
      <slot name="sleep"></slot>
      <slot name="beds"></slot>
      <router-link :to="{ name: 'checkout' }" class="room__btn">Reserve suite</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.room {
  @apply flex flex-col;
}

.room__btn {
  @apply flex justify-center items-center py-4 px-7 text-white mt-6 rounded-lg text-2xl font-medium leading-9 tracking-wide hover:bg-blue-600;

  background-color: #2f80ed;
}

.room__data {
  @apply px-6 bg-white pb-6;
  border-radius: 0 0 6px 6px;
}
</style>
