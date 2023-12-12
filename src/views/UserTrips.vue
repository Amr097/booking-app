<script setup>
import AppHeader from '/src/components/partials/Header.vue'
import TripCard from '/src/components/my-trips/TripCard.vue'
</script>

<template>
  <div class="container">
    <AppHeader :logoColor="'#2F80ED'" :textColor="'#333'" :bellColor="'#828282'" :showNav="true" />
  </div>
  <div class="trips__container container-grey">
    <h1 class="trips__title">My trips</h1>
    <TripCard />
  </div>
</template>

<style scoped>
.trips__container {
  @apply bg-[#F4F4F4] w-full h-[1440px] px-72 py-24;
}

.trips__title {
  @apply text-[#1A1A1A] text-5xl font-semibold tracking-wide;
}
</style>
