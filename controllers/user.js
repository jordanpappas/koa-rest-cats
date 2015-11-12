const mongoose = require('mongoose')
const parse = require('co-body')
const User = mongoose.model('User')

exports.createUser = function* (next) {
  var body = yield parse(this)
  var user = new User({
    username: body.username,
    password: body.password
  })

  yield user.save()
  this.body = {msg: 'New user added'}
}

exports.getUsers = function* (next) {
  this.body = yield User.find()
}