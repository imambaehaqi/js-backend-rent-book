const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')

Route
    .get('/:book_id', BookController.findOneBook)
    .get('/', BookController.getAll)
    .post('/', BookController.insertBook)
    .patch('/', BookController.updateBook)
    .delete('/', BookController.deleteBook)
    
module.exports = Route