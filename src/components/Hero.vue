<template>
  <section class="hero">
    <h1 class="hero__title">Enjoy Your Dream Vacation</h1>
    <p class="hero__desc">
      Plan and book our perfect trip with expert advice, travel tips, destination <br />
      information and inspiration from us
    </p>
    <AppSearch />
  </section>
</template>

<script>
import AppSearch from '../components/Search.vue'
export default {
  name: 'AppHero',
  components: { AppSearch }
}
</script>

<style scoped>
.hero {
  @apply mx-auto my-4 rounded-lg flex flex-col justify-center gap-12 relative;

  width: 90%;
  aspect-ratio: 2.35/1;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(../../public/images/hero-large.webp) lightgray 0px -72.075px / 100% 165.959% no-repeat;
  background-size: cover;
}

.hero__title {
  @apply text-white text-center text-5xl font-bold;
}

.hero__desc {
  @apply text-white text-center text-2xl font-normal leading-relaxed tracking-wide;
}
</style>
