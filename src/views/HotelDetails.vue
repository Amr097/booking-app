<script setup>
import AppHeader from '../components/partials/AppHeader.vue'
import AppFooter from '../components/partials/AppFooter.vue'
import ErrMessage from '../components/partials/ErrMessage.vue'

import HomeCovid from '../components/reuseables/AppCovid.vue'
import LoadingSpinner from '../components/reuseables/LoadingSpinner.vue'

import HotelInfo from '../components/hotel-details/HotelInfo.vue'
import HotelLocation from '../components/hotel-details/HotelLocation.vue'
import CouponCard from '../components/hotel-details/CouponCard.vue'
import RoomCard from '../components/hotel-details/RoomCard.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '/src/services/firebase.js'

const roomCard = [
  {
    image: '/images/room-1.webp',
    title: 'Standard twin ben, Multiple beds',
    space: '300 sq ft',
    rooms: 'Sleeps 3',
    beds: '1 double bed and 1 twin bed'
  },
  {
    image: '/images/room-2.webp',
    title: 'Standard twin ben, 1 Queen bed',
    space: '300 sq ft',
    rooms: 'Sleeps 3',
    beds: '1 double bed and 1 twin bed'
  }
]

const hotel = ref({ data: {} })
const meta = ref({ latitude: '', longidtude: '' })

const isLoading = ref({ state: false })
const errMessage = ref({
  state: false,
  value: '🤕 Failed to connect to the server please check your connection and try again'
})

onMounted(async () => {
  isLoading.value.state = true
  const route = useRoute()

  const path = route.params.id
  const splitPath = path.split('*')
  const id = splitPath[0]
  const PagexPrefix = splitPath[1].split('$')
  const prefix = PagexPrefix[0]
  const page = PagexPrefix[1]

  if (prefix === 'hu') {
    const hotelRef = doc(db, 'hurghada', `hurghada-${page}`)
    try {
      const hotelSnap = await getDoc(hotelRef)
      if (hotelSnap.exists()) {
        const hotels = hotelSnap.data().hotels

        const currentHotel = hotels.filter((hotel) => {
          return hotel.id === id
        })
        hotel.value.data = currentHotel[0]
        meta.value.latitude = hotelSnap.data().meta.coordinates.latitude
        meta.value.longidtude = hotelSnap.data().meta.coordinates.longidtude
      }
    } catch (error) {
      console.log(error)
      errMessage.value.state = true
    }
  } else if (prefix === 'ca') {
    const hotelRef = doc(db, 'cairo', `cairo-${page}`)
    try {
      const hotelSnap = await getDoc(hotelRef)
      if (hotelSnap.exists()) {
        const hotels = hotelSnap.data().hotels

        const currentHotel = hotels.filter((hotel) => {
          return hotel.id === id
        })
        hotel.value.data = currentHotel[0]
        meta.value.latitude = hotelSnap.data().meta.coordinates.latitude
        meta.value.longidtude = hotelSnap.data().meta.coordinates.longidtude
      }
    } catch (error) {
      console.log(error)
      errMessage.value.state = true
    }
  } else if (prefix === 'sh') {
    const hotelRef = doc(db, 'sharm-alsheikh', `sharm-alsheikh-${page}`)
    try {
      const hotelSnap = await getDoc(hotelRef)
      if (hotelSnap.exists()) {
        const hotels = hotelSnap.data().hotels

        const currentHotel = hotels.filter((hotel) => {
          return hotel.id === id
        })
        hotel.value.data = currentHotel[0]
        meta.value.latitude = hotelSnap.data().meta.coordinates.latitude
        meta.value.longidtude = hotelSnap.data().meta.coordinates.longidtude
      }
    } catch (error) {
      console.log(error)
      errMessage.value.state = true
    }
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
          :src="hotel.data.image ? hotel.data.image : '/images/fallback.webp'"
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
          <h1 class="info__title">{{ hotel.data.name }}</h1>
        </template>
        <template v-slot:article>
          <article class="overview__article">
            <slot name="title"></slot>
            Featuring free WiFi throughout the property, {{ hotel.data.name }} offers accommodations
            in Lakes Entrance, 19 mi from Bairnsdale. Free private parking is available on site.
            <br />
            <br />Each room at this motel is air conditioned and comes with a flat-screen TV. You
            will find a kettle, toaster and a microwave in the room. Each room is fitted with a
            private bathroom. Guests have access to barbecue facilities and a lovely large lawn
            area. Metung is 6.8 mi from {{ hotel.data.name }}, while Paynesville is 14 mi from the
            property.
            <br />
            <br />
            Couples in particular like the location – they rated it 9.2 for a two-person trip.
          </article>
        </template>
      </HotelInfo>
      <!-- HOTEL LOCATION -->
      <HotelLocation>
        <template v-slot:map>
          <iframe
            class="map__frame"
            :src="`https://maps.google.com/maps?q=${meta.latitude},${meta.longidtude}&hl=es;z=14&amp;output=embed`"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </template>
      </HotelLocation>
    </div>
    <div class="container-3">
      <h2 class="text-4xl font-semibold my-14">Available rooms</h2>
      <div class="cards-container">
        <CouponCard />
        <RoomCard v-for="(item, index) in roomCard" :key="index">
          <template v-slot:image>
            <img :src="item.image" alt="room image" class="room__image" />
          </template>

          <template v-slot:title>
            <h4 class="room__title">{{ item.title }}</h4>
          </template>
          <template v-slot:space>
            <div class="room__flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.99984 15.8337C10.8839 15.8337 11.7317 15.4825 12.3569 14.8573C12.982 14.2322 13.3332 13.3844 13.3332 12.5003C13.3332 11.6163 12.982 10.7684 12.3569 10.1433C11.7317 9.51818 10.8839 9.16699 9.99984 9.16699C9.11578 9.16699 8.26794 9.51818 7.64281 10.1433C7.01769 10.7684 6.6665 11.6163 6.6665 12.5003C6.6665 13.3844 7.01769 14.2322 7.64281 14.8573C8.26794 15.4825 9.11578 15.8337 9.99984 15.8337V15.8337Z"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.69971 12.5003L9.24137 13.0419C9.39971 13.2003 9.65804 13.2086 9.81637 13.0503L11.2997 11.6836"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.49986 18.3337H12.4999C15.8499 18.3337 16.4499 16.992 16.6249 15.3587L17.2499 10.3587C17.4749 8.32533 16.8915 6.66699 13.3332 6.66699H6.66652C3.10819 6.66699 2.52486 8.32533 2.74986 10.3587L3.37486 15.3587C3.54986 16.992 4.14986 18.3337 7.49986 18.3337Z"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.25 6.3918V5.58346C6.25 3.70846 7.75833 1.8668 9.63333 1.6918C10.1543 1.64061 10.6802 1.69907 11.1773 1.86341C11.6743 2.02775 12.1314 2.29434 12.5192 2.646C12.9069 2.99767 13.2168 3.42663 13.4288 3.90527C13.6408 4.38392 13.7502 4.90164 13.75 5.42513V6.57513"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>{{ item.space }}</p>
            </div>
          </template>
          <template v-slot:sleep>
            <div class="room__flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.97493 18.3332C14.5774 18.3332 18.3083 14.6023 18.3083 9.99984C18.3083 5.39734 14.5774 1.6665 9.97493 1.6665C5.37244 1.6665 1.6416 5.39734 1.6416 9.99984C1.6416 14.6023 5.37244 18.3332 9.97493 18.3332V18.3332Z"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.75C10.9946 13.75 11.9484 13.3549 12.6516 12.6516C13.3549 11.9484 13.75 10.9946 13.75 10C13.75 9.00544 13.3549 8.05161 12.6516 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25C9.00544 6.25 8.05161 6.64509 7.34835 7.34835C6.64509 8.05161 6.25 9.00544 6.25 10C6.25 10.9946 6.64509 11.9484 7.34835 12.6516C8.05161 13.3549 9.00544 13.75 10 13.75V13.75Z"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.08301 4.1084L7.03301 7.05006"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.08301 15.8914L7.03301 12.9497"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8748 15.8914L12.9248 12.9497"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8748 4.1084L12.9248 7.05006"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>{{ item.rooms }}</p>
            </div>
          </template>
          <template v-slot:beds>
            <div class="room__flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.2334 15.2916L8.81673 17.2916C9.15006 17.6249 9.90006 17.7916 10.4001 17.7916H13.5667C14.5667 17.7916 15.6501 17.0416 15.9001 16.0416L17.9001 9.95823C18.3167 8.79156 17.5667 7.79156 16.3167 7.79156H12.9834C12.4834 7.79156 12.0667 7.37489 12.1501 6.79156L12.5667 4.12489C12.7334 3.37489 12.2334 2.54156 11.4834 2.29156C10.8167 2.04156 9.9834 2.37489 9.65006 2.87489L6.2334 7.95823"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                />
                <path
                  d="M1.9834 15.2915V7.12484C1.9834 5.95817 2.4834 5.5415 3.65007 5.5415H4.4834C5.65007 5.5415 6.15007 5.95817 6.15007 7.12484V15.2915C6.15007 16.4582 5.65007 16.8748 4.4834 16.8748H3.65007C2.4834 16.8748 1.9834 16.4582 1.9834 15.2915Z"
                  stroke="#828282"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>{{ item.beds }}</p>
            </div>
          </template>
        </RoomCard>
      </div>
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

.room {
  @apply flex flex-col rounded-lg;

  @media screen and (width<=27.875em) {
    width: min(55rem, 100%);
    justify-self: center;
  }
}

.room__image {
  @apply h-[20rem] object-cover;
}

.room__title {
  @apply text-2xl font-semibold tracking-wide my-4;
  color: #1a1a1a;
}

.room__flex {
  @apply flex items-center gap-2 my-1;
}

.room__flex p {
  @apply text-lg leading-9 tracking-wide;
  color: #4f4f4f;
  padding-top: 0.1rem;
}

.cards-container {
  @apply grid grid-cols-3 gap-4;
  @media screen and (width<=46.875em) {
    @apply grid-cols-2;
  }
  @media screen and (width<=27.875em) {
    @apply grid-cols-1;
  }
}

.container-3 {
  @apply relative mx-auto;
  width: 90%;

  @media screen and (width < 66.25em) {
    width: 95%;
  }
}

.overview__article {
  @apply text-2xl leading-8 tracking-wide mt-7;
  color: #4f4f4f;
}

.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl 
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}

.map__frame {
  @apply shadow-sm rounded-md w-full;
}

img {
  @apply shadow-md;
}
</style>
