var express = require('express');
var app = express();

app.set('views',express.static(__dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


var pg = require('pg');



//database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var memberSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0 },
  email: String

});

var member = mongoose.model('member', memberSchema);
var test = new member ({
  name: { first: 'John', last: 'Doe'},
  age: 25
});

test.save(function (err) {if (err) console.log ('Error on save!')});
//database



app.get('/', function(request, response) {
  var test = process.env.MONGOHQ_URL;
  var times = process.env.TIMES
  response.send(test);
});

app.get('/about', function (req, res){
    res.render('about.html');
});

app.get('/project', function (req, res){
    res.render('project.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
