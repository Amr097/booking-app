export const filterBySearchQuery = (list, query) => {
  let filteredList = list
  if (query.search) {
    filteredList = filteredList.filter((hotel) => {
      const comparisonHotelName = hotel.name.toLowerCase().replace(/\s/g, '')
      const comparisonInput = query.search.toLowerCase().replace(/\s/g, '')
      return comparisonHotelName.includes(comparisonInput)
    })
  }

  if (query.budget) {
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

  if (query.sortBy) {
    const price_low_high = 'price_low_high'
    const price_high_low = 'price_high_low'
    const rating_low_high = 'rating_low_high'
    const rating_high_low = 'rating_high_low'
    if (query.sortBy === price_low_high) filteredList = mergeSort(filteredList, price_low_high)
    if (query.sortBy === price_high_low) filteredList = mergeSort(filteredList, price_high_low)
    if (query.sortBy === rating_low_high) filteredList = mergeSort(filteredList, rating_low_high)
    if (query.sortBy === rating_high_low) filteredList = mergeSort(filteredList, rating_high_low)
  }

  return filteredList
}

const mergeSort = (list, type) => {
  if (list.length < 2) {
    return list
  }

  const mid = Math.floor(list.length / 2)
  const left = list.slice(0, mid)
  const right = list.slice(mid)

  return merge(mergeSort(left, type), mergeSort(right, type), type)
}

const merge = (left, right, type) => {
  const sortedList = []
  while (left.length && right.length && type === 'price_low_high') {
    if (
      (+left[0].price_discount || +left[0].price_gross) <=
      (+right[0].price_discount || +right[0].price_gross)
    ) {
      sortedList.push(left.shift())
    } else {
      sortedList.push(right.shift())
    }
  }

  while (left.length && right.length && type === 'rating_low_high') {
    if ((+left[0].rating || +left[0].rating) <= (+right[0].rating || +right[0].rating)) {
      sortedList.push(left.shift())
    } else {
      sortedList.push(right.shift())
    }
  }

  while (left.length && right.length && type === 'price_high_low') {
    if (
      (+left[0].price_discount || +left[0].price_gross) <=
      (+right[0].price_discount || +right[0].price_gross)
    ) {
      sortedList.push(right.shift())
    } else {
      sortedList.push(left.shift())
    }
  }

  while (left.length && right.length && type === 'rating_high_low') {
    if ((+left[0].rating || +left[0].rating) <= (+right[0].rating || +right[0].rating)) {
      sortedList.push(right.shift())
    } else {
      sortedList.push(left.shift())
    }
  }

  return [...sortedList, ...left, ...right]
}
