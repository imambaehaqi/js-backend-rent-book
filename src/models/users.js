const conn = require('../configs/db')

module.exports = {
  registerUser: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT users SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllUsersWithEmailOrUsername: (email, username) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllUsers: (keyword = null, sort = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT id, username, email, level FROM users `

      query += keyword != null ? `WHERE usename LIKE %${keyword}% ` : ''
      query += sort != null ? `ORDER BY ${sort} ` : ''

      conn.query(`${query}LIMIT ${start}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT id, username, email, level FROM users WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}
