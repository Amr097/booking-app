<template>
  <footer class="footer">
    <h1 class="footer__title">Explore the world with My Dream Place</h1>
    <h4 class="footer__text">Discover new places and experiences</h4>
    <ul class="footer__list--logo">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
      >
        <path
          d="M1.414 10.7782C0.5 11.0002 0 12.1922 0 12.1922C0 12.1922 3.398 12.6262 4.949 14.3132C6.5 16.0002 7.071 19.2632 7.071 19.2632C7.071 19.2632 8.47 19.6982 8.485 17.8492C8.5 16.0002 7.778 14.3132 7.778 14.3132L11.091 11.0002L14.701 18.7042C14.701 18.7042 16.08 19.2302 16.04 17.3652C16 15.5002 14.85 7.24219 14.85 7.24219L17.678 4.41319C17.869 4.22869 18.0214 4.008 18.1262 3.76399C18.231 3.51999 18.2862 3.25755 18.2885 2.99199C18.2908 2.72643 18.2402 2.46307 18.1396 2.21728C18.0391 1.97149 17.8906 1.74818 17.7028 1.5604C17.515 1.37261 17.2917 1.2241 17.0459 1.12354C16.8001 1.02298 16.5368 0.972377 16.2712 0.974685C16.0056 0.976993 15.7432 1.03217 15.4992 1.13698C15.2552 1.2418 15.0345 1.39417 14.85 1.58519L11.947 4.48819C11.947 4.48819 4.148 3.09419 1.824 3.29719C-0.5 3.50018 0.559 4.56319 0.559 4.56319L8.203 8.23319L4.95 11.4862C4.95 11.4862 2.328 10.5562 1.414 10.7782Z"
          fill="#2F80ED"
        />
      </svg>

      <li class="footer__item footer__text">
        My Dream Place <br />
        <span> Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
      </li>
    </ul>
    <ul class="footer__list">
      <li class="footer__item">Company</li>
      <li class="footer__tem" v-for="(item, index) in companyItems" :key="index">
        <a href="" class="text-gray-600 hover:text-gray-400"> {{ item }}</a>
      </li>
    </ul>
    <ul class="footer__list">
      <li class="footer__item">Explore</li>
      <li class="footer__tem" v-for="(item, index) in exploreItems" :key="index">
        <a href="" class="text-gray-600 hover:text-gray-400"> {{ item }}</a>
      </li>
      <li class="footer__tem">
        <a class="text-blue-500 hover:text-blue-400"> See More</a>
      </li>
    </ul>
    <ul class="footer__list">
      <li class="footer__item">Terms & Policies</li>
      <li class="footer__tem" v-for="(item, index) in termsItems" :key="index">
        <a href="" class="text-gray-600 hover:text-gray-400"> {{ item }}</a>
      </li>
    </ul>
    <ul class="footer__list">
      <li class="footer__item footer__item--payment">Help</li>
      <li class="footer__tem" v-for="(item, index) in helpItems" :key="index">
        <a href="" class="text-gray-600 hover:text-gray-400"> {{ item }}</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: { color: Object },
  setup() {
    const companyItems = ['About', 'Jobs', 'Newsroom ', 'Advertising', 'Contact us']
    const termsItems = ['Privacy Policy', 'Terms of use', 'Acessibility', 'Reward system policy']
    const exploreItems = [
      'Australia',
      'New Zealand',
      'United States Of America (USA)',
      'Greece',
      'Maldives',
      'Singapore'
    ]
    const helpItems = [
      'Support',
      'Cancel your bookings',
      'Use Coupon',
      'Refund Policies',
      'International Travel Documents'
    ]
    const date = new Date()
    const currentYear = date.getFullYear()

    return { companyItems, exploreItems, termsItems, helpItems, currentYear }
  }
}
</script>

<style scoped>
.footer {
  @apply pt-36 px-8 relative bg-white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, calc(100% / 5.2)));
  justify-items: center;
  margin-bottom: 2.5rem;
  z-index: -1;

  /* grid-template-rows: min-content min-content repeat(auto-fit, minmax(8rem, 1fr)); */
  /* grid-row-gap: 3rem; */
}

.logo {
  width: 2.4rem;
  height: 2.4rem;
}

.footer__title {
  @apply col-span-full text-gray-700 text-4xl font-semibold leading-10 mb-4;
}

.footer__text {
  @apply col-span-full text-blue-500 text-2xl font-normal leading-10 tracking-tight mb-24;
}

.footer__list {
  @apply list-none flex flex-col gap-4;
}

.footer__list--logo {
  display: flex;
  gap: 0.5rem;
  width: 80%;
}

.footer__item {
  @apply mb-4 text-gray-900 text-2xl font-semibold tracking-wide;
}

a {
  @apply transition-all duration-200 inline-block  text-xl font-normal tracking-tighter;
}

span {
  @apply text-gray-600 text-xl font-normal tracking-tighter;
}
</style>
