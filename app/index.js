const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const routing = require('./routes')
const port = 3000

app.use(bodyparser())
routing(app)

app.listen(port, () => console.log(`程序启动在${port}端口`))
