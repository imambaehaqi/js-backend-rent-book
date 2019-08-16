const modelBooks = require('../models/books')

module.exports = {
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
        const book_id = req.params.book_id

        modelBooks.findOneBookPromise(book_id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    insertBook: (req, res) => {
        const data = {
            genre_id: req.body.genre_id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            available: true,
            created_at: new Date(),
            updated_at: new Date()
        }

        modelBooks.insertBookPromise(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    updateBook: (req, res) => {
        const book_id = req.body.book_id
        const data = {
            genre_id: req.body.genre_id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            created_at: new Date()
        }
        
        modelBooks.updateBookPromise(data, book_id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    deleteBook: (req, res) => { 
        const book_id = req.body.book_id
        
        modelBooks.deleteBookPromise(book_id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
}