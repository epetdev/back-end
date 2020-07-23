const Sequelize = require('sequelize')
const sequelize = require('../../database/index')

const Categoria = sequelize.define('categorias', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Categoria