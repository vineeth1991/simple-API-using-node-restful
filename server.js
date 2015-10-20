/**
** Express App Package
**
*/
var express = require('express');

/**
** Cross Over Server Request Supprt
**
*/
var cors = require('cors');

/**
** BOdy Parser
**
*/
var bodyParser = require('body-parser');

/**
** Method Override
**
*/
var methodOverride = require('method-override');

/**
** Morgan
**
*/
var morgan = require('morgan');

/**
** Node RESTful Package
**
*/
var restful = require('node-restful');

/**
** MongoDB Package :: Derived by Restful Package
**
*/
var mongoose = restful.mongoose;

/**
** Express App Setup
**
*/
var app = express();
var env = process.env.NODE_ENV
app.get(env);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(cors());

/**
** MongoDB Setup
**
*/
mongoose.connect('mongodb://localhost/languages');

/**
** Creating MongoDB Schema and Model Object
**
*/
var Resource = app.resource = restful.model('language', mongoose.Schema({
    language : String,
    use: String,
    found: Number,
    in_use: Boolean,
    founder: String,
    field: Array
  }))
  .methods(['get', 'post', 'delete', 'put']);

/**
** Registering Express App to a directory
**
*/
Resource.register(app, '/languages');

/**
** Running Express App
**
*/
app.listen(8888);

/**
** Console Message
*/
console.log('API Server is running on port http://localhost:8888/languages');
