<template>
  <form class="form" action="POST" @submit.prevent="onSubmit">
    <div class="form__input">
      <svg class="icon" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m9.9999 11.192c0.3414 0 0.6795-0.0673 0.995-0.1979 0.3154-0.1307 0.602-0.3222 0.8435-0.5636 0.2414-0.2415 0.4329-0.52808 0.5636-0.84352 0.1307-0.31545 0.1979-0.65354 0.1979-0.99498s-0.0672-0.67953-0.1979-0.99498c-0.1307-0.31544-0.3222-0.60207-0.5636-0.8435-0.2415-0.24143-0.5281-0.43295-0.8435-0.56361-0.3155-0.13066-0.6536-0.19791-0.995-0.19791-0.68956 0-1.3509 0.27393-1.8385 0.76152-0.48759 0.4876-0.76152 1.1489-0.76152 1.8385s0.27393 1.3509 0.76152 1.8385c0.4876 0.4876 1.1489 0.7615 1.8385 0.7615z"
          stroke="#828282"
          stroke-width="1.5"
        />
        <path
          d="m3.0168 7.0751c1.6417-7.2167 12.333-7.2083 13.967 0.00834 0.9583 4.2334-1.675 7.8167-3.9833 10.033-0.8066 0.7779-1.8836 1.2126-3.0042 1.2126-1.1206 0-2.1976-0.4347-3.0042-1.2126-2.3-2.2167-4.9333-5.8084-3.975-10.042z"
          stroke="#828282"
          stroke-width="1.5"
        />
      </svg>

      <select class="form__select outline-none" v-model="destinationValue" required>
        <option value="" class="form__option">Where are you going?</option>
        <option
          :value="item.city_name"
          class="form__option"
          v-for="(item, index) in resDestinationData"
          :key="index"
        >
          {{ item.city_name }}
        </option>
      </select>
    </div>

    <div class="form__date">
      <p class="date-text">{{ checkInDate ? '' : 'Check in date' }}</p>
      <VueDatePicker v-model="checkInDate" :enable-time-picker="false" required />
    </div>
    <div class="form__date">
      <p class="date-text">{{ checkOutDate ? '' : 'Check out date' }}</p>
      <VueDatePicker v-model="checkOutDate" :enable-time-picker="false" required />
    </div>

    <div class="form__input">
      <img src="public/images/user.svg" alt="" />
      <input
        class="input outline-none"
        type="text"
        placeholder="Guests"
        v-model="guestsValue"
        required
      />
    </div>

    <div class="form__input">
      <img src="public/images/room.svg" alt="" />
      <input
        class="input outline-none"
        type="text"
        placeholder="Rooms"
        v-model="roomsValue"
        required
      />
    </div>

    <button type="submit" class="form__btn">Search</button>
  </form>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'AppSearch',
  components: { VueDatePicker },
  setup() {
    // fetch destinations
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
      params: { query: 'man' },
      headers: {
        'X-RapidAPI-Key': '8fe455668bmshd75cea299d71970p11f976jsnc1a70e1a11e9',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    }

    const resDestinationData = ref(null)

    const getHotelDestinations = async () => {
      try {
        const response = await axios.request(options)
        resDestinationData.value = response.data.data
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(getHotelDestinations)

    // search values
    const checkInDate = ref('')
    const checkOutDate = ref('')
    const guestsValue = ref('')
    const roomsValue = ref('')
    const destinationValue = ref('')

    //form submisson

    const router = useRouter()

    const onSubmit = () => {
      const values = { checkInDate, checkOutDate, guestsValue, roomsValue, destinationValue }
      console.log(values)
      console.log(sessionStorage.getItem('authToken'))
      router.push('/auth/login')
    }

    return {
      resDestinationData,
      checkInDate,
      checkOutDate,
      guestsValue,
      roomsValue,
      destinationValue,
      onSubmit
    }
  }
}
</script>

<style scoped>
.form {
  @apply flex justify-between w-fit p-6 self-center gap-6 bg-white rounded-lg shadow-xl absolute -bottom-14;
}

.form__input {
  @apply flex  justify-center items-center gap-4;

  background-color: #f2f2f2;
}

.form__input,
.form__select {
  @apply p-2.5 rounded-md;
}

.input::placeholder,
.input,
.form__option,
.form__select {
  @apply text-xl font-normal tracking-tighter;
  color: #4f4f4f;
  background-color: #f2f2f2;
}

.icon {
  width: 2.4rem;
  height: 2.4rem;
}

.form__btn {
  @apply rounded-md bg-blue-500 text-white text-2xl 
  font-medium leading-8 tracking-tight flex justify-center items-center hover:bg-blue-600 py-2 px-28;
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
</style>

<style>
.dp__input_wrap {
}
.dp__input {
  background-color: #f2f2f2 !important;
  padding: 2rem 1.2rem !important;
  border: none !important;
  border-radius: 4px !important;
  height: 100% !important;
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateX(3rem);
}

.dp__main {
  border-radius: 4px !important;
}

.dp__input_icons {
  width: 2.4rem;
  height: 2.4rem;
}
</style>
