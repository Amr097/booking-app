import AppHome from '../views/Home.vue'
import HotelDetails from '../views/HotelDetails.vue'
import AppAuth from '../auth/Auth.vue'
import AppSearchResults from '../views/SearchResults.vue'
import HotelCheckout from '../views/HotelCheckout.vue'
import UserTrips from '../views/UserTrips.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: AppHome },
  {
    name: 'auth',
    path: '/auth/:path',
    component: AppAuth,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('authToken')) {
        next('/')
      }
      next()
    }
  },
  {
    name: 'results',
    path: '/search/results',
    component: AppSearchResults,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('authToken')) {
        next('/')
      }
      next()
    }
  },
  {
    name: 'details',
    path: '/hotel/details',
    component: HotelDetails,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('authToken')) {
        next('/')
      }
      next()
    }
  },
  {
    name: 'checkout',
    path: '/hotel/checkout',
    component: HotelCheckout,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('authToken')) {
        next('/')
      }
      next()
    }
  },
  {
    name: 'trips',
    path: '/trips/:id',
    component: UserTrips,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('authToken')) {
        next('/')
      }
      next()
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// clear local storage on route change from search/results to '/'
function onRouteChange(to, from, next) {
  if (from.fullPath === '/search/results') {
    localStorage.clear()
  }
  next()
}

router.beforeEach((to, from, next) => {
  onRouteChange(to, from, next)
})

export default router
