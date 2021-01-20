const login = require('./token.login')
const checkTokenApi = require('./token.check.if.inserted')
const getPublicKey = require('./token.send.publicKey')
const checkCer = require('./token.check.cer')
const getWeb3Address = require('./token.getWeb3Address')

module.exports = {
  login,
  checkTokenApi,
  getPublicKey,
  checkCer,
  getWeb3Address
}
