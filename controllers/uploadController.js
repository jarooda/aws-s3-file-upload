class UploadController {
  static async upload (req, res, next) {
    try {
      res.send('hello')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UploadController