var mongoose = require('mongoose')

var Cat = new mongoose.Schema({
  name: String,
  type: String,
  age: Number
})

mongoose.model('Cat', Cat)