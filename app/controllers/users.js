const User = require('../models/user')

class UserController {
  async find(ctx) {
    // 设置响应头
    // ctx.set('Allow', 'GET,POST')
    // ctx.body = db
    ctx.body = await User.find()
  }
  async findById(ctx) {
    //   ctx.body = `这是用户${ctx.params.id}`
    // if (ctx.params.id * 1 > db.length) {
    //   ctx.throw(412)
    // }
    // ctx.body = db[ctx.request.params.id * 1]
    const user = await User.findById(ctx.params.id)
    if(!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      // age: { required: false, type: 'number' },
    })
    // db.push(ctx.request.body)
    // ctx.body = ctx.request.body
    const user = await new User(ctx.request.body).save()
    ctx.body = user;

  }
  async update(ctx) {
    // if (ctx.params.id * 1 > db.length) {
    //   ctx.throw(412)
    // }
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      // age: { required: false, type: 'number' },
    })
    // db[ctx.request.params.id * 1] = ctx.request.body
    // ctx.body = ctx.request.body
    const user = await User.findByIdAndUpdate(ctx.request.params.id, ctx.request.body)
    if(!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async delete(ctx) {
    // if (ctx.params.id * 1 > db.length) {
    //   ctx.throw(412)
    // }
    // db.splice(ctx.request.params.id, 1)
    // ctx.status = 204
    const user = await User.findByIdAndRemove(ctx.request.params.id, ctx.request.body)
    if(!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204  
  }
}
module.exports = new UserController()
