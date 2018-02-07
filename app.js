var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var db_connect = require('./lib/db_connect')();

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.listen(app.get('port'), function(err) {
  if (!err) {
    console.log('server started at port 3000');
  }
});
