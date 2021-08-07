const routes = require('express').Router()
const { uploadController } = require('../../controllers')

routes.post('/upload', uploadController.upload)

module.exports = routes