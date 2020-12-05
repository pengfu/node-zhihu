const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    ctx.body = 'hello world1111';
})

app.use(ctx => {
    console.log(1)
})

app.listen(3000)