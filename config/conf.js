const env = process.env.NODE_ENV

let SQL_CONFIG
let REDIS_CONFIG

if (env === 'production') {
    SQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'vrnjupqr',
        database: 'my_blog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'dev') {
    SQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'vrnjupqr',
        database: 'my_blog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    SQL_CONFIG,
    REDIS_CONFIG
}
