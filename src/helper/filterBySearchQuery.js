export const filterBySearchQuery = (list, query) => {
  // console.log(list, query)
  let filteredList = list
  if (query.search) {
    filteredList = filteredList.filter((hotel) => {
      const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
      const comparisonInput = query.search.toLowerCase().replace(/\s/g, '')
      return comparisonHotelName.includes(comparisonInput)
    })
  }

  if (query.budget) {
    console.log('budget: met')

    const { min_budget, max_budget } = query.budget
    filteredList = filteredList.filter((hotel) => {
      const comparisonPrice = hotel.price_discount || hotel.price_gross

      return +comparisonPrice <= +max_budget && +comparisonPrice >= +min_budget
    })
  }

  if (query.rate) {
    filteredList = filteredList.filter((hotel) => {
      return Math.ceil(hotel.rating) === query.rate
    })
  }

  return filteredList
}
