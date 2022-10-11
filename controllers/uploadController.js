const fs = require('fs')
const { awsConfig: aws } = require('../configs')
const { sendSuccessJSON, sendErrorJSON } = require('../helpers/sendJson.js')
const getDate = require('../helpers/getDate.js')

class UploadController {
  static async upload (req, res, next) {
    try {
      const objectPath = req.body.path || `upload/${getDate()}`
      const Bucket = process.env.AWS_BUCKET_NAME
      const Key = `${objectPath}/${req.file.originalname}`
      const fileType = req.file.mimetype
      const s3 = new aws.S3()

      // Check if file exist
      const isObjectExist = await UploadController.checkObject({ Bucket, Key })

      if (isObjectExist) {
        // Delete from temp folder
        fs.unlinkSync(req.file.path)

        sendErrorJSON(res, {
          status: 400,
          message: 'File already exist'
        })
      } else {
        // Upload file to S3
        const data = await s3.upload({
          ACL: 'public-read',
          Body: fs.createReadStream(req.file.path),
          Bucket,
          Key,
          ContentType: fileType
        }).promise()

        // Delete from temp folder
        fs.unlinkSync(req.file.path)

        sendSuccessJSON(res, {
          location: data.Location,
          name: req.file.originalname
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async checkObject ({ Bucket, Key }) {
    try {
      const s3 = new aws.S3()

      await s3.headObject({
        Bucket,
        Key
      }).promise()

      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = UploadController