import { defineStore } from 'pinia'
import { ref } from 'vue'
import { filterBySearchQuery } from '../helper/filterBySearchQuery'

export default defineStore('filteration', () => {
  const hotelsSnap = ref({ data: {} })
  const queryData = {}

  //search filteration
  const handleFilteration = (e, hotelsDataSnap, isLoading, errMessage) => {
    const input = e.target.value
    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    queryData.search = input

    hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

    if (hotelsSnap.value.data.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  //clear search
  const clearSearch = (isLoading, errMessage, hotelsDataSnap) => {
    const inputField = document.querySelector('#property-search')
    const hotelsList = hotelsDataSnap.data.hotels

    if (inputField.value) {
      isLoading.value = true
      errMessage.state = false
      errMessage.value = ''
      inputField.value = ''
      queryData.search = null

      hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)
      if (hotelsSnap.value.data.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    } else {
      return
    }

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  //budget filteration
  const handleBudgetFilteration = (
    budget,
    hotelsDataSnap,
    isLoading,
    errMessage,
    customBudgetErr
  ) => {
    const { max_budget, min_budget } = budget
    queryData.budget = { ...budget }

    if (max_budget === '' || min_budget === '') {
      max_budget === '' ? (customBudgetErr.max_display = 'block') : null

      min_budget === '' ? (customBudgetErr.min_display = 'block') : null

      return
    }

    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''
    customBudgetErr.max_display = 'none'
    customBudgetErr.min_display = 'none'

    hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

    if (hotelsSnap.value.data.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  //reset budget
  const clearBudget = (
    isLoading,
    errMessage,
    hotelsDataSnap,
    customBudgetErr,
    toggleBudget,
    customBudget
  ) => {
    // check if  budget query data exist
    if (queryData.budget && queryData.budget.max_budget >= 0 && queryData.budget.min_budget >= 0) {
      const hotelsList = hotelsDataSnap.data.hotels
      const radioBtns = document.querySelectorAll('.ranges__check')
      //check if data are filtered by radio btn
      radioBtns.forEach((btn) => {
        if (btn.checked === true) {
          btn.checked = false
          isLoading.value = true
          errMessage.state = false
          errMessage.value = ''
          // hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

          if (hotelsSnap.value.data.length === 0) {
            errMessage.state = true
            errMessage.value = '🔎  0 results found for your search'
          }
        }
      })

      //check if data are filtered by custom budget

      if (toggleBudget.state) {
        //
        customBudget.min_budget = ''
        customBudget.max_budget = ''
        queryData.budget = null
        errMessage.state = false
        errMessage.value = ''
        customBudgetErr.max_display = 'none'
        customBudgetErr.min_display = 'none'

        //
        isLoading.value = true
        hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

        if (hotelsSnap.value.data.length === 0) {
          errMessage.state = true
          errMessage.value = '🔎  0 results found for your search'
        }
      }

      //check if query exists but neither toggle switch is on of radio btn checked
      if (!toggleBudget.state) {
        //reset refernce
        queryData.budget = null
        errMessage.state = false
        errMessage.value = ''
        //
        isLoading.value = true
        hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

        if (hotelsSnap.value.data.length === 0) {
          errMessage.state = true
          errMessage.value = '🔎  0 results found for your search'
        }
      }

      //reset budget refernce
      queryData.budget = null

      setTimeout(() => {
        isLoading.value = false
      }, 50)
    }
  }

  //toggle budget
  const handleToggleBudget = (toggleBudget, customBudget, customBudgetErr) => {
    const radioBtns = document.querySelectorAll('.ranges__check')

    radioBtns.forEach((btn) => {
      if (btn.checked === true) {
        btn.checked = false
        queryData.budget = null
      }
    })
    console.log(queryData.budget, 3)
    if (toggleBudget.state === true) {
      customBudget.min_budget = ''
      customBudget.max_budget = ''

      customBudgetErr.max_display = 'none'
      customBudgetErr.min_display = 'none'
    }

    toggleBudget.state = !toggleBudget.state
  }

  //rating filteration

  const handleRatingFilteration = (rate, isLoading, errMessage, hotelsDataSnap) => {
    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    queryData.rate = rate
    hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

    if (hotelsSnap.value.data.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  //clear rating
  const clearRating = (isLoading, errMessage, hotelsDataSnap) => {
    const ratingList = document.querySelectorAll('.rating-radio')
    const hotelsList = hotelsDataSnap.data.hotels

    ratingList.forEach((btn) => {
      if (btn.checked === true) {
        btn.checked = false
        isLoading.value = true
        errMessage.state = false
        errMessage.value = ''
        queryData.rate = null
        hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

        if (hotelsSnap.value.data.length === 0) {
          errMessage.state = true
          errMessage.value = '🔎  0 results found for your search'
        }

        return
      }
    })

    hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  //handle sorting

  const sortResults = (option, isLoading, errMessage, hotelsDataSnap) => {
    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    queryData.sortBy = option
    hotelsSnap.value.data = filterBySearchQuery(hotelsList, queryData)

    if (hotelsSnap.value.data.length === 0) {
      errMessage.state = true
      errMessage.value = '🔎  0 results found for your search'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 50)
  }

  return {
    hotelsSnap,
    handleFilteration,
    handleBudgetFilteration,
    clearSearch,
    clearBudget,
    clearRating,
    handleToggleBudget,
    handleRatingFilteration,
    sortResults,
    queryData
  }
})
