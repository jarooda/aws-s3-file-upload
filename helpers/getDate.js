const getDate = () => {
  // create format YYYYMMDD
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  const day = date.getDate()
  
  // if month is less than 10, add 0 in front
  if (month < 10) {
    month = `0${month}`
  }
  return `${year}${month}${day}`
}

module.exports = getDate