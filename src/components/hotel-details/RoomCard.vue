<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth, onAuthStateChanged } from '/src/services/firebase.js'

const route = useRoute()

const props = defineProps(['number'])

const id = route.params.id

const isRoomReserved = ref({ state: false })

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      const userTripsRef = await getDoc(userRef)

      if (userTripsRef.exists()) {
        const userTrips = userTripsRef.data().trips
        const path = route.params.id
        const splitPath = path.split('*')
        const id = splitPath[0]

        const checkForTrip = userTrips.filter((trip) => {
          return (id === trip.id && +props.number) === +trip.room
        })
        console.log(checkForTrip)
        if (checkForTrip.length > 0) {
          isRoomReserved.value.state = true
        }
      }
    }
  })
})
</script>

<template>
  <div class="room">
    <slot name="image"></slot>
    <div class="room__data">
      <slot name="title"></slot>
      <slot name="space"></slot>
      <slot name="sleep"></slot>
      <slot name="beds"></slot>
      <router-link
        :to="`/checkout/${id}&${props.number}`"
        :class="isRoomReserved.state ? 'room__btn disabled' : 'room__btn'"
        :disabled="isRoomReserved.state"
        >Reserve suite (To checkout page)</router-link
      >
    </div>
  </div>
</template>

<style scoped lang="postcss">
.room {
  @apply flex flex-col shadow-sm;
}

.room__btn {
  @apply flex justify-center items-center py-4 px-7 text-white mt-6 rounded-lg text-2xl font-medium leading-9 tracking-wide transition-all duration-100 hover:bg-blue-600;

  background-color: #2f80ed;
}

.room__data {
  @apply px-6 bg-white pb-6;
  border-radius: 0 0 6px 6px;
}

.disabled {
  @apply bg-gray-400 hover:bg-gray-400 pointer-events-none;
}
</style>
