const conn = require('../configs/db')

module.exports = {
  registerUser: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT tb_users SET ?',
        data, (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  loginUser: (email, password) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_users WHERE email = ? AND password = ?',
        [email, password], (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  getAllUserWithEmailorUsername: (email, username) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_users WHERE email = '${email}' OR username = '${username}'`,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  getAllUser: (keyword = null, sort = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT userid, username, email, level FROM tb_users'

      query += keyword !== null ? `WHERE username LIKE %${keyword}% ` : ''
      query += sort !== null ? `ORDER BY ${sort} ` : ''

      conn.query(`${query} LIMIT ${start}, ${limit}`, (err, result) => {
        if (!err) { resolve(result) } else { reject(err) }
      })
    })
  },
  getOneUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT userid, username, email, level FROM tb_users WHERE userid = ?',
        id, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
    })
  }
}
