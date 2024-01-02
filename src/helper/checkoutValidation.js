export function validateName(value) {
  // if the field is empty
  if (!value) {
    this.isCardName = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    this.isCardName = false
    return 'Name cannot contain numbers or symbols'
  }
  // All is good
  this.isCardName = true
  return true
}

export function validateFirstName(value) {
  // if the field is empty

  if (!value) {
    return 'This field is required'
  }
  // only characters
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    return 'Name cannot contain numbers or symbols'
  }
  return true
}

export function validateLastName(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }
  // only characters
  const regex = /^[^\d\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|]*$/
  if (!regex.test(value)) {
    return 'Name cannot contain numbers or symbols'
  }
  return true
}

export function validateCreditCard(value) {
  // if the field is empty
  if (!value) {
    this.isCardNumber = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{19}$/
  if (!regex.test(value)) {
    this.isCardNumber = false
    return 'Card number must be 19 digits'
  }
  // All is good
  this.isCardNumber = true
  return true
}

export function validateCVC(value) {
  // if the field is empty
  if (!value) {
    this.isSecCode = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{3,4}$/
  if (!regex.test(value)) {
    this.isSecCode = false
    return 'CVC has to be 3 or 4 digits'
  }
  // All is good
  this.isSecCode = true
  return true
}

export function validateYear(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }

  // All is good
  this.isYear = true
  return true
}

export function validateMonth(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required'
  }

  // All is good
  this.isMonth = true
  return true
}

export function validateZip(value) {
  // if the field is empty
  if (!value) {
    this.isZipCode = false
    return 'This field is required'
  }
  // if the field is not a valid email
  const regex = /^\d{5}$/
  if (!regex.test(value)) {
    this.isZipCode = false
    return 'Zip code has to 5 digits'
  }
  // All is good
  this.isZipCode = true
  return true
}
