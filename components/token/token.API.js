const express = require('express')
const { login, checkTokenApi, getPublicKey } = require('./controllers')

const router = express.Router()

router.post('/token/check', checkTokenApi)
router.post('/token/login', login)
router.post('/token/get-public-key', getPublicKey)

module.exports = router
