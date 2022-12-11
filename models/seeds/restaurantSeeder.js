const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantDataBase = require('./restaurant.json')

//到.env抓MongoDB帳密
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//連結到MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')

  for (let i = 0; i < 8; i++) {
    Restaurant.create({ item: `${restaurantDataBase.results}` })
  }
  console.log('done')
})



