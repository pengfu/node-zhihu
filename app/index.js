const Koa = require('koa')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')

const path = require('path')

const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const app = new Koa()
const routing = require('./routes')
const port = 3000
const { connectionStr } = require('./config')

mongoose.connect(connectionStr, { useUnifiedTopology: true }, () =>
  console.log('mongodb 连接成功了')
)
mongoose.connection.on('error', console.error)

app.use(koaStatic(path.join(__dirname,'public')))


app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  })
)
// app.use(bodyparser())
app.use(
  koaBody({
    multipart: true, // support file
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'), //上传文件保存路径
      keepExtensions: true, //保留文件扩展名
    },
  })
)

app.use(parameter(app))
routing(app)

app.listen(port, () => console.log(`程序启动在${port}端口`))
