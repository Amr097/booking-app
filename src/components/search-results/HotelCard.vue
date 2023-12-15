<template>
  <div v-if="hotels.length > 0">
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
  </div>
  <!-- //////////////////////////////// -->
  <div v-else>
    <div class="results__card">
      <img src="/images/v-greece.webp" alt="" class="result__card--img" />
      <div class="results__card--info">
        <h3 class="results__card--title">Hotel Name</h3>
        <div class="results__card--stars">
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <p class="results__card--review">480 (1200 reviews)</p>
        </div>
        <article class="results__card--desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quae nesciunt repellendus
          veniam quia, sequi nisi quidem. Aperiam asperiores error unde. Impedit quo minima totam
          vitae commodi sint, soluta labore!
        </article>
        <router-link to="/hotel/details" class="blue__btn">See availbility</router-link>
      </div>

      <div class="results__card--prices">
        <p class="discount--ad">Book now and receive 15% off</p>
        <p class="discount--percent">-20% off</p>
        <div class="price">
          <p class="price--red">1300 USD</p>
          <p class="price--black">900 USD</p>
          <p class="taxes">Includes taxes and fees</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotelCard',
  props: ['hotels'],
  setup() {
    const discount = (hotel) => {
      if (
        hotel.property.priceBreakdown.grossPrice &&
        hotel.property.priceBreakdown.strikethroughPrice
      ) {
        return (
          100 -
          Math.ceil(
            (hotel.property.priceBreakdown.grossPrice.value * 100) /
              Math.ceil(
                hotel.property.priceBreakdown.grossPrice.value +
                  hotel.property.priceBreakdown.strikethroughPrice.value
              )
          )
        )
      } else {
        return false
      }
    }

    const discountPrice = (hotel) => {
      if (
        hotel.property.priceBreakdown.grossPrice &&
        hotel.property.priceBreakdown.strikethroughPrice
      ) {
        return Math.ceil(
          hotel.property.priceBreakdown.grossPrice.value +
            hotel.property.priceBreakdown.strikethroughPrice.value
        )
      }
    }

    const hotelLabel = (hotel) => (hotel.accessibilityLabel ? hotel.accessibilityLabel : '')

    return { discount, discountPrice, hotelLabel }
  }
}
</script>

<style scoped>
.results__card {
  @apply grid grid-cols-3 p-6 gap-x-6;
  width: 95%;
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
  @apply grid  h-full;
  grid-template-rows: repeat(3, min-content) 1fr;
}
.results__card--title {
  @apply text-3xl font-medium tracking-wide;
  color: #1a1a1a;
}
.results__card--stars {
  @apply flex items-center mt-2;
}
.results__card--review {
  @apply text-lg leading-10;
  color: #4f4f4f;
}

.results__card--desc {
  @apply text-xl font-medium leading-7 tracking-wide mt-3;

  color: #4f4f4f;
}

.results__card--prices {
  @apply grid items-end justify-end;
}
.discount--ad {
  @apply self-start text-white w-fit rounded-md text-lg leading-7 tracking-wide py-1 px-2;
  margin-left: auto;
  background-color: #eb5757;
}
.discount--percent {
  @apply text-white text-lg font-medium leading-7 tracking-wide rounded-md w-fit py-1 px-2 text-right;
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
</style>
