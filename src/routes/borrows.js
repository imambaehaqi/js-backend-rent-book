const express = require('express')
const Route = express.Router()

const BorrowController = require('../controllers/borrows')

Route
  .get('/', BorrowController.getAll)
  .post('/', BorrowController.insertBorrow)
  .get('/:borrowid', BorrowController.findOneBorrow)
  .patch('/', BorrowController.returnBorrow)

module.exports = Route
