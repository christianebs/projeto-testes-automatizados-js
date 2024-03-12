const { Router } = require('express')
const SessionController = require('./controllers/session-ctrl')
const UserController = require('./controllers/user-ctrl')
const authMiddlware = require('./middlewares/auth')

const routes = new Router()

routes.post('/user', UserController.create)
routes.post('/session', SessionController.create)

routes.post('/change-password', authMiddlware, UserController.changePassword)

module.exports = routes