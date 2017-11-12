'use strict'

const debug = require('debug')('openpymes:db:setup')
const db = require('./index')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  })

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'pymes',
    username: process.env.DB_USER || 'pymes',
    password: process.env.DB_PASS || 'pymes',
    host: process.env.DB_HOST || '0.0.0.0',
    dialect: process.env.DB_DIALECT || 'postgres',
    setup: process.env.DB_SETUP || false,
    logging: s => debug(s)
  }

  await db(config).catch(handleFatalError)
  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
