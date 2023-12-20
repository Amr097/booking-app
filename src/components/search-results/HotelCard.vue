<template>
  <!-- <div v-if="hotels.length > 0">
    <div class="results__card" v-for="(hotel, index) in hotels" :key="index">
      <img :src="hotel.property.photoUrls[0]" alt="" class="result__card--img" />
      <div class="results__card--info">
        <h3 class="results__card--title">{{ hotel.property.name }}</h3>
        <div class="results__card--stars">
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <p class="results__card--review"> 
            {{ hotel.property.reviewScore }} ({{ hotel.property.reviewCount }} reviews)
          </p>
        </div>
        <article class="results__card--desc">{{ hotelLabel(hotel) }}</article>
        <router-link to="/hotel/details" class="blue__btn">See availbility</router-link>
      </div>

      <div class="results__card--prices">
        <p class="discount--ad">Book now and receive 15% off</p>
        <p class="discount--percent" v-if="hotel.property.priceBreakdown.strikethroughPrice">
          -{{ discount(hotel) }}% off
        </p>
        <div class="price">
          <p class="price--red" v-if="hotel.property.priceBreakdown.strikethroughPrice">
            {{ discountPrice(hotel) + ' ' + hotel.property.priceBreakdown.grossPrice.currency }}
          </p>
          <p class="price--black">
            {{
              hotel.property.priceBreakdown.grossPrice.currency +
              ' ' +
              Math.ceil(hotel.property.priceBreakdown.grossPrice.value)
            }}
          </p>
          <p class="taxes">Includes taxes and fees</p>
        </div>
      </div>
    </div>
  </div> -->
  <!-- //////////////////////////////// -->

  <div class="results__card">
    <img
      :src="hotel.image ? hotel.image : '/images/fallback.webp'"
      :alt="hotel.name + 'image'"
      class="result__card--img"
    />
    <div class="results__card--info">
      <h3 class="results__card--title" :title="hotel.name">
        {{ hotel.name.length > 55 ? hotel.name.slice(0, 55) + '...' : hotel.name }}
      </h3>
      <div class="results__card--stars">
        <img
          class="icon-2"
          src="/images/star-s-fill 5.svg"
          alt="star icon"
          v-for="(int, index) in Math.ceil(hotel.rating)"
          :key="index"
        />

        <p class="results__card--review">{{ hotel.rating }} ({{ hotel.reviews }} reviews)</p>
      </div>
      <article class="results__card--desc">
        {{ hotel.desc.length <= 170 ? hotel.desc : hotel.desc.slice(0, 170) + '...' }}
      </article>
      <router-link to="/hotel/details" class="blue__btn card-btn">See availbility</router-link>
    </div>

    <div class="results__card--prices">
      <p class="discount--ad" v-if="hotel.offer" :style="{ backgroundColor: hotel.offer.color }">
        {{ hotel.offer.title >= 60 ? hotel.offer.title.slice(0, 60) + '...' : hotel.offer.title }}
      </p>

      <div class="price">
        <p class="discount--percent" v-if="hotel.price_discount">-{{ discount(hotel) }}% off</p>
        <p class="price--red" v-if="hotel.price_discount">{{ hotel.price_gross }}</p>
        <p class="price--black" v-if="hotel.price_discount">{{ hotel.price_discount }} EGP</p>
        <p class="price--black" v-else>{{ hotel.price_gross }} EGP</p>
        <p class="taxes">Includes taxes and fees</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotelCard',
  props: {
    hotel: Object
  },

  setup() {
    const discount = (hotel) => {
      if (hotel.price_gross && hotel.price_discount) {
        return 100 - Math.ceil((hotel.price_discount * 100) / hotel.price_gross)
      } else {
        return false
      }
    }

    // const discount = (hotel) => {
    //   if (
    //     hotel.property.priceBreakdown.grossPrice &&
    //     hotel.property.priceBreakdown.strikethroughPrice
    //   ) {
    //     return (
    //       100 -
    //       Math.ceil(
    //         (hotel.property.priceBreakdown.grossPrice.value * 100) /
    //           Math.ceil(
    //             hotel.property.priceBreakdown.grossPrice.value +
    //               hotel.property.priceBreakdown.strikethroughPrice.value
    //           )
    //       )
    //     )
    //   } else {
    //     return false
    //   }
    // }

    // const discountPrice = (hotel) => {
    //   if (
    //     hotel.property.priceBreakdown.grossPrice &&
    //     hotel.property.priceBreakdown.strikethroughPrice
    //   ) {
    //     return Math.ceil(
    //       hotel.property.priceBreakdown.grossPrice.value +
    //         hotel.property.priceBreakdown.strikethroughPrice.value
    //     )
    //   }
    // }

    // const hotelLabel = (hotel) => (hotel.accessibilityLabel ? hotel.accessibilityLabel : '')

    return { discount }
  }
}
</script>

<style scoped>
.results__card {
  @apply grid  p-6 sm:gap-x-6 w-full  sm:w-[95%];
  grid-template-columns: 1fr 35% 1fr;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  background: #fff;
}
.result__card--img {
  @apply rounded-md;
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

  @media screen and (width< 30em) {
    @apply grid gap-0;
    grid-template-columns: repeat(6, max-content);
  }
}
.results__card--review {
  @apply text-lg leading-10 ml-1;
  color: #4f4f4f;

  @media screen and (width< 30em) {
    @apply col-span-full row-start-1;
  }
}

.results__card--desc {
  @apply text-xl font-medium leading-7 tracking-wide mt-3;

  color: #4f4f4f;

  @media screen and (width< 46.875em) {
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
  @apply row-start-4 self-end;
}

.icon-2 {
  @media screen and (width< 46.875em) {
    @apply w-[1.55rem];
  }
}
</style>
