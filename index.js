const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello world1111';
})

app.listen(3000)