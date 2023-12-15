import AppHome from '../views/Home.vue'
import HotelDetails from '../views/HotelDetails.vue'
import AppAuth from '../auth/Auth.vue'
import AppSearchResults from '../views/SearchResults.vue'
import HotelCheckout from '../views/HotelCheckout.vue'
import UserTrips from '../views/UserTrips.vue'
import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '../store/User.js'

const routes = [
  { name: 'home', path: '/', component: AppHome },
  {
    name: 'auth',
    path: '/auth/:path',
    component: AppAuth,
    meta: {
      authPath: true
    }
  },
  {
    name: 'results',
    path: '/search/results',
    component: AppSearchResults,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'details',
    path: '/hotel/details',
    component: HotelDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'checkout',
    path: '/hotel/checkout',
    component: HotelCheckout,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'trips',
    path: '/trips/:id',
    component: UserTrips,
    meta: {
      requiresAuth: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// clear local storage on route change from search/results to '/'
function onRouteChange(to, from) {
  if (from.fullPath === '/search/results') {
    localStorage.clear()
  }
}

router.beforeEach(async (to, from, next) => {
  onRouteChange(to, from, next)
  const { isLogged } = useUserStore()

  if (to.meta.authPath) {
    isLogged.logged ? next(from.fullPath) : next()
  } else if (!to.meta.requiresAuth) {
    next()
  } else {
    if (isLogged.logged) {
      next()
    } else {
      next('/auth/login')
    }
  }
  next()
})

export default router
