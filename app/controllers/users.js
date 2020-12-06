const db = [{ name: '李磊' }]

class UserController {
  find(ctx) {
    // 设置响应头
    // ctx.set('Allow', 'GET,POST')
    ctx.body = db
  }
  findById(ctx) {
    //   ctx.body = `这是用户${ctx.params.id}`
    ctx.body = db[ctx.request.params.id * 1]
  }
  create(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  update(ctx) {
    db[ctx.request.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }
  delete(ctx) {
    db.splice(ctx.request.params.id, 1)
    ctx.status = 204
  }
}
module.exports = new UserController()
