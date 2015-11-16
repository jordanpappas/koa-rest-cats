const co = require('co')
const mongoose = require('mongoose')
const passport = require('koa-passport')
const Basic = require('passport-http').BasicStrategy
const User = mongoose.model('User')

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => User.findById(id, done))

var auth = function (username, password, done) {
  co.wrap(function* () {
    try {
      var user = yield User.findOne({username:username}).exec()
      if(!user.verifyPassword(username, password)) {
        return false
      }
      return user
    } catch(e) {
      console.log(e)
      return false
    }
  }).call(this).then(user => done(null,user))
}

passport.use(new Basic(auth))

exports.secured = passport.authenticate('basic', {session: false})
exports.passport = passport