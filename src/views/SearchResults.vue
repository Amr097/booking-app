<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import AppSearch from '../components/reuseables/Search.vue'
import HomeCovid from '../components/reuseables/Covid.vue'
import HotelCard from '../components/search-results/HotelCard.vue'
import SearchPagination from '../components/search-results/Pagination.vue'
import { hotelData } from '../assets/data/hotels.js'

// import usePageStore from '../store/Page.js'
import { ref } from 'vue'

export default {
  name: 'AppSearchResults',
  components: { AppHeader, AppSearch, AppFooter, HomeCovid, HotelCard, SearchPagination },

  setup() {
    const filterRanges = [
      { name: '0-200', min: 0, max: 200 },
      { name: '200-500', min: 200, max: 500 },
      { name: '500-1000', min: 500, max: 1000 },
      { name: '1000-2000', min: 1000, max: 2000 },
      { name: '2000-3000', min: 2000, max: 3000 }
    ]

    const startRanges = [1, 2, 3, 4, 5]

    // const { currentPage } = usePageStore()

    const sortOptions = ref([
      { id: 'price_low_high', title: 'Price: Low to High' },
      { id: 'price_high_low', title: 'Price: High to Low' },
      { id: 'rating_low_high', title: 'Rating: Low to High' },
      { id: 'rating_high_low', title: 'Rating: High to Low' }
    ])

    const selectedSortOption = ref('')

    const handleToggle = (event) => {
      if (event.target.checked) toggleBudget.value.state = false
      else toggleBudget.value.state = true
    }

    const toggleBudget = ref({ state: true })

    return {
      filterRanges,
      startRanges,
      sortOptions,
      selectedSortOption,
      hotelData,
      toggleBudget,
      handleToggle
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
        <div class="filter__property">
          <h3 class="filter__title">Search by property name</h3>
          <div class="filter__body">
            <div class="flex bg-white gap-1 p-2 rounded-md">
              <svg fill="none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path
                  d="m9.1667 16.333c3.6819 0 6.6666-2.9847 6.6666-6.6666 0-3.6819-2.9847-6.6667-6.6666-6.6667-3.6819 0-6.6667 2.9848-6.6667 6.6667 0 3.6819 2.9848 6.6666 6.6667 6.6666z"
                  stroke="#4F4F4F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="m17.5 18-3.625-3.625"
                  stroke="#4F4F4F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              <!--property input -->
              <input class="filter__input" type="text" placeholder="eg. Beach westpalm" />
            </div>
          </div>
        </div>
        <h3 class="text-[#333] text-3xl font-semibold my-1 filter-by">Filter by</h3>
        <!-- by budget -->
        <div class="filter__budget">
          <h3 class="filter__title">Your budget per day</h3>
          <div class="filter__ranges">
            <!--budget checkboxes -->
            <ul class="ranges__list">
              <li class="ranges__item" v-for="(item, index) in filterRanges" :key="index">
                <input
                  class="ranges__check"
                  type="checkbox"
                  :id="item.name"
                  @change="fetchFilteredHotels(item.min, item.max, $event)"
                />
                <label class="ranges__label" :for="item.name"
                  >$ {{ item.min }} - $ {{ item.max }}</label
                >
              </li>
            </ul>
            <!--set your own budget -->
            <div class="filter__set">
              <div class="flex items-center justify-between">
                <h4 class="text-[1.4rem] text-gray-600">Set your own budget</h4>
                <label class="switch">
                  <input type="checkbox" @change="handleToggle" />
                  <span class="slider"></span>
                </label>
              </div>
              <!--custom budget -->
              <div class="budget__handler">
                <input
                  type="text"
                  placeholder="Max budget"
                  class="budget__input"
                  :disabled="toggleBudget.state"
                />
                <input
                  type="text"
                  placeholder="Min budget"
                  class="budget__input"
                  :disabled="toggleBudget.state"
                />
                <p class="budget__handler--text">Press Enter to filter</p>
              </div>
            </div>
          </div>
        </div>
        <!-- rates -->
        <div class="rating">
          <h3 class="filter__title">Rating</h3>
          <div class="rating__main">
            <p class="w-fit text-[1.4rem] text-gray-600">Show only ratings more than</p>
            <ul class="rating__list">
              <li class="rating__item" v-for="(item, index) in startRanges" :key="index">
                {{ item }}
                <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- results view -->
      <div class="results__view">
        <div class="results__view--head">
          <h2 class="results__view--title">
            <!-- {{ meta.length > 0 ? meta + ' ' + 'search results found' : '' }} -->
          </h2>
          <div class="relative">
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

        <HotelCard v-for="(hotel, index) in hotelData[0].hotels" :key="index" :hotel="hotel" />

        <!--Pagination -->
        <SearchPagination :hotelData="hotelData[0]" />
      </div>
    </section>
    <div class="px-[5rem]"><HomeCovid /></div>

    <AppFooter />
  </div>

  <div class="footer__copyright">
    <p>Copyright&copy;2023. All right reserved.</p>
  </div>
</template>

<!-- <script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import AppSearch from '../components/reuseables/Search.vue'
import HomeCovid from '../components/reuseables/Covid.vue'
import HotelCard from '../components/search-results/HotelCard.vue'
import SearchPagination from '../components/search-results/Pagination.vue'
import useHotelsStore from '../store/Hotels.js'
import usePageStore from '../store/Page.js'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'AppSearchResults',
  components: { AppHeader, AppSearch, AppFooter, HomeCovid, HotelCard, SearchPagination },

  setup() {
    const filterRanges = [
      { name: '0-200', min: 0, max: 200 },
      { name: '200-500', min: 200, max: 500 },
      { name: '500-1000', min: 500, max: 1000 },
      { name: '1000-2000', min: 1000, max: 2000 },
      { name: '2000-3000', min: 2000, max: 3000 }
    ]

    const startRanges = [1, 2, 3, 4, 5]

    const { hotelsData, fetchHotels } = useHotelsStore()
    const { currentPage } = usePageStore()

    const hotels = computed(() => hotelsData.hotels)
    const meta = computed(() => (hotelsData.meta[0] ? hotelsData.meta[0].title.split(' ')[0] : ''))

    const sortOptions = ref([
      { id: 'price_low_high', title: 'Entire homes and apartments first' },
      { id: 'price_high_low', title: 'Price: High to Low' },
      { id: 'rating_high_low', title: 'Rating: High to Low' },
      { id: 'rating_low_high', title: 'Rating: Low to High' }
    ])
    const isLoading = ref(false)
    const selectedSortOption = ref('')

    const searchQuery = JSON.parse(localStorage.getItem('searchQuery'))

    // fetch sort options on mounting
    onMounted(async () => {
      const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getSortBy',
        params: {
          dest_id: searchQuery.dest_id,
          search_type: 'CITY',
          arrival_date: searchQuery.arrival_date,
          departure_date: searchQuery.departure_date,
          adults: searchQuery.adults,
          room_qty: searchQuery.room_qty
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }
      try {
        await axios.request(options).then((res) => {
          sortOptions.value = res.data.data
          console.log(res)
        })
      } catch (error) {
        console.error(error)
      }
    })

    //fetch sorted page
    const fetchSortedPage = async (sortOptionId) => {
      const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          dest_id: searchQuery.dest_id,
          search_type: 'CITY',
          arrival_date: searchQuery.arrival_date,
          departure_date: searchQuery.departure_date,
          adults: searchQuery.adults,
          room_qty: searchQuery.room_qty,
          sort_by: sortOptionId,
          page_number: currentPage.number
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }
      fetchHotels(options, searchQuery, isLoading)
    }

    //fetch filtered hotels based on budget checkboxes

    const fetchFilteredHotels = async (min, max, event) => {
      const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          dest_id: searchQuery.dest_id,
          search_type: 'CITY',
          arrival_date: searchQuery.arrival_date,
          departure_date: searchQuery.departure_date,
          adults: searchQuery.adults,
          room_qty: searchQuery.room_qty,
          page_number: currentPage.number
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }

      if (event.target.checked) {
        options.params.price_min = min
        options.params.price_max = max
      } else {
        delete options.params.price_min
        delete options.params.price_max
      }

      fetchHotels(options, searchQuery, isLoading)
    }

    return {
      filterRanges,
      startRanges,
      hotels,
      meta,
      sortOptions,
      selectedSortOption,
      fetchSortedPage,
      fetchFilteredHotels
    }
  }
}
</script> -->

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

.filter__budget {
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  padding-bottom: 1rem;

  @media screen and (width< 53.75em) {
    grid-row: 3 / span 1;
    grid-column: 1 / span 1;
  }
}

.filter-by {
  @media screen and (width< 53.75em) {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
}

.filter__property {
  @apply flex flex-col rounded-lg;
  @media screen and (width< 53.75em) {
    grid-column: 1 / -1;
  }
}

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

.ranges__list {
  @apply px-4 py-3 flex flex-col gap-3 mb-3 mt-2;
}

.ranges__item {
  @apply flex items-center gap-2;
}

.ranges__label {
  @apply text-gray-600 text-[1.4rem] tracking-wide;
}

.filter__set {
  @apply flex flex-col gap-3 justify-between px-4;
}

.budget__handler {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 1.2rem;
  grid-row-gap: 0.8rem;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  padding-bottom: 0.3rem;
}

.budget__input {
  @apply w-[10rem] h-[3.9rem] text-center rounded-md outline-none bg-white text-[1.2rem] mt-1;

  border: 1px solid var(--Gray-5, #e0e0e0);
}

.budget__input::placeholder {
  color: #333;
}

.budget__handler--text {
  @apply text-[1.2rem] text-[#4f4f4f];
  grid-column: 1/-1;
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

.icon {
  @apply bg-white p-1;
  width: 2rem;
  height: 2rem;
}

.icon-1 {
  width: 3.2rem;
  height: 2rem;
}

.icon-2 {
  width: 1.8rem;
  height: 1.8rem;
  transform: translateY(-0.35rem);
}

.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}
</style>
