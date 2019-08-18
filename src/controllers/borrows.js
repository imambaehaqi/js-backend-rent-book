const modelBorrows = require('../models/borrows')
const responses = require('../responses')

module.exports = {
  insertBorrow: (req, res) => {
    const data = {
      userid: req.userid,
      bookid: req.body.bookid,
      borrowed_at: new Date()
    }
    modelBorrows.insertBorrow(data)
      .then(result => {
        data.id = result[0].insertId
        return responses.dataManipulationResponse(res, 200, 'Success borrowing book', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed borrow book', err)
      })
  },
  getAllBorrow: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const type = req.query.typeby
    const rentbook = req.query.rentbook
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (Number(page) - 1) * limit

    modelBorrows.getAllBorrow(keyword, sort, type, rentbook, skip, limit)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, page)
        else return responses.getDataResponse(res, 200, result, result.length, page, 'Borrowing data not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getOneBorrow: (req, res) => {
    const borrowid = req.params.borrowid

    modelBorrows.getOneBorrow(borrowid)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Borrowing not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  returnBorrow: (req, res) => {
    const data = {
      bookid: req.body.bookid,
      return_at: new Date()
    }
    modelBorrows.returnBorrow(data)
      .then(result => responses.dataManipulationResponse(res, 200, 'Success return book', data))
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed return book', err)
      })
  },
  deleteGenres: (req, res) => {
    const borrowid = req.params.borrowid

    modelBorrows.deleteGenre(borrowid)
      .then(result => {
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success deleting borrow', { borrowid })
        else return responses.dataManipulationResponse(res, 200, 'Failed to delete', { borrowid })
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  }
}
