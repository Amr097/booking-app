import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('filteration', () => {
  const hotelsSnap = ref({ data: {} })
  const Search = 'Search'
  const SearchxBudget = 'SearchxBudget'
  const Budget = 'Budget'
  const BudgetxSearch = 'BudgetxSearch'
  const Rate = 'Rate'
  const BudgetxRate = 'BudgetxRate'
  const SearchxRate = 'SearchxRate'
  const BudgetxSearchxRate = 'BudgetxSearchxRate'
  const SearchxBudgetxRate = 'SearchxBudgetxRate'

  let filteredHotelsBySearch = []
  let filteredHotelsByBudget = []
  let filteredHotelsByRating = []
  //if already filtered by budget
  let searchBudgetList = []
  let rateBudgetList = []
  //if already filtered by search
  let filterSearchList = []
  let rateSearchList = []
  // if already filtered by search > budget
  let rateSearchBudgetList = []
  // if already filtered by budget > search
  let rateFilterSearchList = []

  //lists stack
  const currentOperation = []

  //search filteration
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
      filteredHotelsBySearch = hotelsList.filter((hotel) => {
        const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
        const comparisonInput = input.toLowerCase().replace(/\s/g, '')
        return comparisonHotelName.includes(comparisonInput)
      })

      hotelsSnap.value.data = filteredHotelsBySearch

      if (filteredHotelsBySearch.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    //if budget was first opertaion
    else if (currentOperation[currentOperation.length - 1] === BudgetxSearch) {
      searchBudgetList = filteredHotelsByBudget.filter((hotel) => {
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
    //if search bar is reset
    if (input === '') {
      currentOperation.length = 0
      hotelsSnap.value.data = hotelsList
      const radioBtns = document.querySelectorAll('.ranges__check')
      filteredHotelsBySearch = []
      filteredHotelsByBudget = []
      filteredHotelsByRating = []
      searchBudgetList = []
      rateBudgetList = []
      filterSearchList = []
      rateSearchList = []
      rateSearchBudgetList = []
      rateFilterSearchList = []
      radioBtns.forEach((btn) => {
        if (btn.checked === true) {
          btn.checked = false
        }
      })
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

    //if past operation was neither search nor budget filter
    if (
      currentOperation.length !== 0 &&
      currentOperation[currentOperation.length - 1] !== Search &&
      currentOperation[currentOperation.length - 1] !== SearchxBudget
    ) {
      currentOperation.pop()
    }

    //if budget was first opertaion
    if (currentOperation.length === 0) {
      currentOperation.push(Budget)
    }

    //if search was last opertaion
    else if (currentOperation[currentOperation.length - 1] === Search) {
      currentOperation.push(SearchxBudget)
    }

    if (currentOperation[currentOperation.length - 1] === Budget) {
      filteredHotelsByBudget = hotelsList.filter((hotel) => {
        const comparisonPrice = hotel.price_discount || hotel.price_gross

        return +comparisonPrice <= +max_budget && +comparisonPrice >= +min_budget
      })

      hotelsSnap.value.data = filteredHotelsByBudget

      if (filteredHotelsByBudget.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    //
    else if (currentOperation[currentOperation.length - 1] === SearchxBudget) {
      filterSearchList = filteredHotelsBySearch.filter((hotel) => {
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
        filteredHotelsBySearch = []
        filteredHotelsByBudget = []
        filteredHotelsByRating = []
        searchBudgetList = []
        rateBudgetList = []
        filterSearchList = []
        rateSearchList = []
        rateSearchBudgetList = []
        rateFilterSearchList = []
        isLoading.value = true
        errMessage.state = false
        errMessage.value = ''
        currentOperation.length = 0
        hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }
    })

    if (toggleBudget.state === true) {
      if (currentOperation.length > 0) {
        document.querySelector('#property-search').value = ''
        isLoading.value = true
        filteredHotelsBySearch = []
        filteredHotelsByBudget = []
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
          if (lastOperation === SearchxBudget) hotelsSnap.value.data = filteredHotelsBySearch
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
        if (lastOperation === SearchxBudget) hotelsSnap.value.data = filteredHotelsBySearch
        else if (lastOperation === Budget) hotelsSnap.value.data = hotelsDataSnap.data.hotels
      }
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
    toggleBudget.state = !toggleBudget.state
  }

  const handleRatingFilteration = (item, isLoading, errMessage, hotelsDataSnap) => {
    const lastOperation = currentOperation[currentOperation.length - 1]
    const hotelsList = hotelsDataSnap.data.hotels
    isLoading.value = true
    errMessage.state = false
    errMessage.value = ''

    if (currentOperation.length === 0) currentOperation.push(Rate)
    else if (lastOperation === Budget) currentOperation.push(BudgetxRate)
    else if (lastOperation === Search) currentOperation.push(SearchxRate)
    else if (lastOperation === BudgetxSearch) currentOperation.push(BudgetxSearchxRate)
    else if (lastOperation === SearchxBudget) currentOperation.push(SearchxBudgetxRate)

    if (currentOperation[currentOperation.length - 1] === Rate) {
      //if search was first opertaion
      filteredHotelsByRating = hotelsList.filter((hotel) => {
        return Math.ceil(hotel.rating) === item
      })

      hotelsSnap.value.data = filteredHotelsByRating

      if (filteredHotelsByRating.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    } else if (currentOperation[currentOperation.length - 1] === BudgetxRate) {
      rateBudgetList = filteredHotelsByBudget.filter((hotel) => {
        return Math.ceil(hotel.rating) === item
      })

      hotelsSnap.value.data = rateBudgetList

      if (rateBudgetList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    } else if (currentOperation[currentOperation.length - 1] === SearchxRate) {
      rateSearchList = filteredHotelsBySearch.filter((hotel) => {
        return Math.ceil(hotel.rating) === item
      })

      hotelsSnap.value.data = rateSearchList

      if (rateSearchList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    } else if (currentOperation[currentOperation.length - 1] === BudgetxSearchxRate) {
      rateSearchBudgetList = searchBudgetList.filter((hotel) => {
        return Math.ceil(hotel.rating) === item
      })

      hotelsSnap.value.data = rateSearchBudgetList

      if (rateSearchBudgetList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    } else if (currentOperation[currentOperation.length - 1] === SearchxBudgetxRate) {
      rateFilterSearchList = filterSearchList.filter((hotel) => {
        return Math.ceil(hotel.rating) === item
      })

      hotelsSnap.value.data = rateFilterSearchList

      if (rateFilterSearchList.length === 0) {
        errMessage.state = true
        errMessage.value = '🔎  0 results found for your search'
      }
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  return {
    hotelsSnap,
    handleFilteration,
    handleBudgetFilteration,
    clearSearch,
    handleToggleBudget,
    handleRatingFilteration
  }
})
