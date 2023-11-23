import AppHome from '../views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ name: 'home', path: '/', component: AppHome }]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
