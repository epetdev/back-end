const produto = require('../models/produtos')
const loja = require('../models/loja')

module.exports = {
    async index(req, res) {
        try {
            const { id } = req.params

            if (await loja.findOne({ where: { id } }) == null) return res.status(400).json({ erro: 'Loja não encontrada!' })
            const product = await produto.findAll({ where: { id_loja: id } })

            if (product == null) return res.status(400).json({ erro: 'Erro ao encontrar a loja!' })
            if (product.length > 0) return res.json(product)

            return res.json({ erro: 'Nenhum produto encontrado!' })
        } catch(erro) {
            return res.status(400).json({ erro: 'Erro ao encontrar a loja!' })
        }
    },
    async showMore(req, res) {
        try {
            const { id, id_produtos } = req.params
            const verify = await loja.findOne({ where: { id } })
            
            const split = verify.id_produtos.split(', ')
            for (let i = 0; i < split.length; i++) {
                if (id_produtos == split[i]) {
                    const pr = await produto.findOne({ where: { id: id_produtos } })
                    if (pr) return res.json(pr)

                    return res.status(400).json({ erro: 'Erro ao encontrar o produto!' })
                }
            }

            return res.status(400).json({ erro: 'Produto não encontrado!' })

        } catch(erro) {
            return res.status(400).json({ erro: 'Erro ao encontrar os produtos na loja!' })
        }
    },
    async store(req, res) {
        try {
            const encoded = req.body
            const decoded = req.loja
            const { id } = decoded
            const sh = await loja.findOne({ where: { id } })

            if (encoded.nome == null || encoded.descricao == null || encoded.preco == null) return res.status(400).json({ erro: 'Preencha todos os campos!' })
            if (sh == null) return res.status(400).json({ erro: 'A loja não existe!' })

            const product = await produto.create({
                nome: encoded.nome,
                descricao: encoded.descricao,
                preco: encoded.preco,
                id_loja: id
            })

            if (sh.id_produtos == null || sh.id_produtos == '') {
                sh.id_produtos = product.id
                sh.save()
            }

            sh.id_produtos = sh.id_produtos + ', ' + product.id
            sh.save()

            if (product) return res.json({ status: `Você acaba de criar um produto/serviço ${encoded.nome} foi criado!` })

            return res.status(400).json({ erro: 'Erro ao criar o produto!' })
        } catch(erro) {
            return res.status(400).json({ erro: 'Erro no banco!' })
        }
    } 
}