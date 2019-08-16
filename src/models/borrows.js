const conn = require('../configs/db')

module.exports = {
    findOneBorrowPromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM tb_borrows WHERE borrow_id = ?`, data,
            (err, result) => {
                if (!err) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            })
        })
    },
    insertBorrowPromise: (data) => {
        let errormsg = {
            msg : 'Cannot borrow a book that has already been borrowed'
        }
        return new Promise((resolve, reject) => {
            conn.query('SELECT available FROM tb_books WHERE book_id = ?', 
            data.book_id, (err, result) => {
                if (!err){
                    if (result[0].available == 1){
                        conn.query('INSERT tb_borrows SET ?', 
                        data, (err, result) => {
                        if (!err){
                            conn.query('UPDATE tb_books SET available = 0 WHERE book_id = ?', 
                            data.book_id, (err, result) => {
                                if (!err){resolve(result)
                                } else {reject(err)}
                            })
                        } else {reject(err)}
                        })
                    } else{resolve(errormsg)}
                } else {reject(err)}
            })
        })
    },
    returnBorrowPromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM tb_borrows WHERE book_id = ? AND return_at IS NULL', 
            data.book_id, (err, result) => {
                if (!err){
                    conn.query('UPDATE tb_borrows SET return_at = ? WHERE borrow_id = ?', 
                    [data.return_at, result[0].borrow_id], (err, result) => {
                    if (!err){
                        conn.query('UPDATE tb_books SET available = 1 WHERE book_id = ?', 
                        data.book_id, (err, result) => {
                            if (!err){ resolve(result)
                            } else {reject(err)}
                        })
                    } else {reject(err)}
                    })
                } else {reject(err)}
            })
        })
    },
    getDataBorrow: (keyword = null, sort = null, type, rentBook = null, skip, limit) => {
        return new Promise((resolve, reject) => {

            let query = 'SELECT * FROM tb_borrows '

            const rentBookNotNull = rentBook != null
            const keywordNotNull = keyword != null

            if(rentBookNotNull || keywordNotNull){
                query += `WHERE `
                query += rentBookNotNull                          ? `return_at IS `:``
                query += rentBookNotNull && rentBook == 'returned'? 'NOT NULL ':'NULL '
                query += rentBookNotNull && keywordNotNull        ? `AND `:``
                query += keywordNotNull                           ? `title LIKE '%${keyword}%' `:''
            }
            if(sort != null)
                query += `ORDER BY ${sort} ${type} `
        
            conn.query(query + `LIMIT ${skip}, ${limit}`, (err, result) => {
                if (err)
                    reject(err)
                else 
                    resolve(result)
                
            })
        })
    }
}