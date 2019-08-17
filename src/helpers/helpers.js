const crypto = require('crypto')

module.exports = {
  response: (res, result, status, error) => {
    const resultPrint = {}

    resultPrint.error = error || null
    resultPrint.status_code = status || 200
    resultPrint.result = result

    return res.status(resultPrint.status_code).json(resultPrint)
  },

  generateSalt: (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex').slice(0, length)
  },

  setPassword: (password, salt) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  }
}
