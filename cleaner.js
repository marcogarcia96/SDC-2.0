const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const urlExistSync = require("url-exist-sync");


var instream = fs.createReadStream('./database//cleanphotos.csv')
var outstream = fs.createWriteStream('./database/cleandata/test.csv')
var rl = readline.createInterface({input: instream, output: outstream});

var count = 0;
rl.on('line', (line)=>{
  var array = line.match(/(?:[^,"]+|"[^"]*")+/g)
  if(isNaN(parseInt(array[0])) === true){
    console.log(array)
  }

  //   line = array.join(',');
  // rl.output.write(line + '\n');
}).on('close',()=>{
  console.log('done' )
})
