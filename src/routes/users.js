const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
  .get('/', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.getAllUsers)
  .get('/profile', Auth.verifyTokenHelpers, UserController.getUserProfile)
  .get('/:id', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.getOneUser)
  .post('/register/admin', Auth.verifyTokenHelpers, Auth.verifyAdminPrevilege, UserController.registerAdmin)
  .post('/register', UserController.registerUser)
  .post('/login', UserController.login)

module.exports = Route
