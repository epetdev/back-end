const usuario = require('../models/usuario')
const loja = require('../models/loja')
const categoria = require('../models/categoria')
const axios = require('axios')
const authConfig = require('../../../config/auth.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(params = {}) {
    const token = jwt.sign(params, authConfig.secret, { expiresIn: 86400, })

    return token
}

module.exports = {
    async store(req, res) {
        const user = req.body, { cpf, email, senha } = req.body

        if (await usuario.findOne({ where: { email }})) return res.status(400).json({ erro: 'Ops, este e-mail já está registrado!' })
        if (senha.length < 8) return res.status(400).json({ erro: 'Sua senha deve conter pelo menos 8 caracteres!' })
        if (await usuario.findOne({ where: { cpf } })) return res.status(400).json({ erro: 'Ops, este cpf já está registrado!' })

        axios.get('https://api.cpfcnpj.com.br/5ae973d7a997af13f0aaf2bf60e65803/9/' + cpf)
            .then(async (response) => {
                if (response.data.status == 1) {
                    try {
                        const result = await usuario.create(user)

                        return res.json({ result, token: generateToken({ usuario: result }) })
                    } catch(erro) {
                        console.log(erro)
                    }
                } else {
                    return res.status(400).json({ erro: 'Ops, este cpf é inválido!' })
                }
            })
            .catch((erro) => {
                return res.status(400).json({ erro })
            })
    },
    async storeLoja(req, res) {
        const { nome, email, celular, endereco, cpf, senha, status_comercial, nome_loja, celular_loja, cnpj, endereco_loja, id_categorias } = req.body
        const shop = { nome: nome_loja, responsavel: nome, cnpj, endereco: endereco_loja, celular: celular_loja, id_categorias }

        const split = id_categorias.split(', ')

        if (await usuario.findOne({ where: { email }})) return res.status(400).json({ erro: 'Ops, este e-mail já está registrado!' })
        if (senha.length < 8) return res.status(400).json({ erro: 'Sua senha deve conter pelo menos 8 caracteres!' })
        if (await usuario.findOne({ where: { cpf } })) return res.status(400).json({ erro: 'Ops, este cpf já está registrado!' })
        if (await loja.findOne({ where: { cnpj } })) return res.status(400).json({ erro: 'Esta empresa ja foi registrada anteriormente!' })

        for (var n = 0; n < split.length; n++) {
            if (await categoria.findOne({ where: { id: split[n] } }) == null) return res.status(400).json({ erro: 'Essa categoria não existe!' })
        }

        axios.get('https://api.cpfcnpj.com.br/5ae973d7a997af13f0aaf2bf60e65803/9/' + cpf)
            .then(async (response) => {
                if (response.data.status == 1) {
                    axios.get('https://www.receitaws.com.br/v1/cnpj/' + cnpj)
                        .then(async (response) => {
                            if (response.data.status == 'ERROR') {
                                return res.status(400).json({ erro: 'Ops, este cnpj é inválido!' })
                            } else {
                                try {
                                    const resultLoja = await loja.create(shop)
                                    const query = await loja.findOne({ cnpj })
                                    const user = { nome, email, celular, endereco, cpf, senha, status_comercial, id_loja: query.id }
                                    const result = await usuario.create(user)
            
                                    return res.json({
                                        result,
                                        resultLoja,
                                        token: generateToken({ usuario: result, loja: resultLoja })
                                    })
                                } catch(erro) {
                                    console.log(erro)
                                }
                            }
                        })
                        .catch((erro) => {
                            return res.json(erro)
                        })
                } else {
                    return res.status(400).json({ erro: 'Ops, este cpf é inválido!' })
                }
            })
            .catch((erro) => {
                return res.status(400).json({ erro })
            })
    },
    async authenticate(req, res) {
        const { email, senha } = req.body

        const user = await usuario.findOne({ where: { email } })

	if (user == null) return res.status(400).json({ erro: 'Usuario nao encontrado!' })
        if (!await bcrypt.compare(senha, user.senha)) return res.status(400).json({ erro: 'Senha invalida!' })
       
        user.senha = undefined

        if (user.id_loja == null) {
            return res.json({ user, token: generateToken({ usuario: user }) })   
        } else {
            const shop = await loja.findOne({ where: { id: user.id_loja } })

            if (shop == null) return res.status(400).json({ erro: 'Erro ao buscar a loja!' })

            return res.json({ user, shop, token: generateToken({ usuario: user, loja: shop }) })
        }       
    }
}