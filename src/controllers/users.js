require('dotenv').config()
const modelUsers = require('../models/users')
const responses = require('../responses')

const isFormValid = (data) => {
  const Joi = require('@hapi/joi')
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    level: Joi.string()
  })
  const result = Joi.validate(data, schema)
  if (result.error == null) return true
  else return false
}

const hash = (string) => {
  const crypto = require('crypto-js')
  return crypto.SHA256(string)
    .toString(crypto.enc.Hex)
}

module.exports = {
  registerUser: (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      level: 'regular'
    }

    if (!isFormValid(data)) {
      return responses.dataManipulationResponse(res, 200, 'Data is not valid')
    }

    data.password = hash(data.password)

    modelUsers.getAllUserWithEmailorUsername(data.email, data.username)
      .then(result => {
        if (result.length === 0) return modelUsers.registerUser(data)
        else return responses.dataManipulationResponse(res, 200, 'Username or email already registered')
      })
      .then(result => responses.dataManipulationResponse(res, 201, 'Success registering new user', { userid: result[0].insertId, username: data.username }))
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 200, 'Failed register', err)
      })
  },
  getAllUser: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (Number(page) - 1) * limit

    modelUsers.getAllUser(keyword, sort, skip, limit)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, null)
        else return responses.getDataResponse(res, 200, null, null, null, 'All users not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getOneUser: (req, res) => {
    const id = req.params.id

    modelUsers.getOneUser(id)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, null)
        else return responses.getDataResponse(res, 200, null, null, null, 'User not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  loginUser: (req, res) => {
    const email = req.body.email
    const hashedPassword = hash(req.body.password)
    console.log(hashedPassword)
    modelUsers.loginUser(email, hashedPassword)
      .then(result => {
        if (result.length !== 0) {
          const jwt = require('jsonwebtoken')
          const payload = {
            userid: result[0].userid,
            email: result[0].email,
            level: result[0].level
          }
          jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) {
              console.error(err)
            }
            res.json({ token: `Bearer ${token}` })
          })
        } else { return responses.dataManipulationResponse(res, 200, 'Username or email is wrong') }
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  },
  getUserProfile: (req, res) => {
    const userProfile = {
      userid: req.userid,
      username: req.username,
      fullname: req.fullname,
      email: req.email,
      level: req.level
    }
    return responses.getDataResponse(res, 200, userProfile)
  }
}
