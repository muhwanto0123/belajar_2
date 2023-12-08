if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/./../.env.local' })
}

module.exports = {
  development: {
    username: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASS_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    host: process.env.DB_HOST_LOCAL,
    port: process.env.DB_PORT_LOCAL,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
}
