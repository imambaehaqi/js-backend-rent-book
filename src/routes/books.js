const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')
const Auth = require('../helpers/auth')

Route
  // url pages and implementation routes
  .post('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.insertBook)
  .get('/:bookid', BookController.getOneBook)
  .get('/', BookController.getAllBook)
  .patch('/:bookid', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.updateBook)
  .delete('/:bookid', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.deleteBook)

module.exports = Route
