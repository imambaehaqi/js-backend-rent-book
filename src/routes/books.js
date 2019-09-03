const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')
const Auth = require('../helpers/auth')

Route
  // url pages and implementation routes
  .post('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.insertBook)
  .get('/', BookController.getAllBook)
  .get('/total/', BookController.getTotalBooks)
  .get('/newest/', BookController.getNewestBooks)
  .get('/year/', BookController.getBookYears)
  .get('/genre/', BookController.getBookGenres)
  .get('/year/:year', BookController.getBookByYear)
  .get('/genre/:genre', BookController.getBookByGenre)
  .get('/:id', BookController.getOneBook)
  .patch('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.updateBook)
  .delete('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BookController.deleteBook)

module.exports = Route
