<template>
  <div class="location">
    <div class="map">
      <iframe
        width="400"
        height="240"
        src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
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

<script setup>
const explore = [
  { icon: '/public/images/bxs-plane.svg', label: 'Hotel Penselvenyia', time: '2 min drive' },
  { icon: '/public/images/bxs-map.svg', label: 'Travis Bakery store house', time: '8 min drive' },
  { icon: '/public/images/bxs-map.svg', label: 'Olivia Johnson Garden', time: '15 min drive' },
  { icon: '/public/images/bxs-map.svg', label: 'Norman Opera Circus', time: '25 min drive' },
  { icon: '/public/images/bxs-map.svg', label: 'Rockdeset hotel', time: '32 min drive' }
]
</script>

<style scoped>
.location {
  @apply p-12 flex flex-col gap-10;
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
