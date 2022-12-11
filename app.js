const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantDataBase = require('./models/seeds/restaurant.json')

//設定模板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//設定靜態網站資料夾
app.use(express.static('public'))

//routing 
app.get('/', (req, res) =>{
  res.render('index', {restaurant: restaurantDataBase.results})
})

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