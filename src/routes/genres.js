const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genres')
const Auth = require('../helpers/auth')

Route
  .post('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.insertGenre)
  .get('/', GenreController.getAllGenre)
  .get('/:genreid', GenreController.getOneGenre)
  .patch('/:genreid', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.updateGenre)
  .delete('/:genreid', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, GenreController.deleteGenre)

module.exports = Route
