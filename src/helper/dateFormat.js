export const formatDate = (date, checkout) => {
  if (checkout) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    return {
      checkin: new Date(date.checkin).toLocaleDateString('en-US', options),
      checkout: new Date(date.checkout).toLocaleDateString('en-US', options)
    }
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(date).toLocaleDateString('en-US', options)
  }
}
