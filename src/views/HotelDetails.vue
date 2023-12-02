<template>
  <div class="container">
    <AppHeader :logoColor="'#2F80ED'" :textColor="'#333'" :bellColor="'#828282'" />
  </div>
  <section class="hotel__images">
    <div class="container container-2">
      <img class="left-img" src="/public/images/details-1.webp" alt="Room image" />
      <img class="right-img" src="/public/images/details-3.webp" alt="Room image" />
      <img class="right-img" src="/public/images/details-2.webp" alt="Room image" />
      <div class="details-toggle">
        <button class="blue-line">Overview</button>
        <button>Room</button>
      </div>
    </div>
  </section>
  <div class="container"><HomeCovid /> <AppFooter /></div>
</template>

<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import HomeCovid from '../components/reuseables/Covid.vue'

export default {
  name: 'HotelDetails',
  components: {
    AppHeader,
    AppFooter,
    HomeCovid
  },
  setup() {}
}
</script>

<style scoped>
.hotel__images {
  @apply py-10;
  background: linear-gradient(180deg, rgba(244, 244, 244, 0.3) 0%, #fff 100%);
}

.container-2 {
  @apply gap-6;
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-template-rows: repeat(3, max-content);
}

img {
  @apply rounded-lg;
  object-fit: cover;
  height: 100%;
}

.left-img {
  grid-row: 1 / span 2;
  height: 45rem;
  width: 100%;
}

.right-img {
  grid-column: 2 / span 1;
  aspect-ratio: 2/1;
}

.details-toggle {
  @apply flex gap-10 col-span-full mt-3;
  background: #fff;
  box-shadow: 0px 1px 0px 0px #e0e0e0;
}

.details-toggle button {
  @apply text-2xl tracking-wide mt-6 pb-4 relative;
  color: #333;
}
.details-toggle button:first-child {
  @apply ml-28;
}

.details-toggle .blue-line::before {
  @apply absolute min-w-full h-1 bottom-0;
  content: '';
  background: #2f80ed;
}
</style>
