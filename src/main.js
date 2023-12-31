import './global.css'
import './styles/utils.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './services/firebase'
import { auth, onAuthStateChanged } from './services/firebase.js'

let app

onAuthStateChanged(auth, () => {
  if (!app) {
    const pinia = createPinia()
    app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
  }
})
