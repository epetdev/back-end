const categoria = require('../../app/models/categoria')

async function query(num) {
    try {
        const result = await categoria.findOne({ where: { id: num } })

        if (result == null) {
            console.log('Erro')
        } else {
            console.log(result)
        }
    } catch (erro) {
        console.log(erro)
    }

}

query(3)