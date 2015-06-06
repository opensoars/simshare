var app = {};

app.modules = {
  express: require('express')
};


app.server = express();

app.text_data = '';

app.server.use(express.static(__dirname + '/public'));

app.server.post('/text_data', function (req, res){
  var body = '';

  req.on('data', function (chunk){
    body += chunk;
  });

  req.on('end',  function (){
    app.text_data = body;
  });
});

app.server.get('/text_data', function (req, res){
  res.write(text_data);
  res.end();
});

app.server.listen(3333);