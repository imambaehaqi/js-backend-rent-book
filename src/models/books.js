const conn = require('../configs/db')

module.exports = {
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT tb_books SET ?', data,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  getOneBook: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_books WHERE bookid = ${bookid}`,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  getAllBook: (keyword = null, sort = null, type, available = null, skip, limit) => {
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
      }
      conn.query(query + `LIMIT ${skip}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  updateBook: (data, bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_books SET ? WHERE bookid = ?', [data, bookid], (err, result) => {
        if (!err) { resolve(result) } else { reject(err) }
      })
    })
  },
  deleteBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM tb_books WHERE bookid = ${data}`,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  }
}
