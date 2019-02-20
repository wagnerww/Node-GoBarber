const express = require('express')
const nunjucks = require('nunjucks')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.middleware()
    this.view()
    this.routes()
  }

  middleware () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      expressSession({
        name: 'root',
        secret: 'MyApp',
        resave: true,
        saveUninitialized: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'session')
        })
      })
    )
  }

  view () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
