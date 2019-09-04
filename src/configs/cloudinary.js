const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

const configg = cloudinary.config()
const uploader = cloudinary.uploader

dotenv.configg

const cloudinaryConfig = (req, res, next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    next()
}

module.exports = { cloudinaryConfig, uploader }