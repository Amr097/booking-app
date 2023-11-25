import AppHome from '../views/Home.vue'
import AppAuth from '../auth/Auth.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: AppHome },
  { name: 'auth', path: '/auth/:method', component: AppAuth }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
