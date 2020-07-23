const usuario = require('../models/usuario')
const shop = require('../models/loja')

module.exports = {
    async index(req, res) {
        const decod = req.usuario
        const { email } = decod

        try {
            const user = await usuario.findOne({ where: { email } })
            
            if (user == null) return res.status(400).json({ erro: 'Dados do usuario não encontrados!' })

            user.senha = undefined
            user.senhaResetToken = undefined
            user.senhaResetExpires = undefined

            if (user.id_loja != null) {
                const loja = await shop.findOne({ where: { id: user.id_loja } })

                return res.json({ user, loja })
            }
            
            return res.json({ user })
        } catch(erro) {
            return res.status(400).json({ erro: 'Erro ao autenticar!' })
        }
    }
}

