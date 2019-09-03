const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genres')
const Auth = require('../helpers/auth')

Route
  .post('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.insertGenres)
  .get('/', GenreController.getAllGenres)
  .get('/:id', GenreController.getOneGenre)
  .patch('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.updateGenres)
  .delete('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.deleteGenres)

module.exports = Route
