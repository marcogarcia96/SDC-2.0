const express = require('express')
const app = express()
const port = 3000
const Controller = require('./Controller.js')

app.get('/',(req,res)=>{
  res.send('welcome to Server Side Set up')
})

app.get('/products', Controller.Products)

app.get(`/products/:product_id`,Controller.Product)

app.get(`/products/:product_id/related`, Controller.Related)

app.get(`/products/:product_id/styles`, Controller.Styles)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})