export const subtractDates = (checkin, checkout) => {
  // Example dates
  const checkinDate = new Date(checkin)
  const checkoutDate = new Date(checkout)

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = checkoutDate - checkinDate

  // Convert milliseconds to days
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  return Math.floor(differenceInDays) // Output the difference in days
}
