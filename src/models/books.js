const conn = require('../configs/db')

module.exports = {
  insertBookPromise: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT tb_books SET ?', data,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  updateBookPromise: (data, bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_books SET ? WHERE bookid = ?', [data, bookid], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteBookPromise: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM tb_books WHERE bookid = ${data}`,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  findOneBookPromise: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_books WHERE bookid = ${data}`,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },
  getAllPromise: (keyword = null, sort = null, type, available = null, skip, limit) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tb_books '

      const availableNotNull = available != null
      const keywordNotNull = keyword != null

      if (availableNotNull || keywordNotNull) {
        query += `WHERE `
        query += availableNotNull ? `available = ${available} ` : ``
        query += availableNotNull && keywordNotNull ? `AND ` : ``
        query += keywordNotNull ? `title LIKE '%${keyword}%' ` : ''
      }
      if (sort != null) {
        query += `ORDER BY ${sort} `
        if (type == null) { query += `${type} ` }
      }
      conn.query(query + `LIMIT ${skip}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAvailable: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT available FROM tb_books WHERE bookid = ?',
        bookid, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
    })
  },
  setAvailable: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT available FROM tb_books WHERE bookid',
        bookid, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
    })
  }
}
