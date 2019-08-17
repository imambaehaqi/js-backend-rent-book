const conn = require('../configs/db')

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_genres', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  insertGenrePromise: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT tb_genres SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateGenrePromise: (data, genreid) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_genres SET ? WHERE genreid = ?', [data, genreid], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteGenrePromise: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM tb_genres WHERE genre_id = ${data}`,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  }
}
