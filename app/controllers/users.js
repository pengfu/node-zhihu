const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

class UserController {
  async find(ctx) {
    // 设置响应头
    // ctx.set('Allow', 'GET,POST')
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
    })
    const { name } = ctx.request.body
    const repeatedUser = await Users.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, 'user already exists')
    }

    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { required: true, type: 'string' },
      // age: { required: false, type: 'number' },
    })

    const user = await User.findByIdAndUpdate(
      ctx.request.params.id,
      ctx.request.body
    )
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(
      ctx.request.params.id,
      ctx.request.body
    )
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, 'username or password invalid')
    }
    //login success  generate & return token
    const token = jwt.sign({ name: user.name, _id: user._id }, secret, {
      expiresIn: '1d',
    })
    ctx.body = { token }
  }
}
module.exports = new UserController()
