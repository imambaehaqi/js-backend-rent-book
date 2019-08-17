const modelBorrows = require('../models/borrows')

module.exports = {
  getAll: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const type = req.query.typeby
    const rentbook = req.query.rentbook
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (Number(page) - 1) * limit

    modelBorrows.getDataBorrow(keyword, sort, type, rentbook, skip, limit)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  findOneBorrow: (req, res) => {
    const borrowid = req.params.borrowid

    modelBorrows.findOneBorrowPromise(borrowid)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertBorrow: (req, res) => {
    const data = {
      bookid: req.body.bookid,
      borrowed_at: new Date()
    }
    modelBorrows.insertBorrowPromise(data)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },
  returnBorrow: (req, res) => {
    const data = {
      bookid: req.body.bookid,
      return_at: new Date()
    }
    modelBorrows.returnBorrowPromise(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
