import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('filteration', () => {
  const hotelsSnap = ref({ data: {} })
  let filteredHotelsBySearchList = []
  let filteredHotelsByBudgetList = []
  //if already filtered by budget
  let searchBudgetList = []
  //if already filtered by search
  let filterSearchList = []

  const handleFilteration = (e, hotelsDataSnap, isLoading, errMessage) => {
    const input = e.target.value

    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''
    const hotelsList = hotelsDataSnap.data.hotels

    if (filteredHotelsByBudgetList.length === 0) {
      filteredHotelsBySearchList = hotelsList.filter((hotel) => {
        const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
        const comparisonInput = input.toLowerCase().replace(/\s/g, '')
        return comparisonHotelName.includes(comparisonInput)
      })

      hotelsSnap.value.data = filteredHotelsBySearchList
    } else {
      searchBudgetList = filteredHotelsByBudgetList.filter((hotel) => {
        const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
        const comparisonInput = input.toLowerCase().replace(/\s/g, '')
        return comparisonHotelName.includes(comparisonInput)
      })

      hotelsSnap.value.data = searchBudgetList
    }

    if (filteredHotelsBySearchList.length === 0 && searchBudgetList.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const handleBudgetFilteration = (event, budget, hotelsDataSnap, isLoading, errMessage) => {
    console.log(event.target.value, budget, hotelsDataSnap, isLoading, errMessage)

    const { max_budget, min_budget } = budget

    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    const hotelsList = hotelsDataSnap.data.hotels

    if (filteredHotelsBySearchList.length > 0) {
      filterSearchList = filteredHotelsBySearchList.filter((hotel) => {
        const comparisonPrice = hotel.price_discount || hotel.price_gross
        return comparisonPrice <= max_budget && comparisonPrice > min_budget
      })

      hotelsSnap.value.data = filterSearchList
    } else {
      filteredHotelsByBudgetList = hotelsList.filter((hotel) => {
        const comparisonPrice = hotel.price_discount || hotel.price_gross
        return comparisonPrice <= max_budget && comparisonPrice > min_budget
      })

      hotelsSnap.value.data = filteredHotelsByBudgetList
    }

    if (filteredHotelsByBudgetList.length === 0 && filterSearchList.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const clearSearch = (isLoading, errMessage, hotelsDataSnap) => {
    const radioBtns = document.querySelectorAll('.ranges__check')
    radioBtns.forEach((btn) => {
      if (btn.checked === true) {
        btn.checked = false
        document.querySelector('#property-search').value = ''
        filteredHotelsBySearchList = []
        filteredHotelsByBudgetList = []
        searchBudgetList = []
        isLoading.value = true
        errMessage.state = false
        errMessage.value = ''
        hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }
    })

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  return { hotelsSnap, handleFilteration, handleBudgetFilteration, clearSearch }
})
