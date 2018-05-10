
//routes
require('./routes/memberRoutes');
require('./routes/adminRoutes');

var express = require('express');
//express().listen(3000);

var mongoose = require('mongoose');

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Devack');
console.log('Mongoose is Sucessfully connected');

var adminkey =  'jshfiaohyfsoinqwlk23lj4g3u224d'
//Encoder Signature for JSON Web Token
module.exports.keys = {
  Encoder : 'RESTFULAPI',
  adminkey : adminkey
}
