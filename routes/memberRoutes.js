var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var ctr = require('../controllers').members;
var fileUpload = require('express-fileupload');
var jsonParser = bodyParser.json();

app.use(fileUpload())
app.use(bodyParser.json({ type : 'application/*+json'}))

app.post('/memberLogin' , jsonParser,(req,res) => {
  ctr.memberLogin(req.body,res);
})

app.post('/getmembers',jsonParser,(req,res) => {
  ctr.getMembers(req,res)
})

app.post('/getPhotos',jsonParser,(req,res) => {
  ctr.getPhotos(req,res)
})

app.post('/sendPhoto',jsonParser,(req,res) => {
  ctr.sendPhoto(req,res)
})

app.post('/removePhoto',jsonParser,(req,res) => {
  ctr.removePhoto(req,res)
})

app.post('/updateInfo',jsonParser,(req,res) => {
  ctr.updateProfile(req,res)
})

app.post('/sendRequest',jsonParser,(req,res) => {
  ctr.sendRequest(req,res)
})

app.post('/acceptRequest',jsonParser,(req,res) => {
  ctr.acceptRequest(req,res)
})

app.post('/discardRequest',jsonParser,(req,res) => {
  ctr.discardRequest(req,res)
})

app.listen(3001)
