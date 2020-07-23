const categoria = require('../../app/models/categoria')

async function insert(dados) {
    try {
        await categoria.create(dados)

        console.log('Banco sincronizado!')
    } catch (erro) {
        console.log(erro)
    }

}

const pessoa = {
    nome: 'Cachorros'
}

insert(pessoa)