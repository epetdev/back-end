const Sequelize = require('sequelize')
const sequelize = require('../../database/index')
const bcrypt = require('bcryptjs')

const Usuario = sequelize.define('usuarios', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_comercial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    id_loja: {
        type: Sequelize.STRING
    },
    // Token - JWT
    senhaResetToken: {
        type: Sequelize.STRING
    },
    senhaResetExpires: {
        type: Sequelize.DATE
    }
})

//Usuario.hasOne(require('./shop'))
Usuario.addHook('beforeSave', async function(user, options) {
    const hash = await bcrypt.hash(user.senha, 10)
    user.senha = hash
})

module.exports = Usuario