export const getDate = () => {
  const date = new Date()
  date.setHours(date.getHours() - 5)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const dateNow = `${year}-${month}-${day} ${hour}:${minutes}`

  return dateNow
}
