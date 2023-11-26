export const generateUniqueToken = () => {
  const array = new Uint32Array(2)
  window.crypto.getRandomValues(array)
  return array.join('')
}
