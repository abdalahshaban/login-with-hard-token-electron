const express = require('express')
const {
  login,
  checkTokenApi,
  getPublicKey,
  checkCer,
} = require('./controllers')

const router = express.Router()

router.post('/token/check', checkTokenApi)
router.post('/token/login', login)
router.post('/token/get-public-key', getPublicKey)
router.post('/token/check-cer', checkCer)

module.exports = router
