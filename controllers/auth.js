const co = require('co')
const passport = require('koa-passport')
const mongoose = require('mongoose')
const Basic = require('passport-http').BasicStrategy
const User = mongoose.model('User')

//passport.serializeUser((user, done) => done(null, user._id))
//passport.deserializeUser((id, done) => User.findById(id, done))

function auth(username, password, done) {
  co(function* () {
    try {
      var user = yield User.findOne({username:username}).exec()
      var user = user.verifyPassword(username, password)
      console.log(JSON.stringify(user))
      if (!user) done(null, false)
      done(null, user)
    } catch(e) {
      console.log('ERORORR' + e)
      done(null, false)
    }
  })
}

passport.use(new Basic(auth))
exports.authenticate = passport.authenticate('basic', {session: false})