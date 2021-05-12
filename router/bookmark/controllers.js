
const fs = require('fs')
const htmlToJson = require('../../utils/htmlToJson')

const accountModel = require('../../model/account')

const addTab = async function (ctx, next) {
    let { uid, name, url } = ctx.query
    let data = { uid, name, url }
    accountModel.accountAddTab(data)
    ctx.body = {
        uid,
        name,
        url
    }
}

const deleteOne = async (ctx, next) => {
    let uid = ctx.cookies.get('uid')
    let urlID = ctx.query.id
    let data = { uid, urlID }
    accountModel.accountDeleteTab(data)
    ctx.body = {
        code: 1
    }
}

const getAll = async (ctx, next) => {
    let { uid } = ctx.query
    ctx.cookies.set('uid', uid)
    let { tmpTab, allTab } = await accountModel.accountGetAllTab({ uid })
    await ctx.render('index', {
        uid,
        tmpTab: tmpTab,
        allTab: allTab
    })
}

const upload = async (ctx, next) => {
    const file = await ctx.request.files.html //input name为html
    let uid = ctx.cookies.get('uid')
    let time = Math.round(new Date().getTime()).toString()
    let filePath = `${process.cwd()}/upload/${time}.html`
    await saveFile(file.path, filePath)
    fs.unlinkSync(file.path)
    tabpath = `${time}.html`
    let data = { uid, tabpath }
    accountModel.accountAddFile(data)
    let resJson = htmlToJson(filePath)
    accountModel.accountUpdateBookmark({uid,resJson})
    ctx.body = { allTab: resJson }
}

const download = async (ctx, next) => {
    let uid = ctx.cookies.get('uid')
    let lastBookmark = await accountModel.accountGetLastBookmark({uid})
    ctx.set({
        'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
        'Content-Disposition': 'attachment; filename=bookmark.html', //告诉浏览器这是一个需要下载的文件  
    })
    let file = fs.readFileSync(`${process.cwd()}/upload/${lastBookmark}`)
    ctx.body = file
}

module.exports = {
    addTab,
    deleteOne,
    getAll,
    upload,
    download
}

// function
const saveFile = (file, path) => {
    return new Promise((resolve, reject) => {
        let fileReader = fs.createReadStream(file) //创建读取文件流
        let writeStream = fs.createWriteStream(path) //创建写入文件流
        fileReader.pipe(writeStream)
        writeStream.on('finish', () => {
            resolve(path)
        })
        writeStream.on('error', (err) => {
            reject(err)
        })
    })
}