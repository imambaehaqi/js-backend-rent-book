const express = require('express')
const Route = express.Router()
const multer = require('multer')
const upload = multer()

const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
    .all('/*', Auth.authInfo)
    .get('/', Auth.accesstoken, UserController.getUsers)
    .get('/:user_id', UserController.userDetail)
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .post('/cloudinary', upload.single('image'), UserController.cloudinary)

module.exports = Route