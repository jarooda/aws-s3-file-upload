const { sendErrorJSON } = require('../helpers/sendJson.js')

module.exports = errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.status) {
    sendErrorJSON(res, err)
  } else {
    sendErrorJSON(res, {
      status: 500,
      message: 'Internal Server Error'
    })
  }
}