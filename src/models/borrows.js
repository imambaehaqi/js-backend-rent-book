const conn = require('../configs/db')
const borrowings_list = 'select `borrowings`.`id` AS `id`,`borrowings`.`book_id` AS `book_id`,`books`.`title` AS `title`,`users`.`username` AS `username`,`borrowings`.`borrowed_at` AS `borrowed_at`,`borrowings`.`returned_at` AS `returned_at` from ((`borrowings` join `users` on((`borrowings`.`user_id` = `users`.`id`))) join `books` on((`borrowings`.`book_id` = `books`.`id`)))'

module.exports = {
  insertBorrowing: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT borrowings SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllBorrowing: (keyword = null, sort = null, bookStatus = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = borrowings_list

      const bookStatusIsNotNull = bookStatus != null
      const keywordIsNotNull = keyword != null

      if (bookStatusIsNotNull || keywordIsNotNull) {
        query += `WHERE `
        query += keywordIsNotNull ? `title LIKE '%${keyword}%' ` : ''
        query += bookStatusIsNotNull && keywordIsNotNull ? `AND ` : ``
        query += bookStatusIsNotNull ? `returned_at IS ` : ``
        query += bookStatusIsNotNull && bookStatus === 'returned' ? 'NOT NULL ' : ''
        query += bookStatusIsNotNull && bookStatus === 'borrowed' ? 'NULL ' : ''
      }

      if (sort != null) { query += `ORDER BY ${sort} ` }
      conn.query(query + `LIMIT ${start}, ${limit}`, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getOneBorrowing: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`${borrowings_list} WHERE borrowings.id = ?`, id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getLatestBorrowingByBookId: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM borrowings WHERE book_id = ? AND returned_at IS NULL', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBorrowingsHistoryByUserId: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT borrowings.*, `books`.`id` AS `id`,`books`.`title` AS `title`,`books`.`description` AS `description`,`books`.`image` AS `image`,`books`.`date_released` AS `date_released`,`books`.`availability` AS `availability`,`genres`.`id` AS `genre_id`,`genres`.`name` AS `genre` from `books` join `genres` on`books`.`genre_id` = `genres`.`id` join borrowings on borrowings.book_id = books.id WHERE borrowings.user_id', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  returningBook: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE borrowings SET ? where id = ?', [data, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteBorrowing: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM borrowings WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}
