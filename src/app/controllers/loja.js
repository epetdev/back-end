const shop = require('../models/loja')

module.exports = {
    async show(req, res) {
        try {
            const loja = await shop.findAll()

            return res.json(loja)
        } catch(erro) {
            return res.status(400).json({ erro: 'Erro ao encontrar as lojas!' })
        }
    },
    async showMore(req, res) {
        try {
            const { id } = req.params
            const loja = await shop.findOne({ where: { id } })

            if (loja) {
                return res.json(loja)
            }

            return res.status(400).json({ erro: 'Loja não encontrada!' })
        } catch(erro) {
            return res.status(400).json({ erro: 'Erro ao conectar ao banco!' })
        }
    }
}