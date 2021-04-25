const mysql = require('mysql')

var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'Product_DB',
  multipleStatements: true
})

module.exports.connection = connection;