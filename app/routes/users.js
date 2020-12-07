const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const router = new Router({ prefix: '/users' })
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
} = require('../controllers/users')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jsonwebtoken.verify(token, secret)
    ctx.state.user = user
  } catch (e) {
    ctx.throw(401, e.message)
  }
  await next()
}

router.get('/', auth, find)
router.post('/', auth, create)
router.put('/:id', auth, update)
router.get('/:id', auth, findById)
router.delete('/:id', auth, del)
router.post('/login', login)

module.exports = router
