const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')
const DashboarController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableControlers = require('./app/controllers/AvailableControllers')

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

routes.get('/app/dashboard', DashboarController.index)

routes.get('/files/:file', FileController.sow)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableControlers.index)

module.exports = routes
