import { defineStore } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'
import { db, collection } from '../services/firebase'
import { ref } from 'vue'
//import { hotelDataCairo } from '../assets/data/hotels'

export default defineStore('hotels', () => {
  const hotelsData = ref({ data: {} })
  const isLoading = ref({ value: false })
  const errMessage = ref({
    state: false,
    value: ''
  })

  const fetchHotels = async (page = localStorage.getItem('currentPage') || 1) => {
    //clear inputs
    const searchInput = document.querySelector('#property-search')
    if (searchInput) searchInput.value = ''

    const budgetBtns = document.querySelectorAll('.ranges__check')
    budgetBtns.forEach((btn) => {
      btn.checked = false
    })

    const budgetSwitch = document.querySelector('#budget-switch')
    if (budgetSwitch.checked) {
      const budgetInput = document.querySelectorAll('.budget__input')
      budgetInput.forEach((input) => {
        input.value = ''
      })
    }

    const ratingRadios = document.querySelectorAll('.rating-radio')
    ratingRadios.forEach((input) => {
      input.checked = false
    })

    const sort = document.querySelector('.results__view--sort')
    sort.value = ''

    //
    isLoading.value.value = true
    errMessage.value.state = false
    const searchData = JSON.parse(localStorage.getItem('searchQuery'))
    if (searchData) {
      try {
        const hotelsCollection = collection(db, searchData.destinationValue)
        const hotelRef = doc(hotelsCollection, `${searchData.destinationValue}-${page}`)
        const hotelSnap = await getDoc(hotelRef)

        if (hotelSnap.exists()) {
          hotelsData.value.data = hotelSnap.data()
          localStorage.setItem('currentPage', page)
          isLoading.value.value = false
        } else {
          hotelsData.value.data = {}
          isLoading.value.value = false
        }
      } catch (err) {
        console.log(err)
        isLoading.value.value = false
        errMessage.value.state = true
        errMessage.value.value =
          '🤕 Failed to connect to the server please check your connection and try again'
      }
    } else {
      isLoading.value.value = false
      errMessage.value.state = true
      errMessage.value.value = '🔎 No query detected please submit a search query to see results'
    }
  }

  return { fetchHotels, hotelsData, isLoading, errMessage }
})
