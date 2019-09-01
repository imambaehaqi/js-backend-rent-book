require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const bookRoute = require('./src/routes/books')
const genreRoute = require('./src/routes/genres')
const borrowRoute = require('./src/routes/borrows')
const userRoute = require('./src/routes/users')

const PORT = process.env.PORT

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on PORT ${PORT}`)
})

// user controllers input
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// url pages
app.use('/books', bookRoute)
app.use('/borrows', borrowRoute)
app.use('/genres', genreRoute)
app.use('/users', userRoute)
