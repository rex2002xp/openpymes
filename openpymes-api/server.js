'use strict'

const debug = require('debug')('openpymes:api')
const http = require('http')
const chalk = require('chalk')
const express = require('express')
const asyncity = require('express-asyncify')
const bodyParser = require('body-parser')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncity(express())
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Express Route Api
app.use('/api/v1', api)

// Express Error Handler
api.use((err, req, res, next) => {
  debug(err.message)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledException', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[openpymes-api]')} server listering on port ${port}`)
})
