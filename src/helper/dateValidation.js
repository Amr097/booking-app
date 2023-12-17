const options = { year: 'numeric', month: 'short', day: 'numeric' }

export const validateCheckin = (searchData, datpickerErr) => {
  const currentDate = new Date()
  const checkInDate = new Date(searchData.checkInDate)
  const checkOutDate = new Date(searchData.checkOutDate)

  if (checkInDate && checkInDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
    datpickerErr.state = true
    datpickerErr.message = "Date can't be eariler than today."
    return
  }
  if (
    searchData.checkOutDate &&
    checkInDate.setHours(0, 0, 0, 0) > checkOutDate.setHours(0, 0, 0, 0)
  ) {
    datpickerErr.state = true
    datpickerErr.message = "Check in can't be later than check out."
    return
  }

  const checkInFormatted = new Date(searchData.checkInDate).toLocaleDateString('en-US', options)
  const checkOutFormatted = new Date(searchData.checkOutDate).toLocaleDateString('en-US', options)

  if (searchData.checkInDate && searchData.checkOutDate && checkOutFormatted === checkInFormatted) {
    datpickerErr.state = true
    datpickerErr.message = "Check in and check out can't be the same."
    return
  }

  datpickerErr.state = false
  datpickerErr.message = ''
}

export const validateCheckout = (searchData, datpickerErr) => {
  const currentDate = new Date()
  const checkInDate = new Date(searchData.checkInDate)
  const checkOutDate = new Date(searchData.checkOutDate)

  if (checkOutDate && checkOutDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
    datpickerErr.state = true
    datpickerErr.message = "Date can't be eariler than today."
    return
  }

  if (
    searchData.checkInDate &&
    checkInDate.setHours(0, 0, 0, 0) > checkOutDate.setHours(0, 0, 0, 0)
  ) {
    datpickerErr.state = true
    datpickerErr.message = "Check out can't be earlier than check in."
    return
  }

  const checkInFormatted = new Date(searchData.checkInDate).toLocaleDateString('en-US', options)
  const checkOutFormatted = new Date(searchData.checkOutDate).toLocaleDateString('en-US', options)

  if (searchData.checkInDate && searchData.checkOutDate && checkOutFormatted === checkInFormatted) {
    datpickerErr.state = true
    datpickerErr.message = "Check out and check in can't be the same."
    return
  }

  datpickerErr.state = false
  datpickerErr.message = ''
}
