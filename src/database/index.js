const Sequelize = require('sequelize')
const sequelize = new Sequelize(require('../../config/database.json'))

module.exports = sequelize