const modelBooks = require('../models/books')
const responses = require('../responses')

module.exports = {
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

    modelBooks.insertBook(data)
      .then(result => {
        data.id = result.insertId
        return responses.dataManipulationResponse(res, 201, 'Success insert data book', data)
      })
      .catch(err => {
        console.error(err)
        return responses.dataManipulationResponse(res, 500, 'Failed to insert data book or genre not found')
      })
  },
  getAllBook: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const type = req.query.typeby
    const available = req.query.available
    const page = req.query.page || 1
    const limit = req.query.limit || 12
    const skip = (Number(page) - 1) * limit

    modelBooks.getAllBook(keyword, sort, type, available, skip, limit)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, page)
        else return responses.getDataResponse(res, 200, null, null, null, 'Book not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getOneBook: (req, res) => {
    const bookid = req.params.bookid

    modelBooks.getOneBook(bookid)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Book not found')
      })
      .catch(err => {
        console.log(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  updateBook: (req, res) => {
    const bookid = req.params.bookid
    const data = {
      genreid: req.body.genreid,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      released: req.body.released,
      created_at: new Date()
    }

    modelBooks.updateBook(data, bookid)
      .then(result => {
        data.bookid = bookid
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success updating book', data)
        else return responses.dataManipulationResponse(res, 200, 'Failed update', data)
      })
      .catch(err => {
        console.log(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  deleteBook: (req, res) => {
    const bookid = req.params.bookid

    modelBooks.deleteBook(bookid)
      .then(result => {
        result.bookid = bookid
        if (result.affectedRows !== 0) return responses.dataManipulationResponse(res, 200, 'Success deleting book')
        else return responses.dataManipulationResponse(res, 200, 'Failed delete, data not found')
      })
      .catch(err => {
        console.log(err)
        return responses.dataManipulationResponse(res, 500, err)
      })
  },
  getTotalBooks: (req, res) => {
    modelBooks.getTotalBooks()
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Data not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getBookPublish: (req, res) => {
    modelBooks.getBookPublish()
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getBookByPublish: (req, res) => {
    modelBooks.getBookByPublish(req.params.publish)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getBookByGenre: (req, res) => {
    modelBooks.getBookByGenre(req.params.genre)
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  },
  getBooksByAvailable: (req, res) => {
    modelBooks.getBooksByAvailable()
      .then(result => {
        if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
        else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
      })
      .catch(err => {
        console.error(err)
        return responses.getDataResponse(res, 500, err)
      })
  }
}
