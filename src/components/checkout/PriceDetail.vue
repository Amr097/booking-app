<template>
  <div class="mt-10 bg-white rounded-md">
    <div class="title__container">
      <p class="title p-bold mt-1">Price Details</p>
    </div>

    <div class="content__container">
      <p class="p-small">1 room X 2 nights</p>
      <p class="p-small justify-self-end">$ 120.32</p>
      <p class="p-small">Tax and service fees</p>
      <p class="p-small p-small justify-self-end">$ 8.32</p>

      <hr class="col-span-full my-4" />

      <p class="p-bold mt-2">Total</p>
      <p class="p-bold mt-2 justify-self-end">$130</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.title__container {
  @apply rounded-lg bg-white;
  width: 100%;
}

.title {
  @apply py-4 px-6;
  border-radius: 6px 6px 0px 0px;
  background: #85e0ab;
}

.content__container {
  @apply p-6 grid grid-cols-2 grid-rows-2;
}

.p-small {
  @apply text-xl leading-8 tracking-wide mb-2;
  color: #4f4f4f;
}
.p-bold {
  @apply text-2xl tracking-wide font-medium;
  color: #181818;
}
</style>
