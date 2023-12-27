<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'
import { formatDate } from '../../helper/dateFormat.js'
import { ref, reactive, onMounted, watch } from 'vue'
import useUserStore from '/src/store/User.js'
import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'
import { validateInput } from '../../helper/SearchValidation.js'
import { validateCheckin, validateCheckout } from '../../helper/dateValidation.js'

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

const onSubmit = () => {
  isLoading.value = true
  if (!isLogged.logged) {
    router.push('/auth/login')
  } else {
    if (!(searchData.checkInDate && searchData.checkOutDate)) {
      datpickerErr.state = true
      datpickerErr.message = 'both fields are required'

      isLoading.value = false

      return
    } else if (
      !(validateCheckin(searchData, datpickerErr) && validateCheckout(searchData, datpickerErr))
    ) {
      isLoading.value = false
      return
    } else if (!searchData.destinationValue) {
      destErr.state = true
      destErr.message = 'This field is required'
      isLoading.value = false

      return
    }

    if (router.currentRoute.value.name === 'results') {
      localStorage.setItem('searchQuery', JSON.stringify(searchData))
      localStorage.setItem('currentPage', 1)
      isLoading.value = false
    }
    localStorage.setItem('searchQuery', JSON.stringify(searchData))
    router.push({ name: 'results' })
  }
}
</script>

<template>
  <veeForm class="form" action="POST" @submit="onSubmit">
    <div class="form__input">
      <img src="/images/location 1.svg" alt="icon" class="icon" />

      <select
        name="dest"
        class="form__select outline-none"
        v-model="searchData.destinationValue"
        @change="validateSelect"
      >
        <option disabled selected value="" class="form__option">Where are you going?</option>
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

    <div class="form__date">
      <p class="date-text">{{ searchData.checkInDate ? '' : 'Check in date' }}</p>
      <VueDatePicker
        v-model="searchData.checkInDate"
        :enable-time-picker="false"
        :format="formatDate"
        auto-apply
        model-type="yyyy-MM-dd"
        @blur="validateCheckin(searchData, datpickerErr)"
      />
      <span v-show="datpickerErr.state" class="auth__err top date">{{ datpickerErr.message }}</span>
      <span v-show="datpickerErr.state" class="cone-down date"></span>
    </div>
    <div class="form__date">
      <p class="date-text" :style="!searchData.checkInDate ? { color: '#a8a29e' } : ''">
        {{ searchData.checkOutDate ? '' : 'Check out date' }}
      </p>

      <VueDatePicker
        v-model="searchData.checkOutDate"
        :disabled="!searchData.checkInDate"
        :enable-time-picker="false"
        :format="formatDate"
        auto-apply
        model-type="yyyy-MM-dd"
        required
        @blur="validateCheckout(searchData, datpickerErr)"
      />
    </div>

    <div class="form__input">
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

    <div class="form__input">
      <img src="/images/room.svg" alt="icon" class="icon" />
      <Field
        name="rooms"
        class="input outline-none"
        type="text"
        placeholder="Rooms"
        v-model="searchData.roomsValue"
        :rules="validateInput"
      />
      <ErrorMessage name="rooms" class="auth__err top" />
      <ErrorMessage name="rooms"><span class="cone-down"></span></ErrorMessage>
    </div>

    <button type="submit" :disabled="isLoading" class="form__btn">Search</button>
  </veeForm>
</template>

<style scoped>
@import '/src/styles/containers/search.css';

.form {
  @apply flex justify-between px-3 py-4 self-center gap-3 lg:gap-6 bg-white rounded-lg shadow-xl absolute -bottom-14 sm:p-6  md:w-[87%] w-[97%];
  right: 50%;
  transform: translateX(50%);
}

.form__input {
  @apply flex justify-around items-center border border-solid border-transparent flex-1 transition-colors duration-75 hover:border-gray-300;

  background-color: #f2f2f2;
}

.form__input:not(:first-child) {
  @apply gap-4;
}

.form__input,
.form__select {
  @apply p-2.5 rounded-md relative;
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
  @apply w-full;
}

.icon {
  @apply translate-x-2;
  width: 2.4rem;
  height: 2.4rem;
}

.form__btn {
  @apply rounded-md bg-blue-500 text-white text-2xl
  font-medium leading-8 tracking-tight flex justify-center items-center hover:bg-blue-600 py-2 sm:px-[3.5rem] md:px-[5rem] lg:px-28;
}

.form__btn::disabled {
  @apply bg-blue-200;
}

.form__date {
  @apply relative rounded-md;

  background-color: #f2f2f2;
}

.date-text {
  @apply absolute top-1/2 transform -translate-y-1/2 text-xl font-normal tracking-tighter;

  left: 4.3rem;
  color: #4f4f4f;
}

.auth__err {
  @apply absolute bg-[#f2f2f2e3] px-5 py-3 rounded-md border-solid border-gray-300;
}

.top,
.bot {
  @apply left-1/2 -translate-x-1/2 rounded-xl -top-24 px-[1rem] py-[1.2rem] sm:px-[1.7rem] sm:py-[1.3rem] sm:-top-[6.5rem] shadow-sm;

  width: max-content;
}

.bot {
  @apply top-[6rem] !important;
}

.auth__err.top.date {
  @apply left-[4rem] sm:left-[15rem];
}

.cone-down.date {
  @apply left-[3rem] sm:left-[13.5rem];
}

.cone-up,
.cone-down {
  @apply sm:left-[5.5rem];
  position: absolute;
  width: 0;
  height: 0;
  top: -1.5rem;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-top: 1.5rem solid #f2f2f2e3;
}

.cone-up {
  width: 0;
  height: 0;
  top: 5.5rem !important;
  border-left: 1.5rem solid transparent !important;
  border-right: 1.5rem solid transparent !important;
  border-bottom: 1.5rem solid #f2f2f2e3 !important;
  border-top: none !important;
}
</style>

<style>
.dp__input {
  background-color: #f2f2f2 !important;
  padding: 2rem 1.2rem !important;
  border: none !important;
  border-radius: 4px !important;
  height: 100% !important;
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateX(3rem);

  @media screen and (width<=41.875em) {
    transform: none;
  }
}

.dp__main {
  border-radius: 4px !important;
  border: solid 1px transparent !important;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dp__main:hover {
  border: solid 1px rgb(209 213 219) !important;
}

.dp__input_icons {
  width: 2.4rem;
  height: 2.4rem;

  @media screen and (width< 40.3125em) {
    width: 0;
    height: 0;
  }
}

.dp__pointer {
  @media screen and (width< 40.3125em) {
    padding: 1.2rem !important;
  }
}
</style>
