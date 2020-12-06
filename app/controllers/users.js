const db = [{ name: '李磊' }]

class UserController {
  find(ctx) {
    // 设置响应头
    // ctx.set('Allow', 'GET,POST')
    ctx.body = db
  }
  findById(ctx) {
    //   ctx.body = `这是用户${ctx.params.id}`
    if (ctx.params.id * 1 > db.length) {
      ctx.throw(412)
    }
    ctx.body = db[ctx.request.params.id * 1]
  }
  create(ctx) {
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      age: { required: false, type: 'number' },
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  update(ctx) {
    if (ctx.params.id * 1 > db.length) {
      ctx.throw(412)
    }
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      age: { required: false, type: 'number' },
    })
    db[ctx.request.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }
  delete(ctx) {
    if (ctx.params.id * 1 > db.length) {
      ctx.throw(412)
    }
    db.splice(ctx.request.params.id, 1)
    ctx.status = 204
  }
}
module.exports = new UserController()
