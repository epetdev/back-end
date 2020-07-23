const sequelize = require('../index')

async function teste() {
    try {
        sequelize.authenticate()
        console.log('Sequelize conseguiu realizar a conexão com o banco!')

    } catch (erro) {
        console.log('Erro')
    }
}

teste()