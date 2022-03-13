let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let cors = require('cors')
let bosyParser = require('body-parser')
let mongoDb = require('./database/db')

mongoose.Promise = global.Promise
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB conected successfully!')
}), error => {
  console.log('DB error: ' + error)
}

const bookRoute = require('./routes/book.route')

const app = express()
app.use(bosyParser.json())
app.use(bosyParser.urlencoded({
  extended: false
}))
app.use(cors())

// Static directory path
app.use(express.static(path.join(__dirname)))

// Base route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// use API root
app.use('/api', bookRoute)

// Port
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Listing on port ${port}`)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  if (!err.statusCode) {
    err.statusCode = 500
  }

  res.status(err.statusCode).send(err.message)
})