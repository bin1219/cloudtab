const Router = require('koa-router')

const { addTab, deleteOne, getAll, upload, download } = require('./controllers')

const bookmark = new Router()
//req uid name url
//res html msg
bookmark.get('/addtab', addTab)
bookmark.get('/deleteone', deleteOne)
bookmark.get('/getall', getAll)
bookmark.post('/upload', upload)
bookmark.get('/download', download)

module.exports = bookmark