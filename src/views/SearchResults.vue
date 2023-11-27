<template>
  <section class="results__header">
    <AppHeader :logoColor="'#fff'" :textColor="'#fff'" />
    <AppSearch />
  </section>
  <HomeCovid />
  <AppFooter />
  <div class="footer__copyright">
    <p>Copyright&copy;2023. All right reserved.</p>
  </div>
</template>

<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import AppSearch from '../components/home/Search.vue'
import HomeCovid from '../components/home/Covid.vue'

export default {
  name: 'AppSearchResults',
  components: { AppHeader, AppSearch, AppFooter, HomeCovid },

  setup() {}
}
</script>

<style scoped>
.results__header {
  background: linear-gradient(180deg, #2969bf 0%, #144e9d 100%);
  padding: 0 5rem;
}
.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl 
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}
</style>
