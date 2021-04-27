const mysql = require('mysql2')

var connection = mysql.createPool({
  host:'database',
  user: 'root',
  database: 'Product_DB',
  multipleStatements: true
})

// connection.connect((err)=>{
// if(err){
//   console.log(err)
// }else {
//   console.log('Connected to the MySQL server.')
// }

// });

module.exports.connection = connection;