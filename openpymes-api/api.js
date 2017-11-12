'use strict'

const debug = require('debug')('openpymes:api:routes')
const express = require('express')
const asyncity = require('express-asyncify')
const db = require('openpymes-db')
const config = require('./config')

const api = asyncity(express.Router())

let services, Contact

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
  }

  Contact = services.Contact
  next()
})

api.get('/contacts', async (req, res) => {
  debug('A request has come to  /api/v1/contacts')
  res.send({})
})

api.get('/contact/:id', async (req, res, next) => {
  const { id } = req.params
  debug(`A request has come to  /api/v1/contact/${id}`)

  if (id !== 10) {
    return next(new Error('Contact not found'))
  }

  res.send({ id })
})

module.exports = api
