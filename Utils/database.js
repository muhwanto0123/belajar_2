const postgres = require('postgres') // import postgres
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/./../.env.local' })
}

let sql
if (process.env.NODE_ENV === 'production') {
  sql = postgres({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    pass: process.env.DB_PASS
  })
} else {
  sql = postgres({
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    port: process.env.DB_PORT_LOCAL,
    pass: process.env.DB_PASS_LOCAL
  })
}

module.exports = sql
