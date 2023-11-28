<template>
  <section class="results__header">
    <AppHeader :logoColor="'#fff'" :textColor="'#fff'" />
    <AppSearch />
  </section>
  <section class="results__main">
    <!-- filter results -->
    <div class="filter">
      <!-- by property -->
      <div class="filter__property">
        <h3 class="filter__title">Search by property name</h3>
        <div class="bg-gray-100 p-5 pt-0">
          <div class="flex bg-white gap-1 p-2 rounded-md">
            <svg fill="none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" class="icon">
              <path
                d="m9.1667 16.333c3.6819 0 6.6666-2.9847 6.6666-6.6666 0-3.6819-2.9847-6.6667-6.6666-6.6667-3.6819 0-6.6667 2.9848-6.6667 6.6667 0 3.6819 2.9848 6.6666 6.6667 6.6666z"
                stroke="#4F4F4F"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                d="m17.5 18-3.625-3.625"
                stroke="#4F4F4F"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
            <!--property input -->
            <input class="outline-none" type="text" placeholder="eg. Beach westpalm" />
          </div>
        </div>
      </div>
      <h3 class="text-gray-600 text-xl font-semibold">Filter by</h3>
      <!-- by budget -->
      <div class="filter__budget">
        <h3 class="filter__title">Your budget per day</h3>
        <div class="filter__ranges">
          <!--budget checkboxes -->
          <ul class="ranges__list">
            <li class="ranges__item" v-for="(item, index) in filterRanges" :key="index">
              <input class="ranges__check" type="checkbox" :id="item.name" />
              <label class="ranges__label" :for="item.name"
                >$ {{ item.min }} - $ {{ item.max }}</label
              >
            </li>
          </ul>
          <div class="filter__set">
            <div class="flex items-center justify-between">
              <h4 class="text-lg text-gray-600">Set your own budget</h4>
              <svg
                fill="none"
                viewBox="0 0 36 28"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-1"
              >
                <rect x="4" y="4" width="32" height="16" rx="8" fill="#BDBDBD" />
                <g filter="url(#a)">
                  <rect x="4" y="2" width="20" height="20" rx="10" fill="#fff" />
                </g>
                <defs>
                  <filter
                    id="a"
                    x="0"
                    y="0"
                    width="28"
                    height="28"
                    color-interpolation-filters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_829" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_829" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
            <!--custom budget -->
            <div class="budget__handler">
              <input type="text" placeholder="Max budget" class="budget__input" />
              <input type="text" placeholder="Min budget" class="budget__input" />
              <p class="budget__handler--text">Press Enter to filter</p>
            </div>
          </div>
        </div>
      </div>
      <!-- rates -->
      <div class="rating">
        <h3 class="filter__title">Rating</h3>
        <div class="rating__main">
          <p class="w-fit text-lg text-gray-600">Show only ratings more than</p>
          <ul class="rating__list">
            <li class="rating__item" v-for="(item, index) in startRanges" :key="index">
              {{ item }}
              <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- results view -->
    <div class="results__view">
      <div class="results__view--head">
        <h2 class="results__view--title">Melbourne : 2,582 search results found</h2>
        <select name="" id="" class="results__view--sort">
          <option value="">Recommended</option>
          <option>TEST</option>
          <option>TEST</option>
          <option>TEST</option>
        </select>
        <span>Sort by</span>
      </div>
      <!-- results card -->
      <div class="results__card">
        <img src="/public/images/h-oculous.webp" alt="" class="result__card--img" />
        <div class="results__card--info">
          <h3 class="results__card--title">Julia Dens Resort</h3>
          <div class="results__card--stars">
            <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            <img class="icon-2" src="/public/images/star-s-fill 5.svg" alt="star icon" />
            <p class="results__card--review">4.5(1200 reviews)</p>
          </div>
          <a href="" class="results__card--btn">See availbility</a>
        </div>

        <div class="results__card--prices">
          <p class="discount--ad">Book now and receive 15% off</p>
          <p class="discount--percent">5%</p>
          <div class="price">
            <p class="price--red">$150</p>
            <p class="price--black">$130</p>
            <p class="taxes">Includes taxes and fees</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <HomeCovid />
  <AppFooter />
  <div class="footer__copyright">
    <p>Copyright&copy;2023. All right reserved.</p>
  </div>
</template>

<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import AppSearch from '../components/home/Search.vue'
import HomeCovid from '../components/home/Covid.vue'

export default {
  name: 'AppSearchResults',
  components: { AppHeader, AppSearch, AppFooter, HomeCovid },

  setup() {
    const filterRanges = [
      { name: '0-200', min: 0, max: 200 },
      { name: '200-500', min: 200, max: 500 },
      { name: '500-1000', min: 500, max: 1000 },
      { name: '1000-2000', min: 1000, max: 2000 },
      { name: '2000-3000', min: 2000, max: 3000 }
    ]

    const startRanges = [1, 2, 3, 4, 5]

    return { filterRanges, startRanges }
  }
}
</script>

<style scoped>
.results__header {
  position: relative;
  background: linear-gradient(180deg, #2969bf 0%, #144e9d 100%);
  padding: 0 5rem;
  height: 20rem;
}

.results__main {
  @apply grid grid-cols-2 mt-40;
  grid-template-columns: min-content 1fr;
  padding: 0 5rem;
}

.filter {
  @apply flex flex-col gap-8 rounded-lg;
}

.filter__budget {
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  padding-bottom: 1rem;
}

.filter__property {
  @apply flex flex-col rounded-lg;
}

.filter__title {
  @apply text-lg font-medium tracking-wide px-4 py-3 bg-gray-100;
  color: #181818;
}

.ranges__list {
  @apply px-4 py-3 flex flex-col gap-3 mb-3 mt-2;
}

.ranges__item {
  @apply flex items-center gap-2;
}

.ranges__label {
  @apply text-gray-600 text-lg tracking-wide;
}

.filter__set {
  @apply flex flex-col gap-3 justify-between px-4;
}

.budget__handler {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 1.2rem;
  grid-row-gap: 0.8rem;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  padding-bottom: 0.3rem;
}

.budget__input {
  width: 10rem;
  height: 3.9rem;
  text-align: center;
  border-radius: 4px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
  outline: none;
}

.budget__input::placeholder {
  color: #333;
}

.budget__handler--text {
  @apply text-base;
  grid-column: 1/-1;
  color: #4f4f4f;
}

.rating {
  border-radius: 6px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
}

.rating__main {
  @apply flex flex-col gap-4 p-5;
}

.rating__list {
  @apply flex w-fit;
  border-radius: 0px 5px 5px 0px;
  border: 1px solid var(--Gray-5, #e0e0e0);
  background: #fff;
}

.rating__item {
  @apply flex items-end p-2 text-lg cursor-pointer;
  border-right: 1px solid var(--Gray-5, #e0e0e0);
}

.results__view--head {
  @apply flex justify-between px-14 relative;
}

.results__view--title {
  @apply text-3xl font-semibold;
}

.results__view--sort {
  @apply rounded-lg bg-white px-6 pb-2 pt-9 outline-none;

  border: 1px solid #bdbdbd;
}

.results__view--sort option {
  @apply text-lg flex flex-col;
}

.results__view--head span {
  @apply absolute text-gray-500;
  right: 10.5rem;
  top: 0.5rem;
}
/* ///////////////////////////////////// */
.results__card {
  @apply grid grid-cols-3 p-6 gap-x-4;
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
}
.results__card--info {
}
.results__card--title {
  @apply text-2xl font-medium tracking-wide;
  color: #1a1a1a;
}
.results__card--stars {
  @apply flex;
}
.results__card--review {
}
.results__card--btn {
}
.results__card--prices {
}
.discount--ad {
}
.discount--percent {
}
.price {
}
.price--red {
}
.price--black {
}
.taxes {
}

.icon {
  @apply bg-white p-1;
  width: 2rem;
  height: 2rem;
}

.icon-1 {
  width: 3.2rem;
  height: 2rem;
}

.icon-2 {
  width: 1.8rem;
  height: 1.8rem;
}

.footer__copyright {
  @apply py-4 text-center bg-gray-200 text-gray-600 text-xl
  font-normal leading-7 flex items-center justify-end mt-24 pr-72 relative;
  width: 100%;
}
</style>
