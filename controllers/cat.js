const mongoose = require('mongoose')
const parse = require('co-body')
const Cat = mongoose.model('Cat')

exports.meow = function* (next) {
  this.body = { msg: 'welcome all cats' }
}

exports.createCat = function* (next) {
  var body = yield parse(this)
  var cat = new Cat()
  cat.name = body.name
  cat.type = body.type
  cat.age = body.age
  yield cat.save()
  this.body = { msg: 'Kitty added', data: cat }
}

exports.getCats = function* (next) {
  this.body = yield Cat.find()
}

exports.getCat = function* (next) {
  try {
    var cat = yield Cat.findOne({_id:this.params.id}).exec()
  } catch(e) {
    this.throw(404, 'Cat not found')
  }

  this.body = cat
}

exports.birthday = function* (next) {
  try {
    var cat = yield Cat.findOne({_id:this.params.id}).exec()
  } catch(e) { 
    this.throw(404, 'Cat not found')
  }

  cat.age += 1
  yield cat.save()
  this.body = { msg: 'Kitty had a birthday', data: cat }
}

exports.deleteCat = function* (next) {
  try {
    yield Cat.remove({_id:this.params.id})
  } catch(e) {
    this.throw(404, 'There was an error')
  }
  this.body = { msg: `killed cat ${this.params.id}` }
}

exports.clearCats = function* (next) {
  yield Cat.remove({})
  this.body = {msg: 'killed cats'}
}