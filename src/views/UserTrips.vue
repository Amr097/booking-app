<script setup>
import AppHeader from '/src/components/partials/AppHeader.vue'

import TripCard from '/src/components/my-trips/TripCard.vue'

import ErrMessage from '../components/partials/ErrMessage.vue'

import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'

import { subtractDates } from '/src/helper/subtractDates.js'

import useUserStore from '../store/User.js'

import { onMounted, ref } from 'vue'

const isLoading = ref({ state: false })
const errMessage = ref({
  state: false,
  value: '🤕 Failed to connect to the server please check your connection and try again'
})

const { userId, userTrips, fetchUserTrips } = useUserStore()

onMounted(() => {
  fetchUserTrips(isLoading, errMessage)
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
  <div
    class="trips__container container-c"
    v-if="!isLoading.state && !errMessage.state && userTrips.data.length > 0"
  >
    <h1 class="trips__title">My trips</h1>
    <TripCard v-for="(trip, index) in userTrips.data" :key="index" :id="trip.id" :index="index">
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
        <li class="results__card--item text-[#4F4F4F]">
          Check in: <span>{{ trip.date.checkin }}</span>
        </li>
        <li class="results__card--item text-[#4F4F4F]">
          Check out: <span>{{ trip.date.checkout }}</span>
        </li>
        <li class="results__card--item text-[#4F4F4F]">
          Suite: <span> {{ trip.room }}</span>
        </li>
        <li class="results__card--item text-[#4F4F4F]">
          {{ subtractDates(trip.date.checkin, trip.date.checkout) }} night stay
        </li>
      </template>

      <template v-slot:price>
        <div class="flex justify-end gap-4">
          <p class="price--red" v-if="trip.price_discount">{{ trip.price_gross }}</p>
          <p class="price--black" v-if="trip.price_discount">{{ trip.price_discount }} EGP</p>
          <p class="price--black" v-if="!trip.price_discount">{{ trip.price_gross }} EGP</p>
        </div>

        <p class="taxes">Includes taxes and fees</p>
      </template>

      <template v-slot:btn>
        <router-link :to="`/trip/${userId.value}&${trip.id}`" class="blue__btn mt-5 col-span-full"
          >View trip details</router-link
        >
      </template>
    </TripCard>
  </div>
</template>

<style scoped>
.trips__container {
  @apply w-full px-10 lg:px-72 py-24 z-0;
}

.trips__title {
  @apply text-[#1A1A1A] text-5xl font-semibold tracking-wide;
}

.results__card--title {
  @apply text-2xl font-semibold tracking-wide sm:text-3xl;
  color: #1a1a1a;
}

.result__card--img {
  @apply rounded-md;
  width: 28.5rem;
  height: 100%;
  object-fit: cover;

  @media screen and (max-width: 35em) {
    width: 20.5rem;
  }
  @media screen and (max-width: 30em) {
    width: 15.5rem;
  }

  @media screen and (max-width: 28.5em) {
    display: none;
  }
}

.results__card--review {
  @apply text-lg leading-10 ml-3;
  color: #4f4f4f;
}

.price--red {
  @apply text-lg font-semibold tracking-wide line-through text-right;
  color: #eb5757;
}
.price--black {
  @apply text-2xl font-semibold tracking-wide text-right;
  color: #333;
}

.taxes {
  @apply row-start-2 col-span-full font-semibold justify-self-end;
}

.icon-2 {
  @apply w-[1.6rem] h-[1.6rem];
}
</style>

<style>
.results__card--item {
  @apply text-xl leading-9  font-semibold tracking-wide;
  @media screen and (max-width: 40em) {
    @apply flex flex-col;
  }
}
</style>
