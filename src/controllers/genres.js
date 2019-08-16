const modelGenres = require('../models/genres')

module.exports = {
  getAll: (req, res) => {
    modelGenres.getData()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertGenre: (req, res) => {
    const data = {
      name: req.body.name
    }
    modelGenres.insertGenrePromise(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  updateGenre: (req, res) => {
    const data = {
      genreid: req.body.genreid,
      name: req.body.name
    }
    modelGenres.updateGenrePromise(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    const genreid = req.body.genreid

    modelGenres.deleteGenrePromise(genreid)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
