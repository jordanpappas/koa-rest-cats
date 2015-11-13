const mongoose = require('mongoose')
const bcrypt = require('co-bcrypt')
const co = require('co')

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

User.pre('save', function(done) {
  if (!this.isModified('password')) {
    return done()
  }

  co.wrap(function* () {
    try {
      var salt = yield bcrypt.genSalt(5)
      var hash = yield bcrypt.hash(this.password, salt)
      this.password = hash
      done()
    } catch(e) {
      done(e)
    }
  }).call(this).then(done)
})

User.methods.verifyPassword = function* (username, password) {
  var User = mongoose.model('User')
  var user = yield User.findOne({ username: username }).exec()
  if (!user) return false
  return yield bcrypt.compare(password, this.password)
}

mongoose.model('User', User)