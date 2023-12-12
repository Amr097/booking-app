<template>
  <div class="pagination">
    <button :disabled="!(currentPage.number > 1)" @click="decrement">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        :class="{ 'arrow-active': currentPage.number > 1 }"
      >
        <g filter="url(#filter0_d_25_579)">
          <path
            d="M26 50C20.3431 50 17.5147 50 15.7574 48.2426C14 46.4853 14 43.6569 14 38L14 22C14 16.3431 14 13.5147 15.7574 11.7574C17.5147 10 20.3431 10 26 10H42C47.6569 10 50.4853 10 52.2426 11.7574C54 13.5147 54 16.3431 54 22L54 38C54 43.6569 54 46.4853 52.2426 48.2426C50.4853 50 47.6569 50 42 50H26Z"
            fill="white"
            shape-rendering="crispEdges"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.7524 29.7831L37.2502 25.8391C37.5831 25.5468 37.5831 25.0754 37.2502 24.7831C37.0916 24.6435 36.8752 24.565 36.6496 24.565C36.4239 24.565 36.2075 24.6435 36.0489 24.7831L30.9504 29.2544C30.6165 29.5463 30.6165 30.0184 30.9504 30.3104L36.0487 34.7816C36.2075 34.9212 36.4239 34.9998 36.6496 34.9998C36.8752 34.9998 37.0916 34.9212 37.2504 34.7816C37.5831 34.4893 37.5831 34.0178 37.25 33.7256L32.7524 29.7831Z"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_25_579"
            x="0"
            y="0"
            width="68"
            height="68"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="7" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_579" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_25_579"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>

    <div class="numbers__list">
      <button :class="{ 'page-active': checkNumbering(1) }" @click="setPage(1)">1</button>
      <button
        :class="{ 'page-active': checkNumbering(2) }"
        :disabled="currentPage.number > 3"
        @click="setPage(2)"
      >
        {{ currentPage.number <= 3 ? 2 : '...' }}
      </button>
      <button
        :class="{ 'page-active': checkNumbering(3) || currentPage.number > 3 }"
        :disabled="currentPage.number >= 3"
        @click="setPage(3)"
      >
        {{ currentPage.number <= 3 ? 3 : currentPage.number }}
      </button>
      <button>...</button>
      <button>{{ totalPages || 28 }}</button>
    </div>

    <button :disabled="!(currentPage.number < 20 && currentPage.number >= 1)" @click="increment">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        :class="{ 'arrow-active': currentPage.number < 20 && currentPage.number >= 1 }"
      >
        <g filter="url(#filter0_d_25_592)">
          <path
            d="M42 50C47.6569 50 50.4853 50 52.2426 48.2426C54 46.4853 54 43.6569 54 38L54 22C54 16.3431 54 13.5147 52.2426 11.7574C50.4853 10 47.6569 10 42 10H26C20.3431 10 17.5147 10 15.7574 11.7574C14 13.5147 14 16.3431 14 22L14 38C14 43.6569 14 46.4853 15.7574 48.2426C17.5147 50 20.3431 50 26 50H42Z"
            fill="white"
            shape-rendering="crispEdges"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.2476 29.7831L30.7498 25.8391C30.4169 25.5468 30.4169 25.0754 30.7498 24.7831C30.9084 24.6435 31.1248 24.565 31.3504 24.565C31.5761 24.565 31.7925 24.6435 31.9511 24.7831L37.0496 29.2544C37.3835 29.5463 37.3835 30.0184 37.0496 30.3104L31.9513 34.7816C31.7925 34.9212 31.5761 34.9998 31.3504 34.9998C31.1248 34.9998 30.9084 34.9212 30.7496 34.7816C30.4169 34.4893 30.4169 34.0178 30.75 33.7256L35.2476 29.7831Z"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_25_592"
            x="0"
            y="0"
            width="68"
            height="68"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="7" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_592" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_25_592"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import useHotelsStore from '../../store/Hotels.js'
import usePageStore from '../../store/Page.js'
export default {
  name: 'SearchPagination',
  props: {
    meta: String
  },
  setup(props) {
    const isLoading = ref(false)
    const { fetchHotels } = useHotelsStore()
    const { currentPage } = usePageStore()

    const totalPages = computed(() => {
      return Math.ceil(+props.meta / 20)
    })

    const checkNumbering = (page) => {
      return page === currentPage.number
    }

    const searchQuery = JSON.parse(localStorage.getItem('searchQuery'))

    const increment = () => {
      if (currentPage.number <= 20) {
        currentPage.number = currentPage.number + 1
        const options = {
          method: 'GET',
          url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
          params: {
            dest_id: searchQuery.dest_id,
            search_type: 'CITY',
            arrival_date: searchQuery.arrival_date,
            departure_date: searchQuery.departure_date,
            adults: searchQuery.adults,
            children_age: '1,17',
            room_qty: searchQuery.room_qty,
            page_number: currentPage.number
          },
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
          }
        }

        fetchHotels(options, searchQuery, isLoading)
      }
    }

    const decrement = () => {
      if (currentPage.number > 1) currentPage.number = currentPage.number - 1
      const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          dest_id: searchQuery.dest_id,
          search_type: 'CITY',
          arrival_date: searchQuery.arrival_date,
          departure_date: searchQuery.departure_date,
          adults: searchQuery.adults,
          children_age: '1,17',
          room_qty: searchQuery.room_qty,
          page_number: currentPage.number
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }

      fetchHotels(options, searchQuery, isLoading)
    }

    const setPage = (page) => {
      currentPage.number = page

      const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          dest_id: searchQuery.dest_id,
          search_type: 'CITY',
          arrival_date: searchQuery.arrival_date,
          departure_date: searchQuery.departure_date,
          adults: searchQuery.adults,
          children_age: '1,17',
          room_qty: searchQuery.room_qty,
          page_number: page
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }

      fetchHotels(options, searchQuery, isLoading)
    }

    return { currentPage, checkNumbering, increment, decrement, totalPages, setPage }
  }
}
</script>

<style scoped>
button {
  @apply cursor-pointer;
}
svg {
  fill: #c5c5c5;
}

.arrow-active {
  fill: #2f80ed;
}

.pagination {
  @apply flex gap-1 items-center justify-center mt-20;
}

.numbers__list {
  @apply flex;
}

.numbers__list button {
  @apply text-lg leading-4 tracking-tight cursor-pointer;
  color: #9e9e9e;
  padding: 1rem 1.35rem 1rem 1.45rem;
}

.page-active {
  @apply text-white bg-blue-500 rounded-md !important;
}
</style>
