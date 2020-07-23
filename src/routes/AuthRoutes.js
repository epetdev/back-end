const express = require('express')
const auth = require('../app/controllers/auth')
const router = express.Router()

router.post('/registro', auth.store)
router.post('/registro-loja', auth.storeLoja)
router.post('/verificar', auth.authenticate)

module.exports = app => app.use('/auth', router)