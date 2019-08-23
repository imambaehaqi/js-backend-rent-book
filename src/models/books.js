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
  },
  getTotalBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT `TABLE_ROWS` AS total FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = "db_rent-book" AND `TABLE_NAME` = "tb_books"', 
      (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookPublish: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT YEAR(released) AS year FROM tb_books GROUP BY year', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBooksByAvailable: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT tb_books.bookid, tb_books.title, tb_books.image, tb_books.available, COUNT(tb_books.bookid) AS available FROM `tb_borrows` JOIN tb_books ON tb_books.bookid = tb_books.bookid WHERE tb_books.available = 1 GROUP BY bookid ORDER BY available DESC LIMIT 5', 
      (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByPublish: (year) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_books WHERE YEAR(released) = ${year}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_books WHERE genreid = ?`, genre, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
}
