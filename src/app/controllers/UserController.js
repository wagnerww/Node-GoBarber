const { Users } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { filename: avatar } = req.file
    await Users.create({ ...req.body, avatar })
    return res.redirect('/')
  }
}

module.exports = new UserController()
