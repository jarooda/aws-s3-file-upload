const allModules = {}

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.js', '')
    allModules[name] = require('./' + file)
  }
})

module.exports = allModules