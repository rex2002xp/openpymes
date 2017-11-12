'use strict'

const debug = require('debug')('openpymes:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'pymes',
    username: process.env.DB_USER || 'pymes',
    password: process.env.DB_PASS || 'pymes',
    host: process.env.DB_HOST || '0.0.0.0',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: s => debug(s)
  }
}
