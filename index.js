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

const db = [{ name: '李磊' }]

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})
userRouter.get('/', (ctx) => {
  // 设置响应头
  // ctx.set('Allow', 'GET,POST')
  ctx.body = db
})
userRouter.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})
userRouter.put('/:id', (ctx) => {
  db[ctx.request.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})
userRouter.get('/:id', (ctx) => {
  //   ctx.body = `这是用户${ctx.params.id}`
  ctx.body = db[ctx.request.params.id * 1]
})
userRouter.delete('/:id', (ctx) => {
  db.splice(ctx.request.params.id, 1)
  ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(userRouter.routes())
app.use(router.allowedMethods())
app.use(userRouter.allowedMethods())

app.listen(3000)
