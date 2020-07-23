const Sequelize = require('sequelize')
const sequelize = require('../../database/index')

const Loja = sequelize.define('lojas', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_produtos: {
        type: Sequelize.STRING
    },
    id_categorias: {
        type: Sequelize.STRING,
        allowNull: false
    }    
})

module.exports = Loja