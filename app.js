const Koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const static = require("koa-static")
const views = require('koa-views')
const koaBody = require('koa-body')

const userRouter = require('./router/user')
const bookmarkRouter = require('./router/bookmark')

const app = new Koa()

const router = new Router()

// const bodyparser = require('koa-bodyparser')
// app.use(bodyparser())
app.use(static(
    path.join(__dirname, 'public')
))

app.use(views(path.resolve(__dirname, 'views'),{
    extension: 'pug'
}))

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, 'upload'),
        keepExtensions: true,
        // onFileBegin: (name, file) => {
        //     console.log(file)
        //     console.log(name)
        //     重新覆盖 file.path 属性
        //     let filename = Math.round(new Date().getTime()).toString()
        //     file.path = path.join(__dirname, `upload/${filename}.html`)
        // },
        // onError: (err) => {
        //     console.log(err);
        // }
    }
}))

router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/bookmark', bookmarkRouter.routes(), bookmarkRouter.allowedMethods())

app.use(router.routes(), router.allowedMethods())

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})