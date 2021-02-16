const express = require('express');
const path = require('path');
var fs = require('fs');
var cors = require("cors");
var outputfilespath = path.join(__dirname,'..');


function getLatestFile(outputfilespath) {
  let latest;
  const files = fs.readdirSync(outputfilespath);
  console.log(files)
  files.forEach(filename => {
    const stat = fs.lstatSync(path.join(outputfilespath, filename));
    if (stat.isDirectory())
      return;
    if (!latest) {
      latest = {filename, mtime: stat.mtime};
      return;
    }
    if (stat.mtime > latest.mtime) {
      latest.filename = filename;
      latest.mtime = stat.mtime;
    }
  });

  return latest.filename;
}


const app = express();
app.use(cors());
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/get',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','03-29-2019.html'));
})



app.get('/show', (req, res)=>{

  var file =  getLatestFile(outputfilespath);
  console.log(file);
  res.sendFile(path.join(outputfilespath,file));
});

app.listen(9000,()=>{

});
