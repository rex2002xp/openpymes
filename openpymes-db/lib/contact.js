'use strict'

const debug = require('debug')

module.exports = function setupContact (ContactModel, ContactEmail, ContactPhone) {
  
  const paramFindbyId = {
    include: [ { model: ContactEmail } , { model: ContactPhone }]
  }

  const paramFindAll = {
    include: [ { model: ContactEmail } , { model: ContactPhone }],
    order: [ ['fullname', 'DESC'] ]
  }

  /**
   * Creacion o Actualizacion de Contacto
   * @param {*} contact 
   */
  async function createOrUpdate (contact) {
    const cond = {
      where: {
        id: contact.id
      }
    }

    const existingRecord = await ContactModel.findById(contact.id)

    if (existingRecord) {
      const updated = await ContactModel.update(contact, cond)
      return updated ? ContactModel.findOne(cond) : existingRecord
    }

    const result = await ContactModel.create(contact)
    return result.toJSON()
  }
  
  /**
   * Busqueda de Contacto por Id
   * @param {*} id 
   */
  function findById (id) {
    return ContactModel.findById(id, paramFindbyId)
  }

  /**
   * Retorna el listado completo de usuarios ordernados por el nombre
   */
  function findAll () {
    return ContactModel.findAll(paramFindAll)
  }

  return {
    createOrUpdate,
    findById,
    findAll    
  }
}