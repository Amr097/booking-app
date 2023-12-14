export function validateEmail(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!regex.test(value)) {
    return 'This field must be a valid email'
  }
  // All is good
  return true
}

export function validatePassword(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
  if (!regex.test(value)) {
    return 'Password must be minimum eight characters, at least one capital letter, one number and one special character'
  }
  // All is good
  return true
}
