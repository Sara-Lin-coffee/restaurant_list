const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

//設定模板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

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

//
app.get('/restaurants/:id', (req, res) =>{
  const dataBaseID = restaurantDataBase.results.filter( dataBase => dataBase.id === Number(req.params.id))
  res.render('show', {restaurant: dataBaseID[0]})
})

app.get('/search', (req, res) =>{
  const dataBaseID = restaurantDataBase.results.filter( restaurant => restaurant.name.toLowerCase().includes(`${req.query.keyword.toLowerCase()}`))
  res.render('index', { restaurant: dataBaseID, value: req.query.keyword})
 })

//啟動&監聽server
app.listen(port, () => {
   console.log(`Express is running on http://localhost:${port}`)
  })