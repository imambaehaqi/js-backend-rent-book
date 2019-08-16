const modelBorrows = require('../models/borrows')

module.exports = {
    getAll: (req, res) => {
        const keyword = req.query.search
        const sort = req.query.sortby
        const type = req.query.typeby
        const rentBook = req.query.status
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (Number(page) - 1) * limit

        modelBorrows.getDataBorrow(keyword, sort, type, rentBook, skip, limit)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    findOneBorrow: (req, res) => {
        const borrow_id = req.params.borrow_id

        modelBorrows.findOneBorrowPromise(borrow_id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    insertBorrow: (req, res) => { 
        const data = {
            book_id: req.body.book_id,
            borrowed_at: new Date()
        }
        modelBorrows.insertBorrowPromise(data)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    },
    returnBorrow: (req, res) => {
        const data = {
            book_id: req.body.book_id,
            return_at: new Date()
        }
        modelBorrows.returnBorrowPromise(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
}