const login = require('./token.login')
const checkTokenApi = require('./token.check.if.inserted')
const getPublicKey = require('./token.send.publicKey')

module.exports = {
  login,
  checkTokenApi,
  getPublicKey
}
