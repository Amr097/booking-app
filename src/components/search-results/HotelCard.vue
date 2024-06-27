<script setup>
import { ref } from 'vue'

const props = defineProps(['hotel'])

const discount = (hotel) => {
  if (hotel.price_gross && hotel.price_discount) {
    return 100 - Math.ceil((hotel.price_discount * 100) / hotel.price_gross)
  } else {
    return false
  }
}

const queryPrefix = ref('')
const currentPage = ref('')

const searchQuery = localStorage.getItem('searchQuery')
const page = localStorage.getItem('currentPage')
if (searchQuery) queryPrefix.value = JSON.parse(searchQuery).destinationValue.slice(0, 2)
if (page) currentPage.value = page
</script>

<template>
  <div class="results__card">
    <img
      :src="props.hotel.image ? props.hotel.image : '/images/fallback.webp'"
      :alt="props.hotel.name + 'image'"
      class="result__card--img"
    />
    <div class="results__card--info">
      <h3 class="results__card--title" :title="props.hotel.name">
        {{
          props.hotel.name.length > 55 ? props.hotel.name.slice(0, 55) + '...' : props.hotel.name
        }}
      </h3>
      <div class="results__card--stars">
        <img
          class="icon-2"
          src="/images/star-s-fill 5.svg"
          alt="star icon"
          v-for="(int, index) in Math.ceil(props.hotel.rating)"
          :key="index"
        />

        <p class="results__card--review">
          {{ props.hotel.rating }} ({{ props.hotel.reviews }} reviews)
        </p>
      </div>
      <article class="results__card--desc">
        {{
          props.hotel.desc.length <= 170 ? props.hotel.desc : props.hotel.desc.slice(0, 170) + '...'
        }}
      </article>
      <router-link
        :to="`/hotel/${props.hotel.id}*${queryPrefix}$${page}`"
        class="blue__btn card-btn"
        >See availbility</router-link
      >
    </div>

    <div class="results__card--prices">
      <p
        class="discount--ad"
        v-if="props.hotel.offer"
        :style="{ backgroundColor: props.hotel.offer.color }"
      >
        {{
          props.hotel.offer.title >= 60
            ? props.hotel.offer.title.slice(0, 60) + '...'
            : props.hotel.offer.title
        }}
      </p>

      <div class="price">
        <p class="discount--percent" v-if="props.hotel.price_discount">
          -{{ discount(props.hotel) }}% off
        </p>
        <p class="price--red" v-if="props.hotel.price_discount">{{ props.hotel.price_gross }}</p>
        <p class="price--black" v-if="props.hotel.price_discount">
          {{ props.hotel.price_discount }} EGP
        </p>
        <p class="price--black" v-else>{{ props.hotel.price_gross }} EGP</p>
        <p class="taxes">Includes taxes and fees</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.results__card {
  @apply grid  p-6 sm:gap-x-6 w-full  sm:w-[95%] shadow-md;
  grid-template-columns: 1fr 35% 1fr;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  background: #fff;
}
.result__card--img {
  @apply rounded-md shadow-sm;
  width: 28.5rem;
  height: 20rem;
  object-fit: cover;
}
.results__card--info {
  @apply grid  h-full ml-6 sm:ml-0;
  grid-template-rows: repeat(3, min-content) 1fr;
}
.results__card--title {
  @apply text-3xl font-medium tracking-wide;
  color: #1a1a1a;
}
.results__card--stars {
  @apply flex items-center mt-2;

  @media screen and (max-width: 30em) {
    @apply grid gap-0;
    grid-template-columns: repeat(6, max-content);
  }
}
.results__card--review {
  @apply text-lg leading-10 ml-1;
  color: #4f4f4f;

  @media screen and (max-width: 30em) {
    @apply col-span-full row-start-1;
  }
}

.results__card--desc {
  @apply text-xl font-medium leading-7 tracking-wide mt-3;

  color: #4f4f4f;

  @media screen and (max-width: 46.875em) {
    display: none;
  }
}

.results__card--prices {
  @apply grid items-end justify-end;
}
.discount--ad {
  @apply self-start text-white w-fit rounded-md text-lg leading-7 tracking-wide py-1 px-2 text-center;
  margin-left: auto;
  background-color: #eb5757;
}
.discount--percent {
  @apply text-white text-lg font-medium leading-7 tracking-wide rounded-md w-fit py-1 px-2 text-right col-span-full mb-12;
  margin-left: auto;
  background-color: #219653;
}
.price {
  @apply grid gap-x-3;
  grid-template-columns: 1fr max-content;
  margin-left: auto;
}

.price--red {
  @apply text-lg font-medium tracking-wide line-through text-right;
  color: #eb5757;
}
.price--black {
  @apply text-2xl font-medium tracking-wide text-right;
  color: #333;
}

.taxes {
  grid-column: 1/-1;
  justify-self: end;
  margin-top: 0.3rem;
}

.card-btn {
  @apply row-start-4 self-end shadow-sm;
}

.icon-2 {
  @media screen and (max-width: 46.875em) {
    @apply w-[1.55rem];
  }
}
</style>
