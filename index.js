var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var pg = require('pg');
//var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGOHQ_URL);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/db', function (request, response) {
  pg.connect(process.env.MONGOHQ_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
});

app.get('/', function(request, response) {
  var result = '';
  var test = process.env.MONGOHQ_URL;

  var times = process.env.TIMES || 100
  for (i=0; i < times; i++)
    result += cool();
  response.send(test);
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
