const mysql = require('mysql')

var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'Product_DB'
})

module.exports.connection = connection;