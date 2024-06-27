<script setup>
import AppHeader from '/src/components/partials/AppHeader.vue'

import HomeCovid from '/src/components/reuseables/AppCovid.vue'

import ClientCard from '/src/components/checkout/ClientCard.vue'
import PaymentCard from '/src/components/checkout/PaymentCard.vue'
import InfoCard from '/src/components/checkout/InfoCard.vue'
import CheckedoutHotel from '/src/components/checkout/CheckedoutHotel.vue'
import CheckoutModal from '/src/components/checkout/CheckoutModal.vue'

import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

import { computed, reactive, onMounted, ref } from 'vue'

import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db, auth, onAuthStateChanged } from '/src/services/firebase.js'
import { useRoute } from 'vue-router'

import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'

import { formatDate } from '../helper/dateFormat.js'
import {
  validateName,
  validateFirstName,
  validateLastName,
  validateCreditCard,
  validateCVC,
  validateYear,
  validateMonth,
  validateZip
} from '../helper/checkoutValidation.js'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const formData = reactive({
  expireYear: '',
  expireMonth: '',
  isCardName: false,
  isCardNumber: false,
  isSecCode: false,
  isZipCode: false,
  isYear: false,
  isMonth: false,
  showModal: false
})

const phoneNumber = ref('')

const roomNumber = ref('')

const isLoading = reactive({ value: false, errMessage: '' })

const yearOptions = computed(() => {
  let currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i <= 5; i++) {
    years.push(currentYear++)
  }
  return years
})

const route = useRoute()

const path = route.params.id
//hotel id on left, prefix/page number/room number on right
const splitPath = path.split('*')
const id = splitPath[0]

const hotel = ref({ data: { rating: '' } })

onMounted(async () => {
  //fetch hotel from firestore

  //split prefix and page number/room number
  const PagexPrefix = splitPath[1].split('$')
  const prefix = PagexPrefix[0]
  //split page number and room number
  const PagexRoom = PagexPrefix[1].split('&')
  const page = PagexRoom[0]
  const room = PagexRoom[1]

  roomNumber.value = room

  //if hotel belongs to hurgahda collection
  if (prefix === 'hu') {
    const hotelRef = doc(db, 'hurghada', `hurghada-${page}`)
    const hotelSnap = await getDoc(hotelRef)
    if (hotelSnap.exists()) {
      const hotels = hotelSnap.data().hotels

      const currentHotel = hotels.filter((hotel) => {
        return hotel.id === id
      })
      hotel.value.data = currentHotel[0]
    }
  }
  //if hotel belongs to cairo collection
  else if (prefix === 'ca') {
    const hotelRef = doc(db, 'cairo', `cairo-${page}`)

    const hotelSnap = await getDoc(hotelRef)

    if (hotelSnap.exists()) {
      const hotels = hotelSnap.data().hotels

      const currentHotel = hotels.filter((hotel) => {
        return hotel.id === id
      })
      hotel.value.data = currentHotel[0]
    }
  }
  //if hotel belongs to sharm collection
  else if (prefix === 'sh') {
    const hotelRef = doc(db, 'sharm-alsheikh', `sharm-alsheikh-${page}`)
    const hotelSnap = await getDoc(hotelRef)
    if (hotelSnap.exists()) {
      const hotels = hotelSnap.data().hotels

      const currentHotel = hotels.filter((hotel) => {
        return hotel.id === id
      })
      hotel.value.data = currentHotel[0]
    }
  }
})

const onSubmit = () => {
  isLoading.value = true
  isLoading.errMessage = ''

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      const userTripsRef = await getDoc(userRef)

      if (userTripsRef.exists()) {
        const userTrips = userTripsRef.data().trips
        const checkForTrip = userTrips.filter((trip) => {
          return trip.id === id && roomNumber.value === trip.room
        })
        if (checkForTrip.length > 0) {
          isLoading.errMessage = 'You have already reserved this suite.'
        } else {
          try {
            const date = {
              checkin: JSON.parse(localStorage.getItem('searchQuery')).checkInDate,
              checkout: JSON.parse(localStorage.getItem('searchQuery')).checkOutDate
            }
            // format date and add to hotel data
            const formattedDate = formatDate(date, 'checkout')
            hotel.value.data.date = formattedDate
            // add room number to hotel data
            hotel.value.data.room = roomNumber.value
            //save hotel data to user trips in firestore
            const userRef = doc(db, 'users', user.uid)
            await updateDoc(userRef, { trips: arrayUnion(hotel.value.data) })
            formData.showModal = true
          } catch (err) {
            isLoading.value = false
            return err
          }
        }
      }
    }
    isLoading.value = false
  })
}
</script>

<template>
  <CheckoutModal v-if="formData.showModal" />
  <div class="container-c">
    <AppHeader :logoColor="'#2F80ED'" :textColor="'#333'" :bellColor="'#828282'" :showNav="false" />
  </div>
  <div class="container-grey checkout">
    <div class="container-c pt-12 flex flex-col gap-8">
      <h1 class="checkout__title">Secure your reservation</h1>
      <HomeCovid />
      <div class="main">
        <veeForm action="POST" class="checkout__form" @submit="onSubmit">
          <!-- ClientCard -->
          <ClientCard>
            <template v-slot:room>
              <p class="room__details">
                Room 1 &nbsp; 2 adults, 1 double bed and 1 twin bed, Non-smoking
              </p>
            </template>

            <template v-slot:firstName>
              <Field
                name="FirstName"
                id="FirstName"
                type="text"
                class="input col-start-1 col-span-1"
                :rules="validateFirstName"
              />
              <ErrorMessage name="FirstName" class="auth__err row-start-3 col-start-1" />
            </template>

            <template v-slot:lastName>
              <Field
                name="LastName"
                id="LastName"
                type="text"
                class="input col-start-2 col-span-1"
                :rules="validateLastName"
              />
              <ErrorMessage name="LastName" class="auth__err row-start-3 col-start-2" />
            </template>

            <template v-slot:number>
              <vue-tel-input v-model="phoneNumber" mode="international"></vue-tel-input>
            </template>

            <template v-slot:alert>
              <input type="checkbox" id="checkbox" />
            </template>
          </ClientCard>

          <!-- PaymentCard -->

          <PaymentCard>
            <template v-slot:nameCard>
              <div class="v-container">
                <Field
                  name="nameCard"
                  id="nameCard"
                  type="text"
                  class="input"
                  :rules="validateName.bind(formData)"
                />
                <ErrorMessage name="nameCard" class="auth__err row-start-3 col-start-1" />
                <img
                  src="/images/tick-circle.svg"
                  alt="icon"
                  class="row-start-1 col-start-2 self-center w-[2rem] h-[2rem]"
                  v-if="formData.isCardName"
                />
              </div>
            </template>

            <template v-slot:cardNumber>
              <div class="v-container">
                <Field
                  name="cardNumber"
                  id="cardNumber"
                  type="text"
                  class="input"
                  :rules="validateCreditCard.bind(formData)"
                />
                <ErrorMessage name="cardNumber" class="auth__err row-start-3 col-start-1" />
                <img
                  src="/images/tick-circle.svg"
                  alt="icon"
                  class="row-start-1 col-start-2 self-center w-[2rem] h-[2rem]"
                  v-if="formData.isCardNumber"
                />
              </div>
            </template>

            <template v-slot:expireDate>
              <div>
                <Field
                  name="month"
                  id="select-month"
                  as="select"
                  class="select"
                  required
                  v-model="formData.expireMonth"
                  :rules="validateMonth.bind(formData)"
                >
                  <option value="">Select month</option>
                  <option :value="month" v-for="(month, index) in months" :key="index">
                    {{ month }}
                  </option>
                </Field>
                <ErrorMessage name="month" class="auth__err row-start-3 col-start-2" />
              </div>
              <div>
                <Field
                  name="year"
                  id="select-year"
                  as="select"
                  class="select"
                  required
                  v-model="formData.expireYear"
                  :rules="validateYear.bind(formData)"
                >
                  <option value="">Select year</option>
                  <option :value="year" v-for="(year, index) in yearOptions" :key="index">
                    {{ year }}
                  </option>
                </Field>
                <ErrorMessage name="year" class="auth__err row-start-3 col-start-2" />
              </div>

              <img
                src="/images/tick-circle.svg"
                alt="icon"
                class="row-start-2 col-start-3 self-center w-[2rem] h-[2rem]"
                v-if="formData.expireMonth && formData.expireYear"
              />
            </template>

            <template v-slot:secCode>
              <Field
                name="secCode"
                id="secCode"
                type="text"
                class="input col-start-1 row-start-2"
                :rules="validateCVC.bind(formData)"
              />
              <ErrorMessage name="secCode" class="auth__err row-start-3 col-start-1" />
              <img
                src="/images/tick-circle.svg"
                alt="icon"
                class="row-start-2 col-start-3 self-center w-[2rem] h-[2rem]"
                v-if="formData.isSecCode && formData.isZipCode"
              />
            </template>

            <template v-slot:zipCode>
              <Field
                name="zipCode"
                id="zipCode"
                type="text"
                class="input col-start-2 row-start-2"
                :rules="validateZip.bind(formData)"
              />
              <ErrorMessage name="zipCode" class="auth__err row-start-3 col-start-2" />
            </template>
          </PaymentCard>

          <InfoCard>
            <template v-slot:info-btn>
              <button :disabled="isLoading.value" type="submit" class="blue__btn ml-8">
                Complete Booking
              </button>
              <p class="ml-8 text-2xl mt-6 text-red-500" v-if="isLoading.errMessage">
                {{ isLoading.errMessage }}
              </p>
            </template>
          </InfoCard>
        </veeForm>

        <div class="checkout__details">
          <CheckedoutHotel :hotel="hotel.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-grey {
  @apply w-full px-0 pb-40 grid lg:px-20 relative -z-0;

  background: #f4f4f4;
}

.main {
  @apply grid gap-5 sm:gap-10;

  grid-template-columns: 1fr 38%;

  @media screen and (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }
}

.checkout__details {
  @media screen and (max-width: 37.5em) {
    grid-row: 1 / span 1;
    margin: 2rem 0;
  }
}

.checkout__title {
  @apply text-5xl font-semibold tracking-wide;
  color: #1a1a1a;
}

.checkout__form {
  @apply flex flex-col gap-8;
}

/* room */

.input {
  @apply rounded-md outline-none p-5;
  background: #f2f2f2;
}

.select {
  @apply rounded-md outline-none py-5 px-3 w-full;

  background: #f2f2f2;
}

.input:focus {
  border: 1px solid var(--Blue-1, #2f80ed);
  background: #fff;
}

select,
option {
  @apply text-xl font-normal;
}

.v-container {
  @apply grid  gap-x-6;
  grid-template-columns: 1fr max-content;
}
</style>

<style>
.vue-tel-input {
  gap: 5px;
  border: none;
}

.vti__dropdown {
  border-radius: 4px;
  background: #f2f2f2;
  padding: 1rem 1.2rem !important;
}

.vti__selection {
  gap: 1rem !important;
}

.vue-tel-input:focus-within {
  box-shadow: none !important;
}

.vti__input {
  padding: 1.1rem 1.2rem;
  border-radius: 4px;
  background: #f2f2f2;
}

.blue__btn:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
