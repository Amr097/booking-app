import { defineStore } from 'pinia'
import { auth, onAuthStateChanged } from '../services/firebase.js'
import { ref } from 'vue'

export default defineStore('user', () => {
  const firstLogin = ref({ modal: false })
  const isLogged = ref({ logged: false })

  const userLogin = () => {
    firstLogin.value.modal = true
  }

  const setUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLogged.value.logged = true
      } else {
        isLogged.value.logged = false
      }
    })
  }
  return { userLogin, firstLogin, setUserStatus, isLogged }
})
