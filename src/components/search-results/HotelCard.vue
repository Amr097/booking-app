<template>
  <div class="results__card" v-for="(hotel, index) in hotels" :key="index">
    <img :src="hotel.property.photoUrls[0]" alt="" class="result__card--img" />
    <div class="results__card--info">
      <h3 class="results__card--title">{{ hotel.property.name }}</h3>
      <div class="results__card--stars">
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
        <p class="results__card--review">
          {{ hotel.property.reviewScore }} ({{ hotel.property.reviewCount }} reviews)
        </p>
      </div>
      <article class="results__card--desc">{{ hotelLabel(hotel) }}</article>
      <a href="" class="results__card--btn">See availbility</a>
    </div>

    <div class="results__card--prices">
      <p class="discount--ad">Book now and receive 15% off</p>
      <p class="discount--percent" v-if="hotel.property.priceBreakdown.strikethroughPrice">
        -{{ discount(hotel) }}%
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
  @apply text-2xl font-medium tracking-wide;
  color: #1a1a1a;
}
.results__card--stars {
  @apply flex items-center;
}
.results__card--review {
  @apply text-lg leading-10;
  color: #4f4f4f;
}

.results__card--desc {
  @apply text-xl font-medium leading-7 tracking-wide transform translate-y-4;

  color: #4f4f4f;
}

.results__card--btn {
  @apply text-white text-xl font-medium tracking-wide leading-6 px-7 py-4 bg-blue-500 rounded-md w-fit hover:bg-blue-600;
  align-self: end;
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
  grid-template-columns: 1fr min-content;
  margin-left: auto;
}

.price--red {
  @apply text-lg font-medium tracking-wide line-through text-right;
  color: #eb5757;
}
.price--black {
  @apply text-xl font-medium tracking-wide text-right;
  color: #333;
}
</style>
