<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import ErrMessage from '../components/partials/ErrMessage.vue'
import AppSearch from '../components/reuseables/Search.vue'
import HomeCovid from '../components/reuseables/Covid.vue'
import HotelCard from '../components/search-results/HotelCard.vue'
import SearchPagination from '../components/search-results/Pagination.vue'
import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'
import { onMounted, watch } from 'vue'
import useHotelsStore from '/src/store/Hotels.js'
import useFilterationStore from '/src/store/HotelsFilteration.js'
import InputSearch from '../components/search-results/InputSearch.vue'
import BudgetFilter from '../components/search-results/BudgetFilter.vue'
import { ref } from 'vue'

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
    BudgetFilter
  },

  setup() {
    const startRanges = [1, 2, 3, 4, 5]

    const sortOptions = ref([
      { id: 'price_low_high', title: 'Price: Low to High' },
      { id: 'price_high_low', title: 'Price: High to Low' },
      { id: 'rating_low_high', title: 'Rating: Low to High' },
      { id: 'rating_high_low', title: 'Rating: High to Low' }
    ])

    const selectedSortOption = ref('')

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
      //let filterQuery = {}
      // localStorage.setItem('filterQuery', JSON.stringify(filterQuery))
    })

    return {
      startRanges,
      sortOptions,
      selectedSortOption,
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
        <div class="rating">
          <h3 class="filter__title">Rating</h3>
          <div class="rating__main">
            <p class="w-fit text-[1.4rem] text-gray-600">Show only ratings more than</p>
            <ul class="rating__list">
              <li class="rating__item" v-for="(item, index) in startRanges" :key="index">
                {{ item }}
                <img class="icon-input-2" src="/images/star-s-fill 5.svg" alt="star icon-input" />
              </li>
            </ul>
          </div>
        </div>
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
          <div class="ml-auto relative">
            <select
              class="results__view--sort"
              v-model="selectedSortOption"
              @change="fetchSortedPage(selectedSortOption)"
            >
              <option value="">Recommended</option>
              <option v-for="(item, index) in sortOptions" :key="index" :value="item.id">
                {{ item.title }}
              </option>
            </select>
            <span>Sort by</span>
          </div>
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

.rating {
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  @media screen and (width< 53.75em) {
    grid-row: 3 / span 1;
    grid-column: 3 / span 1;
    height: min-content;
  }
}

.rating__main {
  @apply flex flex-col gap-4 p-5;
}

.rating__list {
  @apply flex w-fit items-start gap-1;
  border-radius: 0px 5px 5px 0px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
}

.rating__item {
  @apply flex items-end p-2 text-[1.6rem] cursor-pointer;
  border-right: 1px solid var(--Gray-5, #e0e0e0);
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

.results__view--sort {
  @apply text-[1.4rem] rounded-lg bg-white px-6 pb-2 pt-9 outline-none;

  border: 1px solid #bdbdbd;
}

.results__view--sort option {
  @apply flex flex-col text-2xl;
}

.results__view--head span {
  @apply absolute text-[1.2rem] text-[#828282] left-[2rem] top-[0.4rem];
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
  @apply text-2xl font-medium tracking-wide px-6 py-6 bg-gray-100;
  border-radius: 0.5rem 0.5rem 0 0;
  color: #181818;
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
