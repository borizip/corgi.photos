const { createNuxtHandler } = require('nuxt-aws-lambda')

module.exports.render = createNuxtHandler(require('./nuxt.config.js'))
