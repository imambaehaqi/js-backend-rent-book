const conn = require('../configs/db')

module.exports = {
  insertBorrow: (data) => {
    const errormsg = {
      msg: 'Cannot borrow a book that has already been borrowed or not available book'
    }
    return new Promise((resolve, reject) => {
      conn.query('SELECT available FROM tb_books WHERE bookid = ?',
        data.bookid, (err, result) => {
          if (!err) {
            if (result[0].available === 1) {
              conn.query('INSERT tb_borrows SET ?',
                data, (err, result) => {
                  if (!err) {
                    conn.query('UPDATE tb_books SET available = 0 WHERE bookid = ?',
                      data.bookid, (err, result) => {
                        if (!err) {
                          resolve(result)
                        } else { reject(err) }
                      })
                  } else { reject(err) }
                })
            } else { resolve(errormsg) }
          } else { reject(err) }
        })
    })
  },
  getAllBorrow: (keyword = null, sort = null, rentbook = null, skip, limit) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tb_borrows '

      const rentBookNotNull = rentbook != null
      const keywordNotNull = keyword != null

      if (rentBookNotNull || keywordNotNull) {
        query += `WHERE `
        query += keywordNotNull ? `title LIKE '%${keyword}%' ` : ''
        query += rentBookNotNull && keywordNotNull ? `AND ` : ``
        query += rentBookNotNull ? `return_at IS ` : ``
        query += rentBookNotNull && rentbook === 'returned' ? 'NOT NULL ' : ''
        query += rentBookNotNull && rentbook === 'borrowed' ? 'NULL ' : ''
      }
      if (sort != null) { query += `ORDER BY ${sort} ` }

      conn.query(query + `LIMIT ${skip}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneBorrow: (borrowid) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_borrows WHERE borrowid = ?`, borrowid,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  returnBorrow: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_borrows WHERE bookid = ? AND return_at IS NULL',
        data.bookid, (err, result) => {
          if (!err) {
            conn.query('UPDATE tb_borrows SET return_at = ? WHERE borrowid = ?',
              [data.return_at, result[0].id], (err, result) => {
                if (!err) {
                  resolve(result)
                  conn.query('UPDATE tb_books SET available = 1 WHERE bookid = ?',
                    data.bookid, (err, result) => {
                      if (!err) {resolve(result)} else { reject(err) }
                    })
                } else { reject(err) }
              })
          } else { reject(err) }
        })
    })
  },
  getLatestBorrowingByBookId: (borrowid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_borrows WHERE bookid = ? AND return_at IS NULL', borrowid, 
      (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBorrowsHistoryByUserId: (borrowid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_borrows JOIN `tb_books` ON tb_books.bookid = tb_borrows.bookid WHERE tb_borrows.userid = ? GROUP BY tb_books.bookid', 
      borrowid, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteBorrow: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM tb_borrows WHERE borrowid = ?', bookid,
        (err, result) => {
          if (!err) { resolve(result) } else { resolve(result) }
        })
    })
  }
}
