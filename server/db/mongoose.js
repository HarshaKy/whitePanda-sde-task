var mongoose = require('mongoose')

const URI = 'mongodb://localhost:27017/CarRental'

mongoose.Promise = global.Promise
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

module.exports = { mongoose }