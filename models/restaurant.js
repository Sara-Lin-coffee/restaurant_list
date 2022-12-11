const { link } = require('fs')
const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  item: {
    type: Object,
    properties: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      name_en: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      google_map: {
        type: String,
        required: true
      },
      rating: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)