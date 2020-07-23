const Sequelize = require('sequelize')
const sequelize = require('../../database/index')

const Produto = sequelize.define('produtos', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_loja: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Produto