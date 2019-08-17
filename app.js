require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const xssFilter = require('x-xss-protection')
const http = require('http')

const bookRoute = require('./src/routes/books')
const genreRoute = require('./src/routes/genres')
const borrowRoute = require('./src/routes/borrows')

const port = process.env.SERVER_PORT || 1708

const userRoute = require('./src/routes/users')

app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
  console.log(
    `Server is running on Port ${port}`
  )
})

// user controllers input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// url pages
app.use('/books', bookRoute)
app.use('/borrows', borrowRoute)
app.use('/genres', genreRoute)
app.use('/users', userRoute)

process.on('uncaughtException', (err) => {
  console.error(new Date() + ' uncaughException: ', err.message)
  console.error(err.stack)
  process.exit(1)
})

process.on('SIGINT', () => {
  process.exit(1)
})

module.exports.server = http.createServer(app)
