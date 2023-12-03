import { defineStore } from 'pinia'
import { generateUniqueToken } from '../helper/tokenHandler.js'
import { ref } from 'vue'

export default defineStore('user', () => {
  const firstLogin = ref({ modal: false })

  const userLogin = () => {
    const token = generateUniqueToken()
    firstLogin.value.modal = true
    sessionStorage.setItem('authToken', token)
  }

  return { userLogin, firstLogin }
})
