if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const { errorHandler } = require('./middlewares')
const { corsConfig } = require('./configs')

const port = process.env.PORT || 3000
const app = express()

const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (corsConfig.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.use(express.urlencoded({ extended:false }))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})