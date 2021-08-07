const routes = require('express').Router()
const { authentication } = require('../middlewares')
const v1 = require('./v1')

routes.use(authentication)
routes.use('/v1', v1)

module.exports = routes