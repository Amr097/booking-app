import { defineStore } from 'pinia'
import { generateUniqueToken } from '../helper/tokenHandler.js'

export default defineStore('user', () => {
  const userLogin = () => {
    const token = generateUniqueToken()
    console.log(token)
    sessionStorage.setItem('authToken', token)
  }

  return { userLogin }
})
