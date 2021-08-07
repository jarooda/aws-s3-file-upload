const routes = require('express').Router()
const multer = require('multer')
const { uploadController } = require('../../controllers')

routes.post('/upload', multer({ dest: 'temp/', limits: { fieldSize: 4 * 1024 * 1024 } }).single('img'), uploadController.upload)

module.exports = routes