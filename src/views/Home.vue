<template>
  <div class="container">
    <AppHeader />
    <AppHero />
    <HomeCovid />
    <HomeGallery
      :title="titleVacations"
      :description="descVacations"
      :galleryData="vacationsData"
    />
    <HomeTrips :tripsData="tripsData" />
    <HomeGallery :title="titleHotels" :galleryData="hotelsData" />
    <HomeDownload />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/partials/Header.vue'
import AppFooter from '../components/partials/Footer.vue'
import AppHero from '../components/home/Hero.vue'
import HomeGallery from '../components/home/Gallery.vue'
import HomeCovid from '../components/home/Covid.vue'
import HomeTrips from '../components/home/Trips.vue'
import HomeDownload from '../components/home/Download.vue'

export default {
  name: 'AppHome',
  components: {
    AppHeader,
    AppFooter,
    AppHero,
    HomeGallery,
    HomeCovid,
    HomeTrips,
    HomeDownload
  },
  setup() {
    const titleVacations = 'Enjoy your dream vacation'
    const titleHotels = 'Popular hotels'

    const descVacations =
      'Plan and book our perfect trip with expert advice, travel tips, destination information and inspiration from us'

    const vacationsData = [
      {
        image: '../../public/images/v-australia.webp',
        name: 'Australia',
        properties: '2246 properties',
        height: '22rem'
      },
      {
        image: '../../public/images/v-japan.webp',
        name: 'Japan',
        properties: '1278 properties',
        height: '22rem'
      },
      {
        image: '../../public/images/v-zeland.webp',
        name: 'New Zealand',
        properties: '480 properties',
        height: '22rem'
      },
      {
        image: '../../public/images/v-greece.webp',
        name: 'Greece',
        properties: '320 properties',
        height: '22rem'
      }
    ]

    const hotelsData = [
      {
        image: '../../public/images/h-lakeside.webp',
        name: 'Lakeside Motel Warefront',
        properties: '2246 properties',
        height: '30rem'
      },
      {
        image: '../../public/images/h-recce.webp',
        name: 'Recce Graham resort',
        properties: '1278 properties',
        height: '30rem'
      },
      {
        image: '../../public/images/h-fireside.webp',
        name: 'Fireside Dinners',
        properties: '480 properties',
        height: '30rem'
      },
      {
        image: '../../public/images/h-oculous.webp',
        name: 'Fireside Dinners',
        properties: '320 properties',
        height: '30rem'
      }
    ]

    const tripsData = [
      {
        bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), url(../../public/images/t-sydney.webp)',
        title: 'Sydeny’s 10 most fashionable 5 star hotels',
        desc: 'Browse the fastest growing tourism sector in the heart of Australia tourism capital ....'
      },
      {
        bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), url(../../public/images/t-vegan.webp)',
        title: 'Top cities for Vegan Travellers',
        desc: 'Top sites where you do not have to worry about being a vegan. Our tourist guide is here...'
      },
      {
        bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), url(../../public/images/t-pcovid.webp)',
        title: 'World’s top destinations during and post covid timeline',
        desc: 'Pandemic is still intact and will be here for a longer time. Here’s where your next destination...'
      }
    ]

    return { titleVacations, titleHotels, descVacations, vacationsData, hotelsData, tripsData }
  }
}
</script>

<style scoped>
.container {
  @apply relative bg-white;
  width: 90%;
  margin: 0 auto;
  z-index: 4;
}
</style>
