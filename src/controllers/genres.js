const modelGenres = require('../models/genres')

module.exports = {
    getAll: (req, res) => {
        modelGenres.getData()
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    insertGenre: (req, res) => {
        const data = {
            genre_name: req.body.genre_name
        }
        modelGenres.insertGenrePromise(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    updateGenre: (req, res) => {
        const data = {
            genre_id: req.body.genre_id,
            genre_name: req.body.genre_name
        }
        modelGenres.updateGenrePromise(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    deleteGenre: (req, res) => {
        const genre_id = req.body.genre_id

        modelGenres.deleteGenrePromise(genre_id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
}