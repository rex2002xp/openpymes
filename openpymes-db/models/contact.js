'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

/**
 * Configuracion del Objecto Sequelize que representa la tabla Contacts
 * @param {*} config
 */
module.exports = function setupContactModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('contact', {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true
    },
    job: {
      type: Sequelize.STRING,
      allowNull: true
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  },
    {
      underscored: true
    })
}
