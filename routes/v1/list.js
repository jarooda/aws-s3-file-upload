const routes = require('express').Router()
const { listController } = require('../../controllers')

routes.get('/lists', listController.getLists)

module.exports = routes