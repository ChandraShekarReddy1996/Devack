var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/Library');

var membersSchema = new Schema(
  {
  firstName : {
    type : String,
    required : true,
    minlength :1,
    trim : true
  },
  LastName : {
    type : String,
    required : true,
    minlength :1
  },
  phone : {
    type : Number,
    required : true,
    maxlength : 10,
    trim : true
  },
  password : {
    type : String,
    required : true,
    maxlength : 10,
    trim : true
  },
  email : {
    type : String,
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] ,
    minlength : 5,
    required : true
  }
  })


module.exports = mongoose.model('members',membersSchema);
