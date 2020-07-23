const express = require('express')
const authMiddleware = require('../app/middlewares/auth')
const usuario = require('../app/controllers/usuario')
const produto = require('../app/controllers/produto')
const loja = require('../app/controllers/loja')
const router = express.Router()

router.use(authMiddleware)

router.get('/minha-conta', usuario.index)
router.post('/minha-conta/produtos', produto.store)

router.get('/lojas', loja.show)
router.get('/lojas/:id', loja.showMore)

router.get('/lojas/:id/produtos', produto.index)
router.get('/lojas/:id/produtos/:id_produtos', produto.showMore)

module.exports = app => app.use('/', router)