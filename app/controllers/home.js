const path = require('path')

class HomeController {
  index(ctx) {
    ctx.body = '<h1>这是主页</h1>'
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const filePath = path.basename(file.path);
    const url = `${ctx.origin}/uploads/${filePath}`
    ctx.body = { path: url }
  }
}
module.exports = new HomeController()
