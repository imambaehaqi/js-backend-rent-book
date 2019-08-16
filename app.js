require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const http = require('http')

const bookRoute = require('./src/routes/books')
const genreRoute = require('./src/routes/genres')
const borrowRoute = require('./src/routes/borrows')
const registRoute = require('./src/routes/users')

const server = require('http').createServer(app)
const port = process.env.SERVER_PORT || 3000

const userRoute = require('./src/routes/users')
const whitelist = process.env.WHITELIST

const corsOptions = (req, callback) => {
    if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
        console.log('Success')
        return callback(null, {
            origin: true
        })
    } else {
        console.log('Failed')
        return callback(null, {
            origin: false
        })
    }
}

app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
    console.log(
        `Server is running on Port ${port}`
    )
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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