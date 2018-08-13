var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var membersSchema = new Schema({
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
  },
  address : {
    type : String,
    required : true,
    minlength :1
  },
  Id :{
    type : Number,
    required : true,
    minlength :1
  },
  department : {
    type : String,
    required : true,
  },
  designation :{
    type : String,
    required : true
  }
})
module.exports = mongoose.model('members',membersSchema);

var myPics = new Schema ({
  pic : {
    type : String,
    required : true,
  },
  phone : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  },
  owner : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  }
})
module.exports = mongoose.model('myPics',myPics);

var pendingRequests = new Schema({
  sendersEmpId : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  },
  receiversEmpId : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  },
  description : {
    type : String,
    trim : true
  }
})
module.exports = mongoose.model('pendingRequests',pendingRequests);

var transactions = new Schema({
  sendersEmpId:{
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  },
  receiversEmpId:{
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  }
})
module.exports = mongoose.model('transactions',transactions);

var allocations = new Schema({
  Id : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  },
  deviceID : {
    type : Number,
    required : true,
    minlength : 10,
    trim : true
  }
})
module.exports = mongoose.model('allocations',allocations);


var  Devices = new Schema({
  mobileBrand : {
    type : String,
    required : true,
    trim : true
  },
  model:{
    type : String,
    required : true,
    trim : true
  },
  deviceSpecs : {
    type : Object,
    required : true,
  },
  deviceID:{
    type : Number,
    required : true,
    trim : true
  }
})
module.exports = mongoose.model('Devices',Devices)
