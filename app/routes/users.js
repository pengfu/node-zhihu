const Router = require('koa-router')
const router = new Router({ prefix: '/users' })


const db = [{ name: '李磊' }]

router.get('/', (ctx) => {
  // 设置响应头
  // ctx.set('Allow', 'GET,POST')
  ctx.body = db
})
router.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})
router.put('/:id', (ctx) => {
  db[ctx.request.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})
router.get('/:id', (ctx) => {
  //   ctx.body = `这是用户${ctx.params.id}`
  ctx.body = db[ctx.request.params.id * 1]
})
router.delete('/:id', (ctx) => {
  db.splice(ctx.request.params.id, 1)
  ctx.status = 204
})

module.exports = router
