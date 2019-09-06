const modelBorrowings = require('../models/borrows')
const responses = require('../responses')
const modelBook = require('../models/books')

module.exports = {
  getBorrowingRequests: (req, res) => {
    modelBorrowings.getBorrowingRequests()
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Request data not found')
      })
      .catch(err => {
        console.error(err)
        return responses(res, 500, err)
      })
  },
  requestBorrowing: (req, res) => {
    let borrowingData = {
      user_id: req.body.user_id,
      book_id: req.body.book_id,
      is_confirmed: req.body.is_confirmed || 0,
    }
    if(borrowingData.is_confirmed !== 0) borrowingData.borrowed_at = new Date()
    modelBook.getAvailability(borrowingData.book_id)
      .then(result => {
        if (result[0].availability === 1) {
          return modelBorrowings.insertBorrowing(borrowingData) 
        } else {
          return responses.dataManipulationResponse(res, 409, 'Book is not yet available')
        }
      }) 
      .then(result => {
        console.log(result)
        borrowingData.id = result.insertId
        return responses.dataManipulationResponse(res, 201, 'Borrowing Requested', borrowingData)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed to borrow book', err)
      })
  },
  confirmBorrowing:(req, res)=>{
    const id = req.body.id
    const book_id = req.body.book_id
    modelBook.getAvailability(book_id)
      .then(result => {
        if (result[0].availability === 1) {
          return Promise.all([
            modelBorrowings.confirmBorrowing(id), 
            modelBook.setAvailability(book_id)
          ])
        } else {
          return responses.dataManipulationResponse(res, 409, 'Book is not yet available')
        }
      }) 
      .then(result => {
        return responses.dataManipulationResponse(res, 201, 'Borrowing Confirmed', {id,book_id})
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed to borrow book', err)
      })
  },
  getAllBorrowing: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const bookStatus = req.query.book_status
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const start = (Number(page) - 1) * limit

    modelBorrowings.getAllBorrowing(keyword, sort, bookStatus, start, limit)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, page)
        else return responses.getDataResponse(res, 404, result, result.length, page, 'Borrowing data not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getOneBorrowing: (req, res) => {
    const id = req.params.id
    modelBorrowings.getOneBorrowing(id)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Borrowing data not found')
      })
      .catch(err => {
        console.error(err)
        return responses(res, 500, err)
      })
  },
  getLatestBorrowingByBookId: (req, res) => {
    const id = req.params.id
    modelBorrowings.getLatestBorrowingByBookId(id)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Borrowing data not found')
      })
      .catch(err => {
        console.error(err)
        return responses(res, 500, err)
      })
  },
  getBorrowingsHistory: (req, res) => {
    modelBorrowings.getBorrowingsHistoryByUserId(req.user_id)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 404, null, null, null, 'Borrowing data not found')
      })
      .catch(err => {
        console.error(err)
        return responses(res, 500, err)
      })
  },
  returningBook: (req, res) => {
    const data = {
      book_id: req.body.book_id,
      returned_at: new Date()
    }
    modelBorrowings.getLatestBorrowingByBookId(data.book_id)
      .then(result => {
        if (result.length !== 0) {
          return Promise.all([
            modelBorrowings.returningBook(result[0].id, data),
            modelBook.setAvailability(data.book_id, 1)
          ])
        } else {
          return responses.dataManipulationResponse(res, 409, 'Book has already been returned')
        }
      })
      .then(result => responses.dataManipulationResponse(res, 200, 'Success returning book', data))
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed to return book', err)
      })
  },
  deleteBorrowing: (req, res) => {
    const id = req.params.id

    modelBorrowings.deleteBorrowing(id)
      .then(result => responses.dataManipulationResponse(res, 200, 'Success deleting borrowing data', result))
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed to delete borrowing data', err)
      })
  }
}
