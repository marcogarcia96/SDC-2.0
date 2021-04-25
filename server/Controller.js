const DB =  require('./connectiondb.js')

module.exports = {
  Products: (req,res)=>{
    var  numberOfdata = req.query.count || 5;
  var startingPoint = 0;
  if(req.query.page !== undefined  ){
    startingPoint = (numberOfdata * req.query.page) - numberOfdata ;
  }
  DB.connection.query(`select * from Product limit ${startingPoint},${numberOfdata};`, (err, data) => {

    if(err){
      res.sendStatus(404);
    }else {
      res.send(data)
    }
  })

  },
  Product:(req,res)=>{
    const products = new Promise((resolve, reject) => {
      DB.connection.query(`select * from Product where product_id = ${req.params.product_id}`,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })

    const feat = new Promise((resolve, reject) => {
      DB.connection.query(`select feature, value from Features where product_id = ${req.params.product_id}`,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })

    products.then((data) => {
      feat.then((feature)=>{
    var feat =  Object.values(JSON.parse(JSON.stringify(feature)))
    var da = Object.values(JSON.parse(JSON.stringify(data)))
    da[0].features = feat
      res.send(da)
    })
  })

  } ,
  Related:(req,res)=>{DB.connection.query(`select related_id from related_product where product_id = ${req.params.product_id}`,(err,data)=>{
    if(err){
      res.sendStatus(404);
    } else {
      var array = []
      for(var i = 0; i < data.length; i++){
        array.push(data[i].related_id)
      }
      res.send(array)
    }
  })} ,
  Styles:(req,res)=>{




  }
}