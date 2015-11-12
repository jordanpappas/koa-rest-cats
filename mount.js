var koa = require('koa')
var mount = require('koa-mount')
var router = require('koa-router')()
var api = require('./index.js')
var app = koa()

router.get('/', function*(next) {
  this.body = 'home base'
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(mount(api))
app.listen(3000)
