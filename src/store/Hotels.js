import { defineStore } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'
import { hotelsCollection } from '../services/firebase'
import { ref } from 'vue'
//import { useRouter } from 'vue-router'
//import axios from 'axios'

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
        const hotelRef = doc(hotelsCollection, `${searchData.destinationValue}-${page}`)
        const hotelSnap = await getDoc(hotelRef)

        if (hotelSnap.exists()) {
          hotelsData.value.data = hotelSnap.data()
          localStorage.setItem('currentPage', page)
          isLoading.value.value = false

          // } else {
          //   hotelData.forEach(async (item, index) => {
          //     const i = index + 1
          //     const j = i.toString()
          //     await setDoc(doc(hotelsCollection, `hurghada-${j}`), item)
          //   })
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

// export default defineStore('hotels', () => {
//   const hotelsData = ref({ hotels: [], meta: [] })

//   const router = useRouter()
//   const fetchHotels = async (options, query, isLoading) => {
//     isLoading.value = true
//     console.log(options)
//     try {
//       const response = await axios.request(options)
//       console.log(response.data)
//       if (!response.data.status) {
//         alert('Error, ' + response.data.message.message)
//       } else if (response.data.status) {
//         localStorage.setItem('searchQuery', JSON.stringify(query))
//         hotelsData.value.hotels = response.data.data.hotels
//         if (response.data.data.meta.length > 0) {
//           hotelsData.value.meta = response.data.data.meta
//         }

//         console.log({ hotels: hotelsData.value.hotels, meta: hotelsData.value.meta })
//         isLoading.value = false
//         if (router.path !== '/search/results') {
//           router.push('/search/results')
//         }
//       }
//     } catch (error) {
//       console.error(error)
//       isLoading.value = false
//       alert(error.message)
//     }
//   }

//   return { fetchHotels, hotelsData }
// })
