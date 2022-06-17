const fs = require('fs')
const { awsConfig: aws } = require('../configs')

class UploadController {
  static async upload (req, res, next) {
    try {
      const objectPath = req.body.path || 'upload'
      const Bucket = process.env.AWS_BUCKET_NAME
      const Key = `${objectPath}/${req.file.originalname}`
      const fileType = req.file.mimetype
      const s3 = new aws.S3()

      // Check if file exist
      const isObjectExist = await UploadController.checkObject({ Bucket, Key })

      if (isObjectExist) {
        // Delete from temp folder
        fs.unlinkSync(req.file.path)

        res.status(400).json({ message: 'File Already Exist!' })
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

        res.status(200).json({
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