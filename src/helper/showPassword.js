export default function showPassword(id) {
  const passwordInput = document.getElementById(id)

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'
  } else if (passwordInput.type === 'text') {
    passwordInput.type = 'password'
  }
}
