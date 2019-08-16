const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genres')

Route
    .get('/', GenreController.getAll)
    .post('/', GenreController.insertGenre)
    .patch('/', GenreController.updateGenre)
    .delete('/', GenreController.deleteGenre)

module.exports = Route