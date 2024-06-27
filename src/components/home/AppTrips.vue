<script setup>
const props = defineProps(['tripsData'])
</script>

<template>
  <section class="trips">
    <h2 class="trips__title">Get inspiration for your next trip</h2>
    <div class="trips__list">
      <figure
        class="trips__figure"
        v-for="(item, index) in props.tripsData"
        :key="index"
        :style="{ backgroundImage: item.bg }"
      >
        <h3 class="trips__figure--title">{{ item.title }}</h3>
        <p class="trips__figure--desc">{{ item.desc }}</p>
      </figure>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.trips {
  @apply flex flex-col gap-7 pb-3;
}
.trips__title {
  @apply text-3xl font-semibold;
  color: #181818;
}
.trips__list {
  @apply sm:flex sm:gap-7 grid grid-cols-2 gap-7;
}
.trips__figure {
  @apply bg-cover rounded-lg flex flex-col gap-4 justify-end pb-7 sm:w-[33.33333%] shadow-md hover:scale-[1.02] hover:shadow-lg cursor-pointer;
  height: 28rem;
  transition: all 150ms ease-in-out;
}

.trips__figure:last-child {
  @apply col-span-full;
}

.trips__figure--title {
  @apply text-3xl text-white font-semibold;
  width: 85%;
  margin: 0 auto;
}

.trips__figure--desc {
  @apply text-xl text-white font-medium leading-6 tracking-wide;
  width: 85%;
  margin: 0 auto;
}
</style>
