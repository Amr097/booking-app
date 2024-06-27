<script setup>
import { onMounted, watch, ref } from 'vue'

import AppHeader from '../components/partials/AppHeader.vue'
import AppFooter from '../components/partials/AppFooter.vue'
import ErrMessage from '../components/partials/ErrMessage.vue'

import AppSearch from '../components/reuseables/AppSearch.vue'
import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'
import HomeCovid from '../components/reuseables/AppCovid.vue'

import HotelCard from '../components/search-results/HotelCard.vue'
import SearchPagination from '../components/search-results/Pagination.vue'
import InputSearch from '../components/search-results/InputSearch.vue'
import BudgetFilter from '../components/search-results/BudgetFilter.vue'
import RatingFilter from '../components/search-results/RatingFilter.vue'
import SortResults from '../components/search-results/SortResults.vue'

import useHotelsStore from '/src/store/Hotels.js'
import useFilterationStore from '/src/store/HotelsFilteration.js'

const { hotelsData, fetchHotels, isLoading, errMessage } = useHotelsStore()
const { hotelsSnap } = useFilterationStore()

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

        <input type="checkbox" id="popup" class="popup-checkbox" />
        <label for="popup" class="popup-label"
          ><svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="vuesax/outline/setting-4">
              <g id="setting-4">
                <path
                  id="Vector"
                  d="M1.33337 4.83334H5.33337C5.60671 4.83334 5.83337 4.60668 5.83337 4.33334C5.83337 4.06001 5.60671 3.83334 5.33337 3.83334H1.33337C1.06004 3.83334 0.833374 4.06001 0.833374 4.33334C0.833374 4.60668 1.06004 4.83334 1.33337 4.83334Z"
                />
                <path
                  id="Vector_2"
                  d="M12 4.83334H14.6667C14.94 4.83334 15.1667 4.60668 15.1667 4.33334C15.1667 4.06001 14.94 3.83334 14.6667 3.83334H12C11.7267 3.83334 11.5 4.06001 11.5 4.33334C11.5 4.60668 11.7267 4.83334 12 4.83334Z"
                />
                <path
                  id="Vector_3"
                  d="M9.33335 7.16667C10.8934 7.16667 12.1667 5.89333 12.1667 4.33333C12.1667 2.77333 10.8934 1.5 9.33335 1.5C7.77335 1.5 6.50002 2.77333 6.50002 4.33333C6.50002 5.89333 7.77335 7.16667 9.33335 7.16667ZM9.33335 2.5C10.3467 2.5 11.1667 3.32 11.1667 4.33333C11.1667 5.34667 10.3467 6.16667 9.33335 6.16667C8.32002 6.16667 7.50002 5.34667 7.50002 4.33333C7.50002 3.32 8.32002 2.5 9.33335 2.5Z"
                />
                <path
                  id="Vector_4"
                  d="M1.33333 12.1667H4C4.27333 12.1667 4.5 11.94 4.5 11.6667C4.5 11.3933 4.27333 11.1667 4 11.1667H1.33333C1.06 11.1667 0.833333 11.3933 0.833333 11.6667C0.833333 11.94 1.06 12.1667 1.33333 12.1667Z"
                />
                <path
                  id="Vector_5"
                  d="M10.6667 12.1667H14.6667C14.94 12.1667 15.1667 11.94 15.1667 11.6667C15.1667 11.3933 14.94 11.1667 14.6667 11.1667H10.6667C10.3934 11.1667 10.1667 11.3933 10.1667 11.6667C10.1667 11.94 10.3934 12.1667 10.6667 12.1667Z"
                />
                <path
                  id="Vector_6"
                  d="M6.66667 14.5C8.22667 14.5 9.5 13.2267 9.5 11.6667C9.5 10.1067 8.22667 8.83333 6.66667 8.83333C5.10667 8.83333 3.83333 10.1067 3.83333 11.6667C3.83333 13.2267 5.10667 14.5 6.66667 14.5ZM6.66667 9.83333C7.68 9.83333 8.5 10.6533 8.5 11.6667C8.5 12.68 7.68 13.5 6.66667 13.5C5.65333 13.5 4.83333 12.68 4.83333 11.6667C4.83333 10.6533 5.65333 9.83333 6.66667 9.83333Z"
                />
              </g>
            </g></svg
        ></label>

        <div class="filter__container--popup">
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
          v-if="!isLoading.value && !errMessage.state"
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

<style scoped lang="postcss">
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

  @media screen and (max-width: 53.75em) {
    @apply flex flex-col;
  }
}

.filter {
  @apply flex flex-col gap-8 rounded-lg;
  @media screen and (max-width: 53.75em) {
    @apply grid mb-16;
    grid-template-columns: 1fr;
    grid-template-rows: max-content;
  }
}

.popup-checkbox,
.popup-label {
  @apply absolute top-[13.5rem] right-[22rem] sm:right-[26rem] z-20;
  display: none;
  @media screen and (max-width: 53.75em) {
    display: block;
  }
}

.popup-label svg {
  @apply fill-[#8B8B8B];
}

.popup-checkbox {
  @apply absolute invisible;
}

.popup-checkbox:checked ~ .filter__container--popup {
  @apply scale-y-100 visible transition-transform duration-150;
}

.popup-checkbox:checked + .popup-label {
  @apply bg-blue-500  border-white;
}

.popup-checkbox:checked + .popup-label svg {
  @apply fill-white;
}

.popup-label {
  @apply border border-solid border-gray-400 rounded-md py-2 px-4;
}

.filter__container--popup {
  @apply flex flex-col gap-8 rounded-lg;

  @media screen and (max-width: 53.75em) {
    @apply scale-y-0 invisible h-fit
    w-max absolute top-[18rem] right-[0.2rem] sm:right-[10rem] bg-white z-20 flex-row p-6 border shadow-lg origin-top;
  }
}

.filter__container--popup .filter-by {
  @media screen and (max-width: 53.75em) {
    display: none;
  }
}

.filter-by {
  @media screen and (max-width: 53.75em) {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
}

.results__view--head {
  @apply flex justify-between px-14 relative;

  @media screen and (max-width: 53.75em) {
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
  @apply absolute top-[50%] -translate-y-1/2 right-6 text-base font-medium text-gray-700 
  cursor-pointer hover:text-gray-600 px-[0.05rem];
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
