<script setup>
import AppHeader from '/src/components/partials/AppHeader.vue'

import TripCard from '/src/components/my-trips/TripCard.vue'

import ErrMessage from '../components/partials/ErrMessage.vue'

import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'

import { subtractDates } from '/src/helper/subtractDates.js'

import { doc, getDoc } from 'firebase/firestore'
import { usersCollection, auth, onAuthStateChanged } from '/src/services/firebase.js'

import { onMounted, ref } from 'vue'

const userTrips = ref({ data: [] })
const id = ref('')

const isLoading = ref({ state: false })
const errMessage = ref({
  state: false,
  value: '🤕 Failed to connect to the server please check your connection and try again'
})

onMounted(() => {
  isLoading.value.state = true
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      id.value = user.uid
      try {
        const fetchUserRef = await getDoc(doc(usersCollection, user.uid))

        if (fetchUserRef.exists()) {
          const trips = fetchUserRef.data().trips
          userTrips.value.data = trips
        }
      } catch (error) {
        errMessage.value.state = true
        isLoading.value.state = false
      }
    }
    isLoading.value.state = false
  })
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
  <div class="trips__container container-grey" v-if="!isLoading.state && !errMessage.state">
    <h1 class="trips__title">My trips</h1>
    <TripCard v-for="(trip, index) in userTrips.data" :key="index">
      <template v-slot:image>
        <img
          :src="trip && trip.image ? trip.image : '/images/fallback.webp'"
          alt=""
          class="result__card--img"
        />
      </template>

      <template v-slot:title>
        <h3 class="results__card--title">{{ trip.name }}</h3>
      </template>
      <template v-slot:rating>
        <img
          class="icon-2"
          src="/images/star-s-fill 5.svg"
          alt="star icon"
          v-for="(star, index) in Math.ceil(trip.rating)"
          :key="index"
        />

        <p class="results__card--review">{{ trip.rating }} ({{ trip.reviews }} reviews)</p>
      </template>

      <template v-slot:date>
        <li class="results__card--item text-[#4F4F4F]">Check in: {{ trip.date.checkin }}</li>
        <li class="results__card--item text-[#4F4F4F]">Check out: {{ trip.date.checkout }}</li>
        <li class="results__card--item text-[#4F4F4F]">
          {{ subtractDates(trip.date.checkin, trip.date.checkout) }} night stay
        </li>
      </template>

      <template v-slot:price>
        <p class="price--red" v-if="trip.price_discount">{{ trip.price_gross }}</p>
        <p class="price--black" v-if="trip.price_discount">{{ trip.price_discount }}</p>
        <p class="price--black" v-if="!trip.price_discount">{{ trip.price_gross }}</p>
        <p class="taxes">Includes taxes and fees</p>
      </template>

      <template v-slot:btn>
        <router-link :to="`/trip/${id}&${trip.id}`" class="blue__btn mt-5 col-span-full"
          >View trip details</router-link
        >
      </template>
    </TripCard>
  </div>
</template>

<style scoped>
.trips__container {
  @apply bg-[#F4F4F4] w-full h-[1440px] px-72 py-24;
}

.trips__title {
  @apply text-[#1A1A1A] text-5xl font-semibold tracking-wide;
}

.results__card--title {
  @apply text-3xl font-medium tracking-wide;
  color: #1a1a1a;
}

.result__card--img {
  @apply rounded-md;
  width: 28.5rem;
  height: 20rem;
  object-fit: cover;
}

.results__card--review {
  @apply text-lg leading-10;
  color: #4f4f4f;
}

.results__card--item {
  @apply text-xl leading-9 tracking-wide;
}

.price--red {
  @apply text-lg font-medium tracking-wide line-through text-right;
  color: #eb5757;
}
.price--black {
  @apply text-2xl font-medium tracking-wide text-right;
  color: #333;
}
</style>
