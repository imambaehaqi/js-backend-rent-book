const express = require('express')
const Route = express.Router()

const BorrowController = require('../controllers/borrows')
const Auth = require('../helpers/auth')

Route
  .post('/', Auth.verifyTokenHelpers, BorrowController.insertBorrow)
  .get('/', Auth.verifyTokenHelpers, BorrowController.getAllBorrow)
  .get('/book/:bookid', Auth.verifyTokenHelpers, BorrowController.returnBorrow)
  .get('/history/:borrowid', Auth.verifyTokenHelpers, BorrowController.getBorrowsHistoryByUserId)
  .get('/:borrowid', Auth.verifyTokenHelpers, BorrowController.getOneBorrow)
  .patch('/', Auth.verifyTokenHelpers, BorrowController.returnBorrow)
  .delete('/:borrowid', Auth.verifyTokenHelpers, BorrowController.deleteBorrow)

module.exports = Route
