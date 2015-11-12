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

mongoose.model('User', User)