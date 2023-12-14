import './global.css'
import './styles/utils.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
let app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
