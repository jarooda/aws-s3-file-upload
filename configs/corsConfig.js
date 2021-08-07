const whitelist = process.env.WHITELIST || 'http://localhost:8080'

const whitelists = whitelist.split(',')

const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (whitelists.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = corsOptionsDelegate