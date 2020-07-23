const jwt = require('jsonwebtoken')
const authConfig = require('../../../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
	console.log('isso aqui = ' + authHeader)
	return res.status(401).send({ erro: 'Token não informado!'})
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) return res.status(401).send({ erro: 'Erro no Token!'})

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ erro: 'Formato do Token errado!'})

    jwt.verify(token, authConfig.secret, (erro, decoded) => {
        if (erro) return res.status(401).send({ erro: 'Token invalido!' })

        req.usuario = decoded.usuario
        req.loja = decoded.loja
        return next()
    })
}