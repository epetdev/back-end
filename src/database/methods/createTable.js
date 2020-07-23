const shop = require('../../app/models/loja')
const user = require('../../app/models/usuario')
const categoria = require('../../app/models/categoria')
const produtos = require('../../app/models/produtos')

async function create() {
    try {
        await user.sequelize.sync({ force: true })
        await shop.sequelize.sync({ force: true })
        await categoria.sequelize.sync({ force: true })
        await produtos.sequelize.sync({ force: true })

        console.log('Banco sincronizado!')
    } catch (erro) {
        console.log(erro)
    }

}

create()