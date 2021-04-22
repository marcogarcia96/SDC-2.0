const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const urlExistSync = require("url-exist-sync");


var instream = fs.createReadStream('./database/dirtydata/product.csv')
var outstream = fs.createWriteStream('./database/cleandata/cleanproduct.csv')
var rl = readline.createInterface({input: instream, output: outstream});

var count = 0;
rl.on('line', (line)=>{
  var array = line.match(/(?:[^,"]+|"[^"]*")+/g)
  if(isNaN(parseInt(array[5])) ){
    var number = array[5].match(/[0-9]+/g);
    if(number === null){

    }else{
     array[5] = number[0]

    }
  }

    line = array.join(',');
  rl.output.write(line + '\n');
}).on('close',()=>{
  console.log('done' )
})
