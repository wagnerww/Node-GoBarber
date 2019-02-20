const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')

// middleware
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})
routes.use('/app', authMiddleware)

// rotas
routes.get('/', guestMiddleware, sessionController.create)
routes.get('/app/logout', sessionController.destroy)
routes.post('/signin', sessionController.store)

routes.get('/signup', guestMiddleware, userController.create)
routes.post('/signup', upload.single('avatar'), userController.store)

routes.get('/app/dashboard', (req, res) => {
  console.log('session', req.session.user)
  return res.render('dashboard')
})

module.exports = routes
