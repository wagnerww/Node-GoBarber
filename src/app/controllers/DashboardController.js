const { Users } = require('../models')
class DashboardController {
  async index (req, res) {
    const providers = await Users.findAll({ where: { provider: true } })

    res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
