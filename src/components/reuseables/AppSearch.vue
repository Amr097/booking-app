<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useRouter } from 'vue-router'

import { ref, reactive, onMounted, watch } from 'vue'

import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'
import { validateInput } from '../../helper/SearchValidation.js'

import { formatDate } from '../../helper/dateFormat.js'
import { validateCheckin, validateCheckout } from '../../helper/dateValidation.js'

import useHotelsStore from '/src/store/Hotels.js'
import useUserStore from '/src/store/User.js'

const resDestinationData = ref([
  { dest_id: '1', city_name: 'Cairo' },
  { dest_id: '2', city_name: 'Hurghada' },
  { dest_id: '3', city_name: 'Sharm-Alsheikh' }
])

const isLoading = ref(false)

const searchData = reactive({
  checkInDate: '',
  checkOutDate: '',
  guestsValue: '',
  roomsValue: '',
  destinationValue: ''
})

const datpickerErr = reactive({
  state: false,
  message: ''
})

const destErr = reactive({
  state: false,
  message: ''
})

// fetch hotel destinations and check for search query in local storage
onMounted(() => {
  const searchQuery = JSON.parse(localStorage.getItem('searchQuery'))

  if (searchQuery) {
    searchData.checkInDate = searchQuery.checkInDate
    searchData.checkOutDate = searchQuery.checkOutDate
    searchData.guestsValue = searchQuery.guestsValue
    searchData.roomsValue = searchQuery.roomsValue
    searchData.destinationValue = searchQuery.destinationValue
  }
})

// Watch for Datepicker value changes

watch(
  () => [searchData.checkInDate, searchData.checkOutDate],
  ([newCheckIn, newCheckOut], [oldCheckIn, oldCheckOut]) => {
    if (!newCheckIn && oldCheckIn && datpickerErr.checkinErr) {
      datpickerErr.state = false
      datpickerErr.message = ''
      return
    }
    if (!newCheckOut && oldCheckOut && datpickerErr.checkoutErr) {
      datpickerErr.state = false
      datpickerErr.message = ''
      return
    }
  },
  { deep: true }
)

//Validating Select

const validateSelect = () => {
  if (destErr.state) {
    destErr.state = false
    destErr.message = ''
  }
}

const router = useRouter()

const { isLogged } = useUserStore()
const { fetchHotels } = useHotelsStore()

//Submission

const onSubmit = async () => {
  isLoading.value = true
  // Validating search input
  if (
    !(validateCheckin(searchData, datpickerErr) && validateCheckout(searchData, datpickerErr)) ||
    !(searchData.checkInDate && searchData.checkOutDate) ||
    !searchData.destinationValue
  ) {
    if (!(searchData.checkInDate && searchData.checkOutDate)) {
      datpickerErr.state = true
      datpickerErr.message = 'both fields are required'
    }

    if (!searchData.destinationValue) {
      destErr.state = true
      destErr.message = 'This field is required'
    }

    isLoading.value = false
    return
  }
  // Check if we are on results page
  if (router.currentRoute.value.name === 'results') {
    localStorage.setItem('searchQuery', JSON.stringify(searchData))
    //reset pagination
    localStorage.setItem('currentPage', 1)
    await fetchHotels()
    isLoading.value = false
  }

  localStorage.setItem('searchQuery', JSON.stringify(searchData))

  if (!isLogged.logged) {
    router.push('/auth/login')
  } else {
    router.push({ name: 'results' })
  }
}
</script>

<template>
  <veeForm class="form" action="POST" @submit="onSubmit">
    <div class="form__input select-query">
      <img src="/images/location 1.svg" alt="icon" class="icon" />

      <select
        name="dest"
        class="form__select outline-none"
        v-model="searchData.destinationValue"
        @change="validateSelect"
      >
        <option disabled selected value="" class="form__option">
          Where &nbsp;are&nbsp; you&nbsp; going?
        </option>
        <option
          :value="item.city_name.toLowerCase()"
          class="form__option"
          v-for="(item, index) in resDestinationData"
          :key="index"
        >
          {{ item.city_name }}
        </option>
      </select>
      <span v-show="destErr.state" name="dest" class="auth__err bot">{{ destErr.message }}</span>
      <span v-show="destErr.state" class="cone-up"></span>
    </div>

    <div class="date-container">
      <div class="form__date">
        <VueDatePicker
          v-model="searchData.checkInDate"
          placeholder="Check in date"
          :enable-time-picker="false"
          :format="formatDate"
          auto-apply
          model-type="yyyy-MM-dd"
          @blur="validateCheckin(searchData, datpickerErr)"
        />
      </div>
      <div class="form__date">
        <VueDatePicker
          v-model="searchData.checkOutDate"
          :disabled="!searchData.checkInDate"
          :enable-time-picker="false"
          :format="formatDate"
          placeholder="Check in date"
          auto-apply
          model-type="yyyy-MM-dd"
          required
          @blur="validateCheckout(searchData, datpickerErr)"
        />
      </div>
      <span v-show="datpickerErr.state" class="auth__err top">{{ datpickerErr.message }}</span>
      <span v-show="datpickerErr.state" class="cone-down"></span>
    </div>

    <div class="input-container">
      <div class="form__input gap-2">
        <img src="/images/user.svg" alt="icon" class="icon" />
        <Field
          name="guests"
          class="input outline-none"
          type="text"
          placeholder="Guests"
          v-model="searchData.guestsValue"
          :rules="validateInput"
        />
        <ErrorMessage name="guests" class="auth__err bot" />
        <ErrorMessage name="guests"><span class="cone-up cone-down"></span></ErrorMessage>
      </div>

      <div class="form__input gap-2">
        <img src="/images/room.svg" alt="icon" class="icon" />
        <Field
          name="rooms"
          class="input outline-none"
          type="text"
          placeholder="Rooms"
          v-model="searchData.roomsValue"
          :rules="validateInput"
        />
        <ErrorMessage name="rooms" class="auth__err bot" />
        <ErrorMessage name="rooms"><span class="cone-up"></span></ErrorMessage>
      </div>
    </div>

    <button type="submit" :disabled="isLoading" class="form__btn">Search</button>
  </veeForm>
</template>

<style scoped>
@import '/src/styles/containers/search.css';

.form {
  @apply grid gap-4  px-3 py-4 self-center bg-white rounded-lg shadow-xl absolute -bottom-14 sm:p-6  md:w-[87%] w-[95%];
  grid-template-columns: 22% 2fr 2fr 1fr;
  right: 50%;
  transform: translateX(50%);
  @media screen and (width<=43.8125em) {
    bottom: -6rem;
    grid-template-columns: 1.25fr 2fr 0.75fr;
  }
}

.form__input {
  @apply flex  justify-around items-center border border-solid border-transparent flex-1 transition-colors duration-75 hover:border-gray-300;

  background-color: #f2f2f2;
}

.input-container {
  @apply flex gap-4;

  @media screen and (width<=43.8125em) {
    @apply row-start-2 row-span-1 col-start-2 col-span-1;
  }
}

.form__input,
.form__select {
  @apply p-2.5 rounded-md relative;
}

.select-query {
  @media screen and (width<=43.8125em) {
    @apply row-start-1 row-span-2 self-center py-4;
  }
}

.input::placeholder,
.input,
.form__option,
.form__select {
  @apply text-xl font-normal tracking-tighter ml-2;
  color: #4f4f4f;
  background-color: #f2f2f2;
}

select,
input {
  @apply w-full py-[0.2rem];
}

.icon {
  @apply translate-x-2;
  width: 2.4rem;
  height: 2.4rem;

  @media screen and (width<=36.8125em) {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.form__btn {
  @apply rounded-md bg-blue-500 text-white text-2xl
  font-medium leading-8 tracking-tight flex justify-center items-center transition-colors ease-in-out hover:bg-blue-600 py-2 sm:px-[3.5rem] md:px-[5rem] lg:px-28;

  @media screen and (width<=43.8125em) {
    @apply row-start-1 row-span-2 col-start-3 self-center py-6;
  }
}

.form__btn::disabled {
  @apply bg-blue-200;
}

.form__date {
  @apply relative rounded-md flex items-center border border-solid border-transparent hover:border-[#D1D5DB];

  background-color: #f2f2f2;
}

.auth__err {
  @apply absolute bg-[#f2f2f2] px-5 py-3 rounded-md border-solid border-gray-300;
}

.date-container {
  @apply flex gap-4 relative;
}

.top,
.bot {
  @apply -left-1/2 translate-x-1/2 rounded-xl -top-24 px-[1rem] py-[1.2rem] sm:px-[1.7rem] sm:py-[1.3rem] sm:-top-[6.5rem] shadow-sm;

  width: max-content;
}

.bot {
  @apply top-[6rem] !important;
}

.auth__err,
.cone-up,
.cone-down {
  @apply left-[50%] -translate-x-1/2;
}

.cone-up,
.cone-down {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-top: 1.5rem solid #f2f2f2;
}

.cone-down {
  @apply -top-[1.5rem];
}

.cone-up {
  width: 0;
  height: 0;
  top: 5.5rem !important;
  border-left: 1.5rem solid transparent !important;
  border-right: 1.5rem solid transparent !important;
  border-bottom: 1.5rem solid #f2f2f2 !important;
  border-top: none !important;
}
</style>

<style>
.dp__input {
  background-color: #f2f2f2 !important;
  font-size: 1.25rem;
  letter-spacing: -0.05em;
  line-height: 1.75rem;
  color: #4f4f4f;
  border: none !important;
  border-radius: 4px !important;
  height: 100% !important;
}

.dp__main {
  border-radius: 4px !important;
  border: solid 1px transparent !important;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dp__icon.dp__input_icon.dp__input_icons {
  @media screen and (width<=36.8125em) {
    display: none;
  }
}

.dp__icon {
  width: 1.7rem;
  height: 1.7rem;
}

.dp__input_icon_pad {
  @media screen and (width<=36.8125em) {
    padding: 1rem;
  }
}
.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg::placeholder {
  color: black !important;
}
</style>
