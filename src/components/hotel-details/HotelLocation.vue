<script setup>
const explore = [
  { icon: '/images/bxs-plane.svg', label: 'Hotel Penselvenyia', time: '2 min drive' },
  { icon: '/images/bxs-map.svg', label: 'Travis Bakery store house', time: '8 min drive' },
  { icon: '/images/bxs-map.svg', label: 'Olivia Johnson Garden', time: '15 min drive' },
  { icon: '/images/bxs-map.svg', label: 'Norman Opera Circus', time: '25 min drive' },
  { icon: '/images/bxs-map.svg', label: 'Rockdeset hotel', time: '32 min drive' }
]
</script>

<template>
  <div class="location">
    <div class="map">
      <slot name="map"></slot>
    </div>
    <div class="explore">
      <h3 class="explore__title">Explore the area</h3>
      <ul class="explore__list">
        <li class="explore__item" v-for="(item, index) in explore" :key="index">
          <div class="explore__item--container">
            <img :src="item.icon" alt="icon" />
            <p>{{ item.label }}</p>
            <p>{{ item.time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.location {
  @apply p-12 flex flex-col gap-10;
}

.map__frame {
  width: 100%;
}

.explore {
}

.explore__title {
  @apply text-2xl font-semibold tracking-wide mb-8;
  color: #181818;
}

.explore__list {
  @apply flex flex-col gap-y-4;
}

.explore__item {
}

.explore__item--container {
  @apply grid items-center gap-x-3;
  grid-template-columns: max-content 1fr max-content;
}

.explore__item--container img {
  @apply w-8 h-8;
}

.explore__item--container p {
  @apply text-lg leading-8 tracking-wide;

  color: #4f4f4f;
}

iframe {
  border-radius: 6px;
}
</style>
