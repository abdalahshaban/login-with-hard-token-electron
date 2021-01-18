const login = require('./token.login')
const checkTokenApi = require('./token.check.if.inserted')
const getPublicKey = require('./token.send.publicKey')
const checkCer = require('./token.check.cer')

module.exports = {
  login,
  checkTokenApi,
  getPublicKey,
  checkCer
}
