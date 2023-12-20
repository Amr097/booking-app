<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'
import { formatDate } from '../../helper/dateFormat.js'
import { ref, reactive, onMounted, watch } from 'vue'
import useUserStore from '/src/store/User.js'
import { Form as veeForm, Field, ErrorMessage } from 'vee-validate'
import { validateInput } from '../../helper/SearchValidation.js'
import { validateCheckin, validateCheckout } from '../../helper/dateValidation.js'
import useHotelsStore from '/src/store/Hotels.js'

export default {
  name: 'AppSearch',
  components: { VueDatePicker, veeForm, Field, ErrorMessage },
  setup() {
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
        if (!newCheckIn && oldCheckIn) {
          datpickerErr.state = false
          datpickerErr.message = ''
          return
        }
        if (!newCheckOut && oldCheckOut) {
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

    //On Submit

    const router = useRouter()

    const { isLogged } = useUserStore()

    const { fetchHotels } = useHotelsStore()

    const onSubmit = () => {
      isLoading.value = true
      if (!isLogged.logged) {
        router.push('/auth/login')
      } else {
        if (!(searchData.checkInDate && searchData.checkOutDate)) {
          datpickerErr.state = true
          datpickerErr.message = 'This field is required'
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
          fetchHotels()
          isLoading.value = false
        }
        localStorage.setItem('searchQuery', JSON.stringify(searchData))
        router.push({ name: 'results' })
      }
    }

    return {
      onSubmit,
      resDestinationData,
      searchData,
      isLoading,
      formatDate,
      validateInput,
      validateCheckin,
      validateCheckout,
      datpickerErr,
      destErr,
      validateSelect
    }
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
      <p class="date-text">{{ searchData.checkOutDate ? '' : 'Check out date' }}</p>
      <VueDatePicker
        v-model="searchData.checkOutDate"
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
  @apply flex justify-around items-center flex-1;

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
  @apply absolute bg-[#f2f2f2] px-5 py-3 rounded-md;
}

.top,
.bot {
  @apply left-1/2 -translate-x-1/2 rounded-md -top-24 px-[1rem] py-[1.2rem] sm:px-[1.7rem] sm:py-[2rem] sm:-top-[8rem];

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
  border-top: 1.5rem solid #f2f2f2;
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

<!-- <script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'
import { formatDate } from '../../helper/dateFormat.js'
import { ref, reactive } from 'vue'
import useUserStore from '/src/store/User.js'
// import axios from 'axios'
// import useHotelsStore from '../../store/Hotels.js'

export default {
  name: 'AppSearch',
  components: { VueDatePicker },
  setup() {
    //     // fetch destinations
    //     const options = {
    //       method: 'GET',
    //       url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    //       params: { query: 'egypt' },
    //       headers: {
    //         'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
    //         'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    //       }
    //     }
    //     const resDestinationData = ref([
    //       { dest_id: '1', city_name: 'Cairo' },
    //       { dest_id: '2', city_name: 'Hurghada' },
    //       { dest_id: '3', city_name: 'Sharm-Alsheikh' }
    //     ])
    //     const getHotelDestinations = async () => {
    //       try {
    //         const response = await axios.request(options)
    //         resDestinationData.value = response.data.data.filter((item) => {
    //           return item.city_name !== ''
    //         })
    //       } catch (error) {
    //         console.error(error)
    //       }
    //     }
    //     // form values
    //     const checkInDate = ref('')
    //     const checkOutDate = ref('')
    //     const guestsValue = ref('')
    //     const roomsValue = ref('')
    //     const destinationValue = ref('')
    //     const isLoading = ref(false)
    //     // Function to update search options based on ref variable changes
    //     const updateSearchOptions = () => {
    //       searchHotelOptions.params.dest_id = destinationValue.value
    //       searchHotelOptions.params.arrival_date = checkInDate.value
    //       searchHotelOptions.params.departure_date = checkOutDate.value
    //       searchHotelOptions.params.adults = guestsValue.value
    //       searchHotelOptions.params.room_qty = roomsValue.value
    //     }
    //     // Watchers to trigger updateSearchOptions function on ref variable changes
    //     watch([checkInDate, checkOutDate, guestsValue, roomsValue, destinationValue], () => {
    //       updateSearchOptions()
    //     })
    //     const searchHotelOptions = {
    //       method: 'GET',
    //       url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    //       params: {
    //         dest_id: destinationValue.value,
    //         search_type: 'CITY',
    //         arrival_date: checkInDate.value,
    //         departure_date: checkOutDate.value,
    //         adults: guestsValue.value,
    //         children_age: '0,17',
    //         room_qty: roomsValue.value,
    //         page_number: '1',
    //         languagecode: 'en-us',
    //         currency_code: 'AED'
    //       },
    //       headers: {
    //         'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
    //         'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    //       }
    //     }
    //     //form submisson
    //     const router = useRouter()
    //     const { fetchHotels } = useHotelsStore()
    //     const onSubmit = async () => {
    //       if (!sessionStorage.getItem('authToken')) {
    //         router.push('/auth/login')
    //       } else {
    //         const query = {
    //           dest_id: destinationValue.value,
    //           arrival_date: checkInDate.value,
    //           departure_date: checkOutDate.value,
    //           adults: guestsValue.value,
    //           room_qty: roomsValue.value
    //         }
    //         fetchHotels(searchHotelOptions, query, isLoading)
    //       }
    //     }
    //     // fetch hotel destinations and check for search query in local storage
    //     onMounted(() => {
    //       getHotelDestinations()
    //       const searchQuery = JSON.parse(localStorage.getItem('searchQuery'))
    //       if (searchQuery) {
    //         checkInDate.value = searchQuery.arrival_date
    //         checkOutDate.value = searchQuery.departure_date
    //         guestsValue.value = searchQuery.adults
    //         roomsValue.value = searchQuery.room_qty
    //         destinationValue.value = searchQuery.dest_id
    //       }
    //     })
    //     return {
    //       resDestinationData,
    //       checkInDate,
    //       checkOutDate,
    //       guestsValue,
    //       roomsValue,
    //       destinationValue,
    //       onSubmit,
    //       formatDate,
    //       isLoading
    //     }
  }
}
</script> -->
