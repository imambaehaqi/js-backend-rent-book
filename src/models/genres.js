const conn = require('../configs/db')

module.exports = {
  insertGenre: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT genres SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllGenre: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM genres', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneGenre: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM genres WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  updateGenre: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE genres SET ? where id = ?', [data, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteGenre: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM genres WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}
