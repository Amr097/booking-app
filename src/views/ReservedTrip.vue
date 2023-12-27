<script setup>
import AppHeader from '../components/partials/AppHeader.vue'
import AppFooter from '../components/partials/AppFooter.vue'
import ErrMessage from '../components/partials/ErrMessage.vue'

import HomeCovid from '../components/reuseables/AppCovid.vue'
import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'

import HotelInfo from '../components/hotel-details/HotelInfo.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { doc, getDoc } from 'firebase/firestore'
import { usersCollection } from '/src/services/firebase.js'

const trip = ref({ data: {} })

const isLoading = ref({ state: false })
const errMessage = ref({
  state: false,
  value: '🤕 Failed to connect to the server please check your connection and try again'
})

onMounted(async () => {
  isLoading.value.state = true
  const route = useRoute()

  const path = route.params.id
  const splitPath = path.split('&')
  const userId = splitPath[0]
  const tripId = splitPath[1]

  const tripRef = doc(usersCollection, userId)
  try {
    const tripSnap = await getDoc(tripRef)
    if (tripSnap.exists()) {
      const trips = tripSnap.data().trips

      const currentTrip = trips.filter((trip) => {
        return trip.id === tripId
      })
      trip.value.data = currentTrip[0]
    }
  } catch (error) {
    errMessage.value.state = true
    isLoading.value.state = false
  }

  isLoading.value.state = false
})
</script>

<template>
  <div class="container-c">
    <AppHeader :logoColor="'#2F80ED'" :textColor="'#333'" :bellColor="'#828282'" :showNav="true" />
  </div>
  <LoadingSpinner
    v-if="isLoading.state"
    :wrapper="'flex items-center gap-3 mx-auto mt-44 w-fit'"
    :text="'text-5xl ml-2'"
    :details="true"
  />
  <ErrMessage
    v-if="errMessage.state && !isLoading.state"
    :message="errMessage.value"
    class="w-[90%] sm:w-[65%] text-4xl sm:text-5xl font-medium mx-auto text-center flex justify-center h-full leading-relaxed mt-44"
  />
  <div class="container-grey" v-if="!isLoading.state && !errMessage.state">
    <section class="hotel__images">
      <div class="container-c container-2">
        <img
          class="left-img"
          :src="trip.data.image ? trip.data.image : '/images/fallback.webp'"
          alt="Room image"
        />
        <img class="right-img" src="/images/details-3.webp" alt="Room image" />
        <img class="right-img" src="/images/details-2.webp" alt="Room image" />
      </div>

      <div class="details-toggle">
        <button class="blue-line">Overview</button>
        <button>Room</button>
      </div>
    </section>
    <div class="container-3 flex details-content">
      <!-- HOTEL INFO -->
      <HotelInfo>
        <template v-slot:title>
          <h1 class="info__title">{{ trip.data.name }}</h1>
        </template>
        <template v-slot:article>
          <article class="overview__article">
            <slot name="title"></slot>
            Featuring free WiFi throughout the property, {{ trip.data.name }} offers accommodations
            in Lakes Entrance, 19 mi from Bairnsdale. Free private parking is available on site.
            <br />
            <br />Each room at this motel is air conditioned and comes with a flat-screen TV. You
            will find a kettle, toaster and a microwave in the room. Each room is fitted with a
            private bathroom. Guests have access to barbecue facilities and a lovely large lawn
            area. Metung is 6.8 mi from {{ trip.data.name }}, while Paynesville is 14 mi from the
            property.
            <br />
            <br />
            Couples in particular like the location – they rated it 9.2 for a two-person trip.
          </article>
        </template>
      </HotelInfo>
    </div>

    <div class="container-c pt-30 mt-40">
      <HomeCovid />

      <AppFooter :style="{ backgroundColor: 'transparent', zIndex: '1' }" />
    </div>
    <div class="footer__copyright">
      <p>Copyright&copy;2023. All right reserved.</p>
    </div>
  </div>
</template>

<style scoped>
.hotel__images {
  @apply pt-10 relative;
  z-index: 1;
  background: linear-gradient(180deg, rgba(244, 244, 244, 0.3) 0%, #fff 100%);
}

.container-2 {
  @apply gap-6;
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-template-rows: repeat(3, max-content);

  @media screen and (width<=46.875em) {
    grid-template-columns: repeat(2, 1fr);
  }
}

img {
  object-fit: cover;
  height: 100%;
  border-radius: 6px 6px 0 0;
}

.left-img {
  grid-row: 1 / span 2;
  height: 45rem;
  width: 100%;

  @media screen and (width<=46.875em) {
    grid-row: 1 / span 1;
    grid-column: 1 / -1;
    height: 30rem;
  }
}

.right-img {
  grid-column: 2 / span 1;
  aspect-ratio: 2/1;

  @media screen and (width<=46.875em) {
    grid-column: auto;
  }
}

.details-toggle {
  @apply flex gap-10 col-span-full mt-3 bg-transparent;
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

.details-content {
  @media screen and (width<= 40em) {
    flex-direction: column;
  }
}

.info {
  @apply flex-grow flex-shrink-0 basis-[60%];
}

.info__title {
  @apply text-5xl font-semibold tracking-wide;
  color: #1a1a1a;
}

.container-3 {
  @apply relative mx-auto;
  width: 90%;

  @media screen and (width < 66.25em) {
    width: 95%;
  }
}

.overview__article {
  @apply text-3xl leading-8 tracking-wide mt-7;
  color: #4f4f4f;
}

.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl 
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}
</style>
