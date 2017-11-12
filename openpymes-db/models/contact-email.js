'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

/**
 * Configuracion del Objecto Sequelize que representa la tabla contact-phones
 * @param {*} config
 */
module.exports = function setupContactEmailModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('contact_email', {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    })
}
