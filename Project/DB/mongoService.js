var MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://localhost:27017/Library',function(err,base){
  if(err){
    console.log("error in db connection");
  }
  else{
    console.log("mongo db connected >>>>>>>> ");
    db = base;
  }
})

//Read opearatins of the mongodb
var find = (data,doc,callbck) => {
  db.collection(doc).findOne(data,(err,result) => {
    console.log("inside find fun >>>")
    if(err)
    {
      return callbck(err);
    }
    else{
      return callbck(null,result);
    }
  });
}

var findAll = (doc,data,callback) => {
  db.collection(doc).find(data).toArray((err,result) => {
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
  db.collection(doc).insert(data)
}

//update opearation of the mongodb
var update = (pre,post,doc,callback) => {
  var post = {$set : post}
  db.collection(doc).updateMany(pre,post,(err,result) => {
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
  db.collection(doc).deleteMany(data,(err,result) => {
    console.log('Clearing >>>>>> ' + result)
    if(err)
    return callback(err);
    else
    return callback(null,result);
  })
}

module.exports = {find , findAll, create, update, clear};
