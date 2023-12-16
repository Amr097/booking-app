export function validateInput(value) {
  if (!value) {
    return 'This field is required'
  }

  const regex = /^[1-9]$/i
  if (!regex.test(value)) {
    return 'Must be a number between 1 and 9'
  }
  return true
}
