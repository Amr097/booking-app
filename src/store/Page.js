import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('page', () => {
  const currentPage = ref({ number: 1 })

  return { currentPage }
})
