
//routes
require('./routes/memberRoutes');
require('./routes/adminRoutes');

var express = require('express');
//express().listen(3000);

var mongoose = require('mongoose');

//Mongoose connection
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Devack');


var adminkey =  'jshfiaohyfsoinqwlk23lj4g3u224d'
//Encoder Signature for JSON Web Token
module.exports.keys = {
  Encoder : 'RESTFULAPI',
  adminkey : adminkey
}
var express = require('express')
var bodyParser = require('body-parser');
var ctr = require('./ctrls/adminCtrls').admin;
var fileUpload = require('express-fileupload');

var app = express();

app.post('/registerMember',jsonParser,(req,res) => {
  console.log('hello World')
  ctr.registerMember(req,res);
})

app.listen(3000)