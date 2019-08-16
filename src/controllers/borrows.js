const modelBorrows = require('../models/borrows')

module.exports = {
  getAll: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const type = req.query.typeby
    const rentBook = req.query.rentBook
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (Number(page) - 1) * limit

    modelBorrows.getDataBorrow(keyword, sort, type, rentBook, skip, limit)
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
      userid: req.body.userid,
      borrowed_at: new Date()
    }
    modelBorrows.insertBorrowPromise(data)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },
  returnBorrow: (req, res) => {
    const data = {
      bookid: req.body.bookid,
      userid: req.body.userid,
      return_at: new Date()
    }
    modelBorrows.returnBorrowPromise(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
