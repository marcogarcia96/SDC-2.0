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
    const styles = new Promise((resolve, reject) => {
      DB.connection.query(`select * from Styles where product_id = ${req.params.product_id}`,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })
    const photo = new Promise((resolve, reject) => {
      DB.connection.query(`select * from Photo where style_id in (select style_id from Styles where product_id = ${req.params.product_id});`,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })
    const skus = new Promise((resolve, reject) => {
      DB.connection.query(`select * from Skus where style_id in (select style_id from Styles where product_id = ${req.params.product_id});`,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })



    styles.then((styl)=>{
      photo.then((pho)=>{
        skus.then((sk)=>{
          var Allskus = Object.values(JSON.parse(JSON.stringify(sk)))
          var Allphotos = Object.values(JSON.parse(JSON.stringify(pho)))
          var Allstyles = Object.values(JSON.parse(JSON.stringify(styl)))


          Allstyles.forEach((obj,i)=>{
            if(obj.default_style.data[0] === 48){
              obj.default_style = false;
            } else {
              obj.default_style = true;
            }

            var arrayofphotos = [];
            var objofskus = {};

            for(var i = 0; i < Allphotos.length; ){
              if(Allphotos[i].style_id === obj.style_id){
                var hold = Allphotos.splice(i,1)
                delete hold[0].photo_id
                delete hold[0].style_id
                arrayofphotos.push(hold[0])
              }else{
                i++
              }
            }

            for(var i = 0; i < Allskus.length; i++ ){
              if(Allskus[i].style_id === obj.style_id){

            }
            }

            delete obj.product_id
            obj.photos = arrayofphotos
            // obj.skus = arrayofskus

          })

          var obj = {
            product_id: req.params.product_id,
            results: Allstyles
          }

          res.send(obj)
        })
      })
    })


  }
}