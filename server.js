const express = require('express'),
      port = process.env.PORT || 8080,
      app = express();

app.use(express.static(__dirname + '/dist/'));

app.get(/.*/,(req,res)=>{
  res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('server started');