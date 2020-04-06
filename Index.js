//Node.JS dependecies
const express = require('express');
const app = express();
const logger = require('./public/logger.js')
const body_parser = require('body-parser');
const hbs = require('express-handlebars');
//const hbs_helpers = require('./views/helpers/handerbars.js')
const members = require('./public/members.js');
const path = require('path')
const url = "mongodb://localhost:27017/mydb";
const mongo = require('mongodb').MongoClient({useUnifiedTopology: true});
const jwt = require('jsonwebtoken');
const mysql = require('mysql');



//express config and middleware
app.engine('handlebars', hbs({
  extname: 'handlebars',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  defaultLayout: 'main'
  }));
app.set('view engine', 'handlebars');
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
//app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '/public')));

//routes list
app.get('/', require('./routes/home'));
app.get('/dash', require('./routes/dash'));
app.use('/login', require('./routes/login'));
app.post('/login', require('./routes/login'));

app.get('/trade', require('./routes/trade/dash'));
app.get('/trade/order/:order', require('./routes/trade/dash'));
app.get('/trade/releasing', require('./routes/trade/releasing'));
app.use('/api/members', require('./routes/api/members'));
app.post('/pulldata', require('./routes/api/dashview'));
app.post('/pushdata', require('./routes/api/members'));
app.get('/reporting', require('./routes/reportin'));
app.get('/tree', require('./routes/reportin'));

const PORT = process.env.port || 5000;
app.listen(PORT, function() {
  console.log(`listening at ${PORT}`);
});
