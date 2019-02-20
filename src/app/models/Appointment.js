// const Users = require('./Users');
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointments', {
    date: DataTypes.DATE
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
    Appointment.belongsTo(models.Users, {
      as: 'provider',
      foreignKey: 'provider_id'
    })
  }

  return Appointment
}
