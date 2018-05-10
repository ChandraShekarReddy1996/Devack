var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var membersSchema = require('/home/chandra/Desktop/jugnoo/Project/models/server');
var ctr = require('/home/chandra/Desktop/jugnoo/Project/ctrls/memberCtrls')
var fileUpload = require('express-fileupload');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(fileUpload())
app.use(bodyParser.json({ type : 'application/*+json'}))


app.post('/registerMember',jsonParser,(req,res) => {
  var members = new membersSchema(req.body);
  members.validate((err) => {
    if(err)
    {
      res.status(400).send({message : err, status : '400' })
    }
    else{
      ctr.registerMember(req.body,res);
    }
  })
})


app.post('/getmembers',jsonParser,(req,res) => {
  ctr.getMembers(req.body,res)
})

app.post('/addPhotos',jsonParser,(req,res) => {
  ctr.addPhotos(req,res);
});

app.post('/getPhotos',jsonParser,(req,res) => {
  ctr.getPhotos(req.body,res)
})

app.post('/sendPhoto',jsonParser,(req,res) => {
  ctr.sendPhoto(req.body,res)
})

app.post('/removePhoto',jsonParser,(req,res) => {
  ctr.removePhoto(req.body,res)
})

app.post('/updateInfo',jsonParser,(req,res) => {
  ctr.updateProfile(req,res)
})

app.listen(3000)
