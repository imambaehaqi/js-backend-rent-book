const conn = require('../configs/db')

module.exports = {
  insertGenre: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT tb_genres SET ?', data, (err, result) => {
        if (!err) { resolve(result) } else { reject(err) }
      })
    })
  },
  getAllGenre: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_genres ', (err, result) => {
        if (!err) { resolve(result) } else { reject(err) }
      })
    })
  },
  getOneGenre: (genreid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_genres WHERE genreid = ?', genreid,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  },
  updateGenre: (genreid, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_genres SET ? WHERE genreid = ?', [data, genreid], (err, result) => {
        if (!err) { resolve(result) } else { reject(err) }
      })
    })
  },
  deleteGenre: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM tb_genres WHERE genreid = ?`, data,
        (err, result) => {
          if (!err) { resolve(result) } else { reject(err) }
        })
    })
  }
}
