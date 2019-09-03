require('dotenv').config()

const mysql = require('mysql')

// connection to database
const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'local',
  password: process.env.DB_PASSWORD || 'kopi',
  database: process.env.DB_NAME || 'db-rent-book'
})

module.exports = conn
