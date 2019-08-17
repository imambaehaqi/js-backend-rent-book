const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')

Route
  // url pages and implementation routes
  .get('/:bookid', BookController.findOneBook)
  .get('/', BookController.getAll)
  .post('/', BookController.insertBook)
  .patch('/', BookController.updateBook)
  .delete('/', BookController.deleteBook)
  .patch('/', BookController.setAvailable)

module.exports = Route
