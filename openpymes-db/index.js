'use strict'

/**
 * Modulo de persistencia para la plataforma PyMES
 * @param {*} config
 */

const setupDatabase = require('./lib/db')
const setupContactModel = require('./models/contact')
const setupContactPhoneModel = require('./models/contact-phone')
const setupContactEmailModel = require('./models/contact-email')
const setupContact = require('./lib/contact')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const ContactModel = setupContactModel(config)
  const ContactPhone = setupContactPhoneModel(config)
  const ContactEmail = setupContactEmailModel(config)

  ContactModel.hasMany(ContactPhone)
  ContactModel.hasMany(ContactEmail)
  ContactPhone.belongsTo(ContactModel)
  ContactEmail.belongsTo(ContactModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Contact = setupContact(ContactModel, ContactEmail, ContactPhone)

  return {
    Contact
  }
}
