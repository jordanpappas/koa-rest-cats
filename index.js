const
   co       = require('co')
 , koa      = require('koa')
 , parse    = require('co-body')
 , Router   = require('koa-router')
 , mongoose = require('mongoose')
 , app      = module.exports = koa()

// load models
require('./models/')
const Cat = mongoose.model('Cat')
const User = mongoose.model('User')

// load controllers
const controllers = {}
controllers.cat = require('./controllers/cat')
controllers.user = require('./controllers/user')
controllers.auth = require('./controllers/auth')

// db setup
mongoose.connect('localhost/cats')
mongoose.connection.on('error', function(err) {
  console.log(err)
})

// api
const router = new Router({ prefix: '/api' })

router.get('/', controllers.auth.authenticate, controllers.cat.meow)
router.post('/cats', controllers.cat.createCat)
router.get('/cats', controllers.cat.getCats)
router.get('/cats/:id', controllers.cat.getCat)
router.put('/cats/:id', controllers.cat.birthday)
router.delete('/cats/:id', controllers.cat.deleteCat)
router.get('/cats/clear', controllers.cat.clearCats)

router.get('/users', controllers.user.getUsers)
router.post('/users', controllers.user.createUser)

app.use(router.routes())
app.use(router.allowedMethods())
if (!module.parent) app.listen(3000)