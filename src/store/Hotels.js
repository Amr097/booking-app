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
        }
        //else {
        //   hotelDataCairo.forEach(async (item, index) => {
        //     const i = index + 1
        //     const j = i.toString()
        //     await setDoc(doc(hotelsCollection, `cairo-${j}`), item)
        //   })
        // }
        else {
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
