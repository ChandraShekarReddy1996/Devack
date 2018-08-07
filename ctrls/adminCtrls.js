var dbService = require('../DB/mongoService')
const jwt = require('jsonwebtoken')
var adminkey =  'jshfiaohyfsoinqwlk23lj4g3u224d';

var jwtDecode = require('jwt-decode')

var registerMember = (req,res) => {
  if(adminkey = req.body.passKey){
    dbService.find({phone : req.body.phone, }, 'members',(err,result) => {
      if(err)
      {
        res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
      }
      else if(result && Object.keys(result).length)
      {
        res.status(400).send({message : 'Phone Number is already Registered', status: 200, data: {}})
      }
      else{
        var count = 1;
        dbService.findAll('members',{},(err,result)=>{
          if(err)
          res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
          else
          count += result.length;
          var dat = {'firstName': req.body.firstName,'LastName':req.body.LastName,'phone':req.body.phone,'email':req.body.email, 'password': req.body.password,'address': req.body.address, 'EmpId' : count, 'department': req.body.department, designation : req.body.designation} ;
          dbService.create(dat,'members');
          res.status(201).send({message : 'Succesfully created', status: 200, data: dat})
        })
      }
    })
  }
  else{
    res.status(400).send({message : 'UnAuthorized Access', status: 400, data: {}})
  }
}

var addDevices = (req,res) => {
  var count = 0;
  if(adminkey == req.body.passKey)
  {
    dbService.findAll('Devices',{},(err,result)=>{
      if(err)
      res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
      else
      count += result.length;
      var dat = {  deviceID : count, mobileBrand : req.body.mobileBrand, model : req.body.model, deviceSpecs : req.body.deviceSpecs}
      dbService.create(dat,'Devices');
      res.status(200).send({message : 'Sucessful' , status : 200 , data :dat});
    })
  }
  else{
    res.status(400).send({message : 'UnAuthorized access' , status : 400 , data : []})
  }
}

var allocateDevice = (req,res) => {
  if(adminkey == req.body.passKey)
  {
    dbService.find({EmpId : req.body.EmpId},'members',(err,result) => {
      if(err)
      res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
      else if(!Object.keys(result).length)
      res.status(404).send({message : 'Member Not Found', status : 404 , data : []})
      else
      dbService.find({deviceID : req.body.deviceID},'Devices',(err1,result1) => {
        if(err1)
        res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
        else if(!Object.keys(result1).length)
        res.status(400).send({message : 'Device Not Found',status : 400, data : []})
        else{
          var time = new Date();
          var dat = {EmpId : req.body.EmpId , deviceID : req.body.deviceID, timeStamp : time}
          dbService.create(dat,'allocations');
          res.status(200).send({message: 'Sucessfully allocated the device', status: 200, data : {allocationDetails : dat,}})
        }
      })
    })
  }
  else
  res.status(400).send({message : 'UnAuthorized access' , status : 400 , data : []})
}

var removemember = (req,res) => {
  if(adminkey == req.body.passKey){
    dbService.clear({EmpId : req.body.EmpId},'members',(err,result) => {
      if(err)
      res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
      else
      res.status(200).send({message : 'Sucessful' , status : 200 , data :[]});
    })
  }
  else
  res.status(400).send({message : 'UnAuthorized access' , status : 400 , data : []})
}

var removeDevice = (req,res) => {
  if(adminkey == req.body.passKey)
  {
    dbService.clear({deviceID : req.body.deviceID},'Devices',(err,result) => {
      if(err)
      res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
      else
      res.status(200).send({message : 'Sucessful' , status : 200 , data :[]});
    })
  }
  else
  res.status(400).send({message : 'UnAuthorized access' , status : 400 , data : []})
}

module.exports = {
  registerMember,
  addDevices,
  allocateDevice,
  removemember,
  removeDevice
}
