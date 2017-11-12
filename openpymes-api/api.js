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
    debug('[ Connecting to database ]')
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
  debug('[ Router /api/v1/contacts ]')
  
  await Contact.findAll().then(records => {
    res.send(records)
  }).catch(err => {
    next(err)
  })
})

api.get('/contact/:id', async (req, res, next) => {
  const { id } = req.params
  debug(`[ Route /api/v1/contact/${id} ]`)
  
  await Contact.findById(id).then(record => {
    if (record) {
      res.send(record);
    } else {
      next(new Error('Contact not found'))
    }    
  }).catch(err=>{
    next(err)
  })
})

api.post('/contact', async (req, res, next) => {
  await Contact.createOrUpdate(req.body.contact).then(record=>{
    res.send(record)
  }).catch(err => { 
    next(err)
  })
})

module.exports = api
