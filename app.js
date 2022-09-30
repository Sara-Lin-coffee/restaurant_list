const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantDataBase = require('./restaurant.json')

//設定模板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//設定靜態網站資料夾
app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.render('index', {restaurant: restaurantDataBase.results})
})

//啟動&監聽server
app.listen(port, () => {
   console.log(`Express is running on http://localhost:${port}`)
  })