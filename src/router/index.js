import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '../store/User.js'

const routes = [
  { name: 'home', path: '/', component: () => import('../views/AppHome.vue') },
  {
    name: 'auth',
    path: '/auth/:path',
    component: () => import('../auth/AppAuth.vue'),
    meta: {
      authPath: true
    }
  },
  {
    name: 'results',
    path: '/search/results',
    component: () => import('../views/SearchResults.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'details',
    path: '/hotel/:id',
    component: () => import('../views/HotelDetails.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'checkout',
    path: '/checkout/:id',
    component: () => import('../views/HotelCheckout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'trips',
    path: '/trips',
    component: () => import('../views/UserTrips.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'user-trip',
    path: '/trip/:id',
    component: () => import('../views/ReservedTrip.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: '404',
    path: '/oppsy/daisy',
    component: () => import('../components/partials/NotFound.vue')
  },
  {
    name: '403',
    path: '/hold/on/a/second',
    component: () => import('../components/partials/AccessDenied.vue')
  },
  { path: '/:catchAll(.*)*', redirect: { name: '404' } }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

// clear local storage on route change from search/results to '/'
function onRouteChange(to, from) {
  if (to.name === 'home' && from.meta.requiresAuth) {
    localStorage.removeItem('searchQuery')
  }
  if (from.name === 'results') {
    localStorage.removeItem('currentPage')
  }
}

router.beforeEach(async (to, from, next) => {
  onRouteChange(to, from, next)

  const { isLogged } = useUserStore()

  if (to.meta.authPath) {
    isLogged.logged ? next({ name: '403' }) : next()
  } else if (!to.meta.requiresAuth) {
    next()
  } else {
    if (isLogged.logged) {
      next()
    } else {
      next('/auth/login')
    }
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
