<template>
  <div class="test">
    <h2>Test Account</h2>
    <p>Email: vue-voyage@test.com</p>
    <p>Password: Te$t12345</p>
  </div>
</template>

<script setup></script>

<style scoped>
.test {
  @apply absolute right-5 top-5 border border-solid border-black rounded-md shadow-sm p-4;
}

.test h2 {
  @apply text-4xl mb-8 font-extrabold;
}

.test p {
  @apply text-2xl font-semibold my-3;
}
</style>
