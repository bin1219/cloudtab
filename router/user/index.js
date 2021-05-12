const Router = require('koa-router')
const { rename, newname } = require('./controllers')

const user = new Router()

user.get('/newname', newname)
//user.get('/rename', rename)

module.exports = user