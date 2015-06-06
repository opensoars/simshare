var express = require('express'),
    app = express();

var text_data = '';

app.use(express.static(__dirname + '/public'));

app.post('/text_data', function (req, res){
  var body = '';
  req.on('data', function (chunk){ body += chunk; });
  req.on('end',  function (){ text_data = body; });
});

app.get('/text_data', function (req, res){
  res.write(text_data);
  res.end();
});

app.listen(3333);