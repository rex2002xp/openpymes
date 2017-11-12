'use strict'

const debug = require('debug')('openpymes:api:routes')
const express = require('express')

const api = express.Router()

api.get('/contacts', (req, res) => {
  debug('A request has come to  /api/v1/contacts')
  res.send({})
})

api.get('/contact/:id', (req, res) => {
  const { id } = req.params
  debug(`A request has come to  /api/v1/contact/${id}`)
  res.send({ id })
})

module.exports = api
