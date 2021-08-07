const secretKey = process.env.SECRET_KEY

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization
  try {
    if (!authorization) {
      throw {
        status: 401,
        message: `You're Unauthorized!`
      }
    } else if (authorization === secretKey) {
      next()
    } else {
      throw {
        status: 401,
        message: `You're Unauthorized!`
      }
    }
  } catch (error) {
    next(error)
  }
}