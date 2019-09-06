const express = require('express')
const Route = express.Router()

const BorrowController = require('../controllers/borrows')
const Auth = require('../helpers/auth')

Route
  .post('/', Auth.verifyTokenHelpers, BorrowController.requestBorrowing)
  .get('/', Auth.verifyTokenHelpers, BorrowController.getAllBorrowing)
  .get('/donate', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BorrowController.getBorrowingRequests)
  .get('/history', Auth.verifyTokenHelpers, BorrowController.getBorrowingsHistory)
  .get('/book/:id', Auth.verifyTokenHelpers, BorrowController.getLatestBorrowingByBookId)
  .get('/:id', Auth.verifyTokenHelpers, BorrowController.getOneBorrowing)
  .patch('/confirm', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BorrowController.confirmBorrowing)
  .patch('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BorrowController.returningBook)
  .delete('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, BorrowController.deleteBorrowing)

module.exports = Route
