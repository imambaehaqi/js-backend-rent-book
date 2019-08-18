const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
  .post('/register/admin', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.registerUser)
  .post('/register', UserController.registerUser)
  .post('/login', UserController.loginUser)
  .get('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.getAllUser)
  .get('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.getOneUser)

module.exports = Route
