const express = require('express')
const { login, checkToken } = require('./controllers')

const router = express.Router()

router.post('/token/login', login)
router.get('/token/check', checkToken)

module.exports = router
