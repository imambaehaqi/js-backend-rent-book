const modelBooks = require('../models/books')

module.exports = {
  // GET All Book
  getAll: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const type = req.query.typeby
    const available = req.query.available
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (Number(page) - 1) * limit

    modelBooks.getAllPromise(keyword, sort, type, available, skip, limit)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  findOneBook: (req, res) => {
    const bookid = req.params.bookid

    // Call function promise
    modelBooks.findOneBookPromise(bookid)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertBook: (req, res) => {
    const data = {
      genreid: req.body.genreid,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      released: req.body.released,
      available: true,
      created_at: new Date(),
      updated_at: new Date()
    }

    modelBooks.insertBookPromise(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  updateBook: (req, res) => {
    const bookid = req.body.bookid
    const data = {
      genreid: req.body.genreid,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      released: req.body.released,
      created_at: new Date()
    }

    modelBooks.updateBookPromise(data, bookid)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteBook: (req, res) => {
    const bookid = req.body.bookid

    modelBooks.deleteBookPromise(bookid)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getAvailable: (req, res) => {
    modelBooks.getAvailable()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  setAvailable: (req, res) => {
    const bookid = req.body.bookid
    const available = req.body.available

    modelBooks.setAvailable(bookid, available)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
