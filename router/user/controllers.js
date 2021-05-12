const accountModel = require('../../model/account')

const rename = async (ctx, next) => {
    console.log(ctx)
    ctx.body = {

    }
}

const newname = async (ctx, next) => {
    let uid = Math.round(new Date().getTime()).toString()
    let { email, pwd } = ctx.query
    let data = { uid, email, pwd }
    accountModel.accountNewUser(data)
    ctx.body = {
        uid
    }
}

module.exports = {
    rename,
    newname
}
