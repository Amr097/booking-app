import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('filteration', () => {
  const hotelsSnap = ref({ data: {} })
  const Search = 'Search'
  const SearchxBudget = 'SearchxBudget'
  const Budget = 'Budget'
  const BudgetxSearch = 'BudgetxSearch'
  let filteredHotelsBySearchList = []
  let filteredHotelsByBudgetList = []
  //if already filtered by budget
  let searchBudgetList = []
  //if already filtered by search
  let filterSearchList = []

  //lists stack
  const currentOperation = []

  const handleFilteration = (e, hotelsDataSnap, isLoading, errMessage) => {
    const input = e.target.value
    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    if (currentOperation.length === 0) {
      currentOperation.push(Search)
    } else if (currentOperation[currentOperation.length - 1] === Budget) {
      currentOperation.push(BudgetxSearch)
    }

    //if search was first opertaion

    if (currentOperation[currentOperation.length - 1] === Search) {
      filteredHotelsBySearchList = hotelsList.filter((hotel) => {
        const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
        const comparisonInput = input.toLowerCase().replace(/\s/g, '')
        return comparisonHotelName.includes(comparisonInput)
      })

      hotelsSnap.value.data = filteredHotelsBySearchList

      if (filteredHotelsBySearchList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    //if budget was first opertaion
    else if (currentOperation[currentOperation.length - 1] === BudgetxSearch) {
      searchBudgetList = filteredHotelsByBudgetList.filter((hotel) => {
        const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
        const comparisonInput = input.toLowerCase().replace(/\s/g, '')
        return comparisonHotelName.includes(comparisonInput)
      })

      hotelsSnap.value.data = searchBudgetList

      if (searchBudgetList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    if (input === '') {
      console.log(currentOperation)
      currentOperation.pop()
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const handleBudgetFilteration = (
    budget,
    hotelsDataSnap,
    isLoading,
    errMessage,
    customBudgetErr
  ) => {
    const { max_budget, min_budget } = budget

    if (max_budget === '' || min_budget === '') {
      max_budget === '' ? (customBudgetErr.max_display = 'block') : null

      min_budget === '' ? (customBudgetErr.min_display = 'block') : null

      return
    }

    console.log(customBudgetErr.max_display)

    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''
    customBudgetErr.max_display = 'none'
    customBudgetErr.min_display = 'none'

    //if budget was first opertaion

    if (currentOperation.length === 0) {
      currentOperation.push(Budget)
    }

    //if search was last opertaion
    else if (currentOperation[currentOperation.length - 1] === Search) {
      currentOperation.push(SearchxBudget)
    }

    if (currentOperation[currentOperation.length - 1] === Budget) {
      filteredHotelsByBudgetList = hotelsList.filter((hotel) => {
        const comparisonPrice = hotel.price_discount || hotel.price_gross

        return +comparisonPrice <= +max_budget && +comparisonPrice >= +min_budget
      })

      hotelsSnap.value.data = filteredHotelsByBudgetList

      if (filteredHotelsByBudgetList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    //
    else if (currentOperation[currentOperation.length - 1] === SearchxBudget) {
      filterSearchList = filteredHotelsBySearchList.filter((hotel) => {
        const comparisonPrice = hotel.price_discount || hotel.price_gross
        return comparisonPrice <= +max_budget && +comparisonPrice > +min_budget
      })

      hotelsSnap.value.data = filterSearchList

      if (filterSearchList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const clearSearch = (
    isLoading,
    errMessage,
    hotelsDataSnap,
    customBudgetErr,
    toggleBudget,
    customBudget
  ) => {
    const radioBtns = document.querySelectorAll('.ranges__check')
    radioBtns.forEach((btn) => {
      if (btn.checked === true) {
        btn.checked = false
        document.querySelector('#property-search').value = ''
        filteredHotelsBySearchList = []
        filteredHotelsByBudgetList = []
        searchBudgetList = []
        filterSearchList = []
        isLoading.value = true
        errMessage.state = false
        errMessage.value = ''
        currentOperation.length = 0
        hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }
    })

    if (toggleBudget.state === true) {
      if (currentOperation.length > 0) {
        isLoading.value = true
        filteredHotelsBySearchList = []
        filteredHotelsByBudgetList = []
        searchBudgetList = []
        filterSearchList = []
        currentOperation.length = 0
        hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }

      customBudget.min_budget = ''
      customBudget.max_budget = ''
      errMessage.state = false
      errMessage.value = ''
      customBudgetErr.max_display = 'none'
      customBudgetErr.min_display = 'none'
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const handleToggleBudget = (
    isLoading,
    errMessage,
    hotelsDataSnap,
    toggleBudget,
    customBudget,
    customBudgetErr
  ) => {
    const radioBtns = document.querySelectorAll('.ranges__check')
    let lastOperation
    let lastOperationCheck
    if (currentOperation.length > 0) {
      lastOperation = currentOperation[currentOperation.length - 1]
      lastOperationCheck = lastOperation.slice(lastOperation.length - 6, lastOperation.length)
    }

    radioBtns.forEach((btn) => {
      if (btn.checked === true) {
        isLoading.value = true
        errMessage.state = false
        errMessage.value = ''
        btn.checked = false

        if (lastOperationCheck === Budget) {
          if (lastOperation === SearchxBudget) hotelsSnap.value.data = filteredHotelsBySearchList
          else if (lastOperation === Budget) hotelsSnap.value.data = hotelsDataSnap.data.hotels
        }
      }
    })

    if (toggleBudget.state === true) {
      customBudget.min_budget = ''
      customBudget.max_budget = ''
      errMessage.state = false
      errMessage.value = ''
      customBudgetErr.max_display = 'none'
      customBudgetErr.min_display = 'none'

      if (lastOperationCheck === Budget) {
        isLoading.value = true
        if (lastOperation === SearchxBudget) hotelsSnap.value.data = filteredHotelsBySearchList
        else if (lastOperation === Budget) hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
    toggleBudget.state = !toggleBudget.state
  }

  return { hotelsSnap, handleFilteration, handleBudgetFilteration, clearSearch, handleToggleBudget }
})
