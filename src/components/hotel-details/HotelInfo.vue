<template>
  <section class="info">
    <div class="header">
      <slot name="title"></slot>
      <div class="reviews">
        <div class="results__card--stars">
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <img class="icon-2" src="/images/star-s-fill 5.svg" alt="star icon" />
          <p class="results__card--review">4.5 (1200 Reviews)</p>
        </div>
        <div class="location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.9999 11.1917C10.3413 11.1917 10.6794 11.1244 10.9949 10.9938C11.3103 10.8631 11.5969 10.6716 11.8384 10.4302C12.0798 10.1887 12.2713 9.90212 12.402 9.58668C12.5327 9.27123 12.5999 8.93314 12.5999 8.5917C12.5999 8.25026 12.5327 7.91217 12.402 7.59672C12.2713 7.28128 12.0798 6.99465 11.8384 6.75322C11.5969 6.51179 11.3103 6.32027 10.9949 6.18961C10.6794 6.05895 10.3413 5.9917 9.9999 5.9917C9.31034 5.9917 8.64902 6.26563 8.16142 6.75322C7.67383 7.24082 7.3999 7.90214 7.3999 8.5917C7.3999 9.28126 7.67383 9.94258 8.16142 10.4302C8.64902 10.9178 9.31034 11.1917 9.9999 11.1917V11.1917Z"
              stroke="#2F80ED"
              stroke-width="1.5"
            />
            <path
              d="M3.01675 7.07484C4.65842 -0.141828 15.3501 -0.133494 16.9834 7.08317C17.9417 11.3165 15.3084 14.8998 13.0001 17.1165C12.1935 17.8945 11.1165 18.3292 9.99592 18.3292C8.87529 18.3292 7.79835 17.8945 6.99175 17.1165C4.69175 14.8998 2.05842 11.3082 3.01675 7.07484V7.07484Z"
              stroke="#2F80ED"
              stroke-width="1.5"
            />
          </svg>
          <p>Lorem ipsum road, Tantruim-2322, Melbourne, Australia</p>
        </div>
      </div>
    </div>
    <div class="container-white rounded-lg">
      <div class="overview">
        <h3 class="overview__title">Overview</h3>
        <article class="overview__article">
          Featuring free WiFi throughout the property, Lakeside Motel Waterfront offers
          accommodations in Lakes Entrance, 19 mi from Bairnsdale. Free private parking is available
          on site.
          <br />
          <br />Each room at this motel is air conditioned and comes with a flat-screen TV. You will
          find a kettle, toaster and a microwave in the room. Each room is fitted with a private
          bathroom. Guests have access to barbecue facilities and a lovely large lawn area. Metung
          is 6.8 mi from Lakeside Motel Waterfront, while Paynesville is 14 mi from the property.
          <br />
          <br />
          Couples in particular like the location – they rated it 9.2 for a two-person trip.
        </article>

        <hr />

        <div class="overview__facilities">
          <h3 class="overview__title">Top facilites</h3>
          <ul class="overview__list">
            <li class="overview__item" v-for="(item, index) in TopFacilities" :key="index">
              <img :src="item.icon" alt="icon" />
              <p>{{ item.label }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const TopFacilities = [
  { icon: '/images/wifi.svg', label: 'Free wifi' },
  { icon: '/images/wind.svg', label: 'Air Conditioning' },
  { icon: '/images/car.svg', label: 'Parking available' },
  { icon: '/images/bag-tick.svg', label: 'Business Services' },
  { icon: '/images/lifebuoy.svg', label: 'Swimming pool' },
  { icon: '/images/like.svg', label: 'Top rated in area' }
]
</script>

<style scoped>
.info {
  @apply flex flex-col gap-y-10 mt-12;
}

.header {
  @apply flex flex-col gap-5;
}
.reviews {
  @apply flex flex-col gap-4;
}
.results__card--stars {
  @apply flex items-end;
}
.results__card--review {
  @apply ml-4 leading-5 tracking-wide;
  color: #4f4f4f;
}
.location {
  @apply flex items-center gap-2 text-xl leading-5 tracking-wide;
  color: #333;
}
.overview {
  @apply p-8;
}
.overview__title {
  @apply text-3xl font-semibold tracking-wide;
  color: #181818;
}
.overview__article {
  @apply text-2xl leading-8 tracking-wide mt-7;
  color: #4f4f4f;
}
.overview__facilities {
  @apply flex flex-col gap-8;
}
.overview__list {
  @apply grid grid-cols-2;
}
.overview__item {
  @apply flex items-center gap-x-4 text-xl leading-9 tracking-wide mb-6;
  color: #4f4f4f;
}

svg {
  @apply w-8 h-8;
}

hr {
  @apply my-12;
}
</style>
