const modelUsers = require('../models/users')
const MiscHelper = require('../helpers/helpers')

const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

module.exports = {
  getIndex: (req, res) => {
    return res.json({ message: 'Hello World' })
  },

  getUsers: (req, res) => {
    modelUsers.getUsers((err, result) => {
      if (err) console.log(err)

      MiscHelper.response(res, result, 200)
    })
  },

  userDetail: (req, res) => {
    const userid = req.params.userid

    modelUsers.userDetail(userid)
      .then((resultUser) => {
        const result = resultUser[0]
        MiscHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18)
    const passwordHash = MiscHelper.setPassword(req.body.password, salt)

    const data = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: 'Test',
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }

    modelUsers.register(data)
      .then((resultRegister) => {
        MiscHelper.response(res, resultRegister, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    modelUsers.getByEmail(email)
      .then((result) => {
        const dataUser = result[0]
        const usePassword = MiscHelper.setPassword(password, dataUser.salt).passwordHash

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign({
            user_id: dataUser.user_id
          }, process.env.SECRET_KEY, { expiredIn: '1h' })

          delete dataUser.salt
          delete dataUser.password

          return MiscHelper.response(res, dataUser, 200)
        } else {
          return MiscHelper.response(res, null, 403, 'Wrong password!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  cloudinary: async (req, res) => {
    const file = await req.file
    console.log(file)

    cloudinary.config({
      cloud_name: '',
      api_key: '',
      api_secret: ''
    })

    cloudinary.uploader.upload(req.file, (err, result) => {
      console.log(result, err)
    })
  }
}
