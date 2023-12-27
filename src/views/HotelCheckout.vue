<script setup>
import AppHeader from '/src/components/partials/Header.vue'

import HomeCovid from '/src/components/reuseables/Covid.vue'

import ClientCard from '/src/components/checkout/ClientCard.vue'
import PaymentCard from '/src/components/checkout/PaymentCard.vue'
import InfoCard from '/src/components/checkout/InfoCard.vue'
import CheckedoutHotel from '/src/components/checkout/CheckedoutHotel.vue'
import CheckoutModal from '/src/components/checkout/CheckoutModal.vue'

import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

import { computed, reactive, onMounted, ref } from 'vue'

import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db, usersCollection, auth, onAuthStateChanged } from '/src/services/firebase.js'
import { useRoute } from 'vue-router'

import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'

import { formatDate } from '../helper/dateFormat.js'

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
  showModal: false
})

const phoneNumber = ref('')

const isLoading = ref({ value: false, errMessage: '' })

function validateName(value) {
  // if the field is empty
  if (!value) {
    formData.isCardName = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    formData.isCardName = false
    return 'Name cannot contain numbers or symbols'
  }
  // All is good
  formData.isCardName = true
  return true
}

function validateFirstName(value) {
  // if the field is empty

  if (!value) {
    return 'This field is required'
  }
  // only characters
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    return 'Name cannot contain numbers or symbols'
  }
  return true
}

function validateLastName(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }
  // only characters
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    return 'Name cannot contain numbers or symbols'
  }
  return true
}

function validateCreditCard(value) {
  // if the field is empty
  if (!value) {
    formData.isCardNumber = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{19}$/
  if (!regex.test(value)) {
    formData.isCardNumber = false
    return 'Card number must be 19 digits'
  }
  // All is good
  formData.isCardNumber = true
  return true
}

function validateCVC(value) {
  // if the field is empty
  if (!value) {
    formData.isSecCode = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{3,4}$/
  if (!regex.test(value)) {
    formData.isSecCode = false
    return 'CVC has to be 3 or 4 digits'
  }
  // All is good
  formData.isSecCode = true
  return true
}

function validateZip(value) {
  // if the field is empty
  if (!value) {
    formData.isZipCode = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{5}$/
  if (!regex.test(value)) {
    formData.isZipCode = false
    return 'Zip code has to 5 digits'
  }
  // All is good
  formData.isZipCode = true
  return true
}

const yearOptions = computed(() => {
  let currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i <= 5; i++) {
    years.push(currentYear++)
  }
  return years
})

const hotel = ref({ data: { rating: '' } })

onMounted(async () => {
  //fetch hotel from firestore
  const route = useRoute()

  const path = route.params.id
  const splitPath = path.split('*')
  const id = splitPath[0]
  const PagexPrefix = splitPath[1].split('$')
  const prefix = PagexPrefix[0]
  const page = PagexPrefix[1]

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
  } else if (prefix === 'ca') {
    const hotelRef = doc(db, 'cairo', `cairo-${page}`)

    const hotelSnap = await getDoc(hotelRef)

    if (hotelSnap.exists()) {
      const hotels = hotelSnap.data().hotels

      const currentHotel = hotels.filter((hotel) => {
        return hotel.id === id
      })
      hotel.value.data = currentHotel[0]
    }
  } else if (prefix === 'sh') {
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
  isLoading.value.value = true
  isLoading.value.errMessage = ''
  console.log('onSubmit fired')
  onAuthStateChanged(auth, async (user) => {
    console.log('onAuthStateChanged fired')
    if (user) {
      console.log('user exists')
      const userRef = doc(db, 'users', user.uid)
      const userTripsRef = await getDoc(userRef)
      console.log({ usersCollection, id: user.uid, data: userTripsRef.data() })
      if (userTripsRef) {
        console.log('tripref exists')
        const userTrips = userTripsRef.data().trips

        const checkForTrip = userTrips.filter((trip) => {
          return hotel.value.data.id === trip.id
        })
        if (checkForTrip.length > 0) {
          console.log('hotel found')
          isLoading.value.errMessage = 'You have already reserved this trip.'
        } else {
          try {
            console.log('hotel not found')
            const date = {
              checkin: JSON.parse(localStorage.getItem('searchQuery')).checkInDate,
              checkout: JSON.parse(localStorage.getItem('searchQuery')).checkOutDate
            }
            const formattedDate = formatDate(date, 'checkout')
            hotel.value.data.date = formattedDate
            const userRef = doc(db, 'users', user.uid)
            await updateDoc(userRef, { trips: arrayUnion(hotel.value.data) })
            console.log('updated doc')
            formData.showModal = true
          } catch (err) {
            console.log(err)
            return err
          }
        }
      }
    }
  })

  isLoading.value.value = false
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
                  :rules="validateName"
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
                  :rules="validateCreditCard"
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
              <select name="" id="" class="select" required v-model="formData.expireMonth">
                <option value="">Select month</option>
                <option :value="month" v-for="(month, index) in months" :key="index">
                  {{ month }}
                </option>
              </select>

              <select name="" id="" class="select" required v-model="formData.expireYear">
                <option value="">Select year</option>
                <option :value="year" v-for="(year, index) in yearOptions" :key="index">
                  {{ year }}
                </option>
              </select>

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
                :rules="validateCVC"
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
                :rules="validateZip"
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
}

.checkout__title {
  @apply text-5xl font-semibold tracking-wide;
  color: #1a1a1a;
}

.checkout__form {
  @apply flex flex-col gap-8;
}

.checkout__details {
}

/* room */

.input {
  @apply rounded-md outline-none p-5;
  background: #f2f2f2;
}

.select {
  @apply rounded-md outline-none py-5 px-3;

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

button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
