const express = require('express')

const routes = require('./routes')

//Server configs
const server = express()
server.use(express.json())
server.use(routes)

module.exports = server