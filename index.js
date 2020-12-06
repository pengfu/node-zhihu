const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const userRouter = new Router({ prefix: '/users' })

const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)
  }
  await next()
}
// app.use(async (ctx, next) => {
//     await next()
//     ctx.body = 'hello world1111';
// })

// app.use(ctx => {
//     console.log(1)
// })

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})
userRouter.get('/', (ctx) => {
  ctx.body = [{ name: '李磊111' }]
})
userRouter.post('/', (ctx) => {
  ctx.body = [{ name: '李磊' }]
})
userRouter.put('/', (ctx) => {
  ctx.body = [{ name: '李磊2' }]
})
userRouter.get('/:id', (ctx) => {
  ctx.body = `这是用户${ctx.params.id}`
})
userRouter.delete('/:id', (ctx) => {
  ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(userRouter.routes())
app.use(router.allowedMethods());
app.use(userRouter.allowedMethods());


app.listen(3000)
