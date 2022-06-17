const { awsConfig: aws } = require('../configs')

class ListController {
  static async getLists (req, res, next) {
    try {
      const objectPath = req.body.path || 'upload/'
      const Bucket = process.env.AWS_BUCKET_NAME
      const Region = process.env.AWS_REGION
      const s3 = new aws.S3()

      const data = await s3.listObjects({
        Bucket,
        Delimiter: '',
        Prefix: objectPath
      }).promise()

      const baseUrl = `https://s3.${Region}.amazonaws.com/${Bucket}/`
      const lists = data.Contents.map(item => {
        return {
          name: item.Key.split('/').pop(),
          url: `${baseUrl}${item.Key}`
        }
      })

      res.status(200).json({
        data: lists
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ListController