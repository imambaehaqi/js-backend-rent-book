const conn = require('../configs/db')

module.exports = {
    getUsers: (callback) => {
        connection.query(`SELECT * FROM user`, (err, result) => {
            if (err) console.log(err)

            callback(err, result)
        })
    },

    userDetail: (user_id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM tb_users WHERE user_id = ?`, user_id,
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO user SET ?`, data, (err, result) => {
                if (!err){
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT user_id, email, fullname, created_at, updated_at, salt, password FROM tb_users WHERE email = ?`, 
            email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}