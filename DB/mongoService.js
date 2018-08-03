var mongoose = require('../models/membermodels');

//Read opearatins of the mongodb
var find = (data,doc,callbck) => {
  var db = mongoose.model(doc)
  db.find(data,(err,result) => {
    if(err)
    {
      return callbck(err);
    }
    else{
      console.log(result)
      return callbck(null,result);
    }
  });
}

var findAll = (doc,data,callback) => {
  var db = mongoose.model(doc)
  db.find(data,(err,result) => {
    if(err)
    {
      return callback(err);
    }
    else{
      return callback(null,result);
    }
  })
}

//create opearation of the mongodb
var create = (data,doc) =>{
  var db = mongoose.model(doc)
  var newbie = db(data);
  newbie.save();
}

//update opearation of the mongodb
var update = (pre,post,doc,callback) => {
  var db = mongoose.model(doc)
  console.log(post)
  db.findOneAndUpdate(pre,post,{upsert : true},(err,result) => {
    if(err){
      return callback(err);
    }
    else{
      return callback(null,result);
    }
  })
}

//Delete opearation of the mongodb
var clear = (data,doc,callback) => {
  var db = mongoose.model(doc)
  db.findOneAndRemove(data,(err,result) => {
    console.log('Clearing >>>>>> ' + result)
    if(err)
    return callback(err);
    else
    return callback(null,result);
  })
}

module.exports = {
  find ,
  findAll,
  create,
  update,
  clear
};
