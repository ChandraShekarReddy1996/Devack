var express = require('express')
var bodyParser = require('body-parser');
var ctr = require('../ctrls/adminCtrls').admin;
var fileUpload = require('express-fileupload');

var app = express();
var jsonParser = bodyParser.json();

app.post('/registerMember',jsonParser,(req,res) => {
  console.log('hello World')
  ctr.registerMember(req,res);
})

app.post('/addDevices',jsonParser,(req,res) => {
  ctr.addDevices(req,res);
})

app.post('/allocateDevice',jsonParser,(req,res) => {
  ctr.allocateDevice(req,res);
})


app.post('/removeDevice',jsonParser,(req,res) => {
  ctr.removeDevice(req,res);
})


app.post('/removemember',jsonParser,(req,res) => {
  ctr.removemember(req,res);
})

app.listen(3000)
