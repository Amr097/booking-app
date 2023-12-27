export function validateEmail(value) {
  if (!value) {
    return 'This field is required'
  }

  const spacesRegex = /^\S*$/
  if (!spacesRegex.test(value)) return 'Cannot contain white spaces'

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!regex.test(value)) {
    return 'This field must be a valid email'
  }

  return true
}

export function validatePassword(value) {
  if (!value) {
    return 'This field is required'
  }

  const spacesRegex = /^\S*$/
  if (!spacesRegex.test(value)) return 'Password cannot contain white spaces'

  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|\\[\]{}:";'<>?,./-]).{8,}$/

  if (!regex.test(value))
    return 'Password must be minimum eight characters, at least one capital letter, one number and one special character'

  return true
}
