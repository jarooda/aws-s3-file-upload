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

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended:false }))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})