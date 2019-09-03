const express = require('express')
const Route = express.Router()

const BorrowController = require('../controllers/borrows')
const Auth = require('../helpers/auth')

Route
  .post('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BorrowController.insertBorrowing)
  .get('/', Auth.verifyTokenHelpers, BorrowController.getAllBorrowing)
  .get('/history/', Auth.verifyTokenHelpers, BorrowController.getBorrowingsHistory)
  .get('/book/:id', Auth.verifyTokenHelpers, BorrowController.getLatestBorrowingByBookId)
  .get('/:id', Auth.verifyTokenHelpers, BorrowController.getOneBorrowing)
  .patch('/', Auth.verifyTokenHelpers, BorrowController.returningBook)
  .delete('/:id', Auth.verifyTokenHelpers, BorrowController.deleteBorrowing)

module.exports = Route
