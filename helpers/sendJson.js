const sendSuccessJSON = (res, data = {}) => {
  res.status(200).json(data)
}

const sendErrorJSON = (res, err) => {
  res.status(err.status || 500).json({ message: err.message })
}

module.exports = {
  sendSuccessJSON,
  sendErrorJSON
}