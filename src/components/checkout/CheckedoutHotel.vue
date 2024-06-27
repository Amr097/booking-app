<script setup>
import { onMounted, ref } from 'vue'

import { formatDate } from '/src/helper/dateFormat.js'
import { subtractDates } from '/src/helper/subtractDates.js'

const date = ref({ checkin: '', checkout: '' })

const props = defineProps(['hotel'])

onMounted(() => {
  //get date from local storage
  const searchQuery = JSON.parse(localStorage.getItem('searchQuery'))
  const { checkin, checkout } = formatDate(
    { checkin: searchQuery.checkInDate, checkout: searchQuery.checkOutDate },
    true
  )
  date.value.checkin = checkin
  date.value.checkout = checkout
})
</script>

<template>
  <figure class="card">
    <img
      :src="props.hotel.image ? props.hotel.image : '/images/fallback.webp'"
      :alt="props.hotel.name"
      class="card__img"
    />
    <div class="p-6">
      <figcaption class="card__title">{{ props.hotel.name }}</figcaption>
      <div class="card__rating">
        <div class="rating--stars">
          <img
            class="icon-2"
            src="/images/star-s-fill 5.svg"
            alt="star icon"
            v-for="(int, index) in Math.ceil(props.hotel.rating)"
            :key="index"
          />
        </div>
        <p class="review">{{ props.hotel.rating }} ({{ props.hotel.reviews }} Reviews)</p>
      </div>
      <p class="card__text text-[#EB5757]">Non refundable</p>
      <p class="card__text text-[ #4F4F4F] flex">
        Check in: <span>{{ date.checkin }}</span>
      </p>
      <p class="card__text text-[ #4F4F4F] flex">
        Check out: <span>{{ date.checkout }}</span>
      </p>
      <p class="card__text text-[ #4F4F4F] mt-1">
        {{ subtractDates(date.checkin, date.checkout) }} night stay
      </p>
    </div>
  </figure>

  <div class="mt-10 bg-white rounded-md">
    <div class="title__container">
      <p class="title p-bold mt-1">Price Details</p>
    </div>

    <div class="content__container">
      <p class="p-small">1 room x 2 nights</p>
      <p class="p-small justify-self-end">
        $ {{ props.hotel.price_discount || props.hotel.price_gross }}
      </p>
      <p class="p-small">Tax and service fees</p>
      <p class="p-small p-small justify-self-end">$ 8.32</p>

      <hr class="col-span-full my-4" />

      <p class="p-bold mt-2">Total</p>
      <p class="p-bold mt-2 justify-self-end">
        ${{ +(props.hotel.price_discount || props.hotel.price_gross) + +8.32 }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.card {
  @apply bg-white rounded-md shadow-sm;
}

.card__img {
  @apply w-full h-[18rem] object-cover;

  border-radius: 0.375rem 0.375rem 0 0;
}
.card__title {
  @apply text-[1.5rem] sm:text-[1.8rem] font-medium tracking-wide mb-1;

  color: #181818;
}
.card__rating {
  @apply mb-7 flex gap-2;
}

.rating--stars {
  @apply flex items-center;

  @media screen and (max-width: 37.5em) {
    @apply order-2;
  }
}

.review {
  @apply text-lg leading-8 tracking-wide flex items-center;
  color: var(--Gray-2, #4f4f4f);
}

.card__text {
  @apply text-xl leading-8 tracking-wide mb-2;
}

.title__container {
  @apply rounded-lg bg-white;
  width: 100%;
}

.title {
  @apply py-4 px-6;
  border-radius: 6px 6px 0px 0px;
  background: #85e0ab;
}

.content__container {
  @apply p-6 grid  grid-rows-2;
  grid-template-columns: 1fr max-content;
}

.p-small {
  @apply text-xl leading-8 tracking-wide mb-2;
  color: #4f4f4f;
}
.p-bold {
  @apply text-2xl tracking-wide font-medium;
  color: #181818;
}

.icon-2 {
  @apply w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem];
}
</style>
