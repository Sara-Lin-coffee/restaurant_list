const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

const app = express()
const port = 3000

//設定模板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

//載入.env MongDB帳密
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//連接MongDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


//呼叫根目錄
app.get('/', (req, res) =>{
  Restaurant.find()
    .lean()
    .then((restaurant) => {
      res.render('index', { restaurant : restaurant })
    })
    .catch( error => console.log('error'))
})

//render detail info. for each restaurant
app.get('/restaurants/:id', (req, res) =>{
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurant) => {res.render('show', {restaurant})})
})

//render edit page for each restaurant
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => { res.render('edit', { restaurant }) })
})

app.get('/search', (req, res) =>{
  Restaurant.find()
  .lean()
  .then((allRestaurant) =>{
    return allRestaurant.filter(restaurant => restaurant.item.name.toLowerCase().includes(`${req.query.keyword.toLowerCase()}`))
  } )
    .then((restaurant)=>{
      res.render('index', {restaurant, value : req.query.keyword})
    })
 })

//啟動&監聽server
app.listen(port, () => {
   console.log(`Express is running on http://localhost:${port}`)
  })