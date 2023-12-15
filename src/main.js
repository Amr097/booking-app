import './global.css'
import './styles/utils.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './services/firebase'
import { auth } from './services/firebase'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    const pinia = createPinia()
    app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
  }
})
