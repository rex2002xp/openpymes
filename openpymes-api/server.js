'use strict'

const http = require('http')
const chalk = require('chalk')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
app.use('/api/v1', api)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`${chalk.green('[openpymes-api]')} server listering on port ${port}`)
})
