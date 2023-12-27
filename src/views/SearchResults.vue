<script>
import { onMounted, watch, ref } from 'vue'

import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import ErrMessage from '../components/partials/ErrMessage.vue'

import AppSearch from '../components/reuseables/Search.vue'
import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'
import HomeCovid from '../components/reuseables/Covid.vue'

import HotelCard from '../components/search-results/HotelCard.vue'
import SearchPagination from '../components/search-results/Pagination.vue'
import InputSearch from '../components/search-results/InputSearch.vue'
import BudgetFilter from '../components/search-results/BudgetFilter.vue'
import RatingFilter from '../components/search-results/RatingFilter.vue'
import SortResults from '../components/search-results/SortResults.vue'

import useHotelsStore from '/src/store/Hotels.js'
import useFilterationStore from '/src/store/HotelsFilteration.js'

export default {
  name: 'AppSearchResults',
  components: {
    AppHeader,
    AppSearch,
    AppFooter,
    HomeCovid,
    HotelCard,
    SearchPagination,
    LoadingSpinner,
    ErrMessage,
    InputSearch,
    BudgetFilter,
    RatingFilter,
    SortResults
  },

  setup() {
    const { hotelsData, fetchHotels, isLoading, errMessage } = useHotelsStore()
    const { handleFilteration, hotelsSnap, handleBudgetFilteration, clearSearch } =
      useFilterationStore()

    const hotelsDataSnap = ref({ data: {} })

    watch(
      [hotelsData, hotelsDataSnap],
      ([newHotelsData], [newHotelsDataSnap]) => {
        if (newHotelsData) hotelsDataSnap.value.data = newHotelsData.data
        if (newHotelsDataSnap) hotelsSnap.data = newHotelsDataSnap.data.hotels
      },
      { deep: true }
    )

    onMounted(async () => {
      await fetchHotels()
      hotelsDataSnap.value.data = hotelsData.data
      hotelsSnap.data = hotelsDataSnap.value.data.hotels
    })

    return {
      hotelsDataSnap,
      hotelsSnap,
      isLoading,
      errMessage,
      handleFilteration,
      handleBudgetFilteration,
      clearSearch
    }
  }
}
</script>

<template>
  <section class="results__header">
    <AppHeader :logoColor="'#fff'" :textColor="'#fff'" :bellColor="'#fff'" :showNav="true" />
    <AppSearch />
  </section>
  <div class="container-c">
    <section class="results__main">
      <!-- filter results -->
      <div class="filter">
        <!-- by property -->
        <InputSearch
          :hotelsDataSnap="hotelsDataSnap"
          :isLoading="isLoading"
          :errMessage="errMessage"
        />
        <h3 class="text-[#333] text-3xl font-semibold my-1 filter-by">Filter by</h3>
        <!-- by budget -->
        <BudgetFilter
          :isLoading="isLoading"
          :errMessage="errMessage"
          :hotelsDataSnap="hotelsDataSnap"
        />
        <!-- rates -->

        <RatingFilter
          :isLoading="isLoading"
          :errMessage="errMessage"
          :hotelsDataSnap="hotelsDataSnap"
        />
      </div>
      <!-- results view -->
      <div class="results__view">
        <div class="results__view--head">
          <h2 class="results__view--title" v-if="!isLoading.value && !errMessage.state">
            {{
              Object.keys(hotelsDataSnap.data).length > 0 &&
              hotelsDataSnap.data.properties_number > 0
                ? hotelsDataSnap.data.properties_number + ' ' + 'Search results found'
                : '0 Search results found'
            }}
          </h2>
          <!--Sort results-->
          <SortResults
            :isLoading="isLoading"
            :errMessage="errMessage"
            :hotelsDataSnap="hotelsDataSnap"
          />
        </div>
        <!-- Hotel card -->
        <LoadingSpinner
          v-if="isLoading.value"
          :wrapper="'flex items-center gap-3 mx-auto mt-24 w-fit'"
          :text="'text-3xl ml-2'"
        />
        <ErrMessage
          v-if="errMessage.state && !isLoading.value"
          :message="errMessage.value"
          class="w-[90%] sm:w-[65%] text-4xl sm:text-5xl font-medium mx-auto text-center flex justify-center h-full leading-relaxed mt-44"
        />
        <div v-if="!isLoading.value">
          <HotelCard v-for="(hotel, index) in hotelsSnap.data" :key="index" :hotel="hotel" />
        </div>

        <!--Pagination -->
        <SearchPagination
          v-if="!isLoading.value"
          :propertiesNumber="
            Object.keys(hotelsDataSnap.data).length > 0 ? hotelsDataSnap.data.properties_number : 0
          "
        />
      </div>
    </section>
    <div class="px-0 sm:px-[5rem]"><HomeCovid /></div>

    <AppFooter />
  </div>

  <div class="footer__copyright">
    <p>Copyright&copy;2023. All right reserved.</p>
  </div>
</template>

<style scoped>
div.container-c {
  @apply relative -z-10;
}
.results__header {
  position: relative;
  background: linear-gradient(180deg, #2969bf 0%, #144e9d 100%);
  padding: 0 5rem;
  height: 20rem;
}

.results__main {
  @apply grid grid-cols-2 mt-40 mb-28 px-0 gap-x-6 py-0  sm:px-[5rem] sm:gap-x-0;
  grid-template-columns: min-content 1fr;

  @media screen and (width< 53.75em) {
    @apply flex flex-col;
  }
}

.filter {
  @apply flex flex-col gap-8 rounded-lg;
  @media screen and (width< 53.75em) {
    @apply grid mb-20;
    grid-template-columns: 1fr max-content max-content;
    grid-template-rows: max-content min-content min-content;
  }
}

.filter-by {
  @media screen and (width< 53.75em) {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
}

.results__view--head {
  @apply flex justify-between px-14 relative;

  @media screen and (width< 53.75em) {
    @apply justify-start px-6;
  }
}

.results__view--title {
  @apply text-3xl font-semibold;
}

/* ///////////////////////////////////// */

.taxes {
  @apply text-lg font-light tracking-wide;
  grid-column: 1/-1;

  text-align: left;
  color: #333;
}

.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}
</style>

<style>
.filter__title {
  @apply text-2xl font-medium tracking-wide px-6 py-6 bg-gray-100 relative;
  border-radius: 0.5rem 0.5rem 0 0;
  color: #181818;
}

.un-filter {
  @apply absolute top-[50%] -translate-y-1/2 right-6 text-base font-medium text-gray-700 cursor-pointer hover:text-gray-600 p-1;
}

.filter__body {
  @apply bg-gray-100 px-6 pb-7;
  border-radius: 0 0 0.5rem 0.5rem;
}

.filter__input {
  @apply outline-none w-full;
}

.filter__input::placeholder {
  @apply text-[#4F4F4F] text-xl leading-7 tracking-wide;
}

.icon-input {
  @apply bg-white p-1;
  width: 2rem;
  height: 2rem;
}

.icon-input-1 {
  width: 3.2rem;
  height: 2rem;
}

.icon-input-2 {
  width: 1.8rem;
  height: 1.8rem;
  transform: translateY(-0.35rem);
}
</style>
