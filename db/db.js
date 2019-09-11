const mysql = require('mysql')
const {SQL_CONFIG} = require('../config/conf')

const con = mysql.createConnection(SQL_CONFIG)

// 连接数据库
con.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            console.log(result)
            resolve(result)
        })
    })
}

module.exports = {
    exec
}
