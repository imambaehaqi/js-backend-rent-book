const conn = require('../configs/db')

const books_list = 'select `books`.`id` AS `id`,`books`.`title` AS `title`,`books`.`description` AS `description`,`books`.`image` AS `image`,`books`.`date_released` AS `date_released`,`books`.`availability` AS `availability`,`genres`.`id` AS `genre_id`,`genres`.`name` AS `genre` from (`books` join `genres` on((`books`.`genre_id` = `genres`.`id`))) '

module.exports = {
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT books SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllBook: (keyword = null, sort = 'title', availability = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = books_list

      const availabilityIsNotNull = availability != null
      const keywordIsNotNull = keyword != null

      if (availabilityIsNotNull || keywordIsNotNull) {
        query += `WHERE `
        query += availabilityIsNotNull ? `availability = ${availability} ` : ``
        query += availabilityIsNotNull && keywordIsNotNull ? `AND ` : ``
        query += keywordIsNotNull ? `title LIKE '%${keyword}%' ` : ''
      }

      query += sort != null ? `ORDER BY ${sort} ` : ''

      conn.query(query + `LIMIT ${start}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(books_list + ' WHERE books.id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getTotalBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT `TABLE_ROWS` AS total FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = "rent-books" AND `TABLE_NAME` = "books"', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookYears: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT YEAR(date_released) AS year FROM books GROUP BY year', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookGenres: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT genres.name AS genre FROM genres WHERE genres.id IN (SELECT books.genre_id FROM books GROUP BY books.genre_id)', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getNewestBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query(books_list + `ORDER BY books.created_at DESC LIMIT 5`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByYear: (year) => {
    return new Promise((resolve, reject) => {
      conn.query(`${books_list} WHERE YEAR(date_released) = ${year}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      conn.query(`${books_list} WHERE genres.name = ?`, genre, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  updateBook: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  setAvailability: (id, availability) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET availability = ? where id = ?', [availability, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAvailability: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT availability FROM books WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM books WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}
