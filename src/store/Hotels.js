import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineStore('hotels', () => {
  const hotelsData = ref({ hotels: [], meta: [] })

  const router = useRouter()
  const fetchHotels = async (options, query, isLoading) => {
    isLoading.value = true
    console.log(options)
    try {
      const response = await axios.request(options)
      console.log(response.data)
      if (!response.data.status) {
        alert('Error, ' + response.data.message.message)
      } else if (response.data.status) {
        localStorage.setItem('searchQuery', JSON.stringify(query))
        hotelsData.value.hotels = response.data.data.hotels
        if (response.data.data.meta.length > 0) {
          hotelsData.value.meta = response.data.data.meta
        }

        console.log({ hotels: hotelsData.value.hotels, meta: hotelsData.value.meta })
        isLoading.value = false
        if (router.path !== '/search/results') {
          router.push('/search/results')
        }
      }
    } catch (error) {
      console.error(error)
      isLoading.value = false
      alert(error.message)
    }
  }

  return { fetchHotels, hotelsData }
})
