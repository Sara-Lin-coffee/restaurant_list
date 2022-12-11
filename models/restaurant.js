const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)