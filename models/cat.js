var mongoose = require('mongoose')

var Cat = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
  ownder: String
})

mongoose.model('Cat', Cat)
