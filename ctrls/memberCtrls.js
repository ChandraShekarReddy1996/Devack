var dbService = require('../DB/mongoService')
const jwt = require('jsonwebtoken')
var secretKey = 'sfjojojfoa22jsknfkslsjf234o34n';
var jwtDecode = require('jwt-decode')

var memberLogin = (req,res) => {
  dbService.find({EmpId : req.EmpId, password: req.password},'members',(err,result) => {
    console.log('QUERY',result)
    if(err)
    res.status(400).send({message : 'SOme Error Occured While processing the application' ,status : 400 ,data : []});
    else if(result[0] == null)
    res.status(401).send({message : 'Username/Password is incorrect' ,status : 401 , data : []})
    else
    {
      var token = jwt.sign(req,secretKey)
      res.status(200).send({message : 'Sucessful', status : 200 , data : {acces_token : token, name : result[0].firstName, phone:result[0].phone, EmpId : result[0].EmpId}})
    }
  })
}

var getDevices = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({EmpId : token.EmpId,password: token.password}, 'members',(err,result) => {
    if(err)
    res.status(500).send({message : 'Some Error in processing the script' , status : 200 , data : []})
    else if(result == null)
    res.status(400).send({message : 'Username/password is incorrect' , status : 400 , data : []})
    else
    {
      dbService.findAll('members',{},(err,result) => {
        if(err)
        res.status(500).send({message : 'Some Error in processing the script' , status : 200 , data : []})
        else
        res.status(200).send({message : 'Sucessful' , status : 200 , data : result})
      });
    }
  })
}

var addPhotos = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({phone : token.phone , password: token.password},'members',(err,result) => {
    if(err)
    {
      res.status(500).send({message : 'some error occured while processing the script', status : 500, data : []})
    }
    else if(result == null)
    {
      res.status(400).send({message : 'Username/password is incorrect' , status : 400 ,data : []})
    }
    else
    {
      if (!req.files)
      return res.status(400).send('No files were uploaded.');
      let sampleFile = req.files.sampleFile;
      var path = '/somewhere/on/your/server/filename.jpg';
      var dat = { 'pic' : path , phone : token.phone, owner : token.phone}
      sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(result) {
        if (result)
        {
          dbService.create(dat,'myPics');
          res.status(200).send({message : 'Sucessful' , status : 200 , data :dat});
        }
        else{
          res.status(400).send({message : 'Some Error occured' , status : 400 , data : []})
        }
      })
    }
  })
}

//For loading the images in the front end
var getPhotos = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({phone : token.phone ,password: token.password}, 'members',(err,result) => {
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 200 , data : []})
    }
    else if(result == null)
    {
      res.status(400).send({message : 'Username/password is incorrect' , status : 400 , data : []})
    }
    else
    {
      dbService.findAll('myPics',{phone : token.phone},(err,result) => {
        if(err)
        {
          res.status(500).send({message : 'Some Error in processing the script' , status : 200 , data : []})
        }
        else{
          res.status(200).send({message : 'Sucessful' , status : 200 , data : result})
        }
      });
    }
  })
}

var sendPhoto = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({phone : token.phone , password : token.password}, 'members', (err,result) => {
    console.log('>>>>' ,err,result);
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else
    {
      var dat = {'SenderPhone' : token.phone , 'receiverPhone' : req.body.revPhone ,'file' : req.body.path}
      var dat1 = {'pic' : req.body.path , 'phone' : req.body.revPhone , owner : token.phone}
      dbService.create(dat,'transactions');
      dbService.create(dat1,'myPics');
      res.status(200).send({message:'sucessful' , status : 200 , data : dat})
    }
  })
}

var sendRequest = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({EmpId : token.EmpId, password: token.password}, 'members' , (err,result) => {
    console.log('>>>',err,result)
    if(err){
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else if(!Object.keys(result).length)
    res.status(404).send({message : 'Employee is not Registerd with us. please kindly check the EmpID !!.', status : 404, data : []})
    else{
      dbService.find({deviceID : req.body.deviceID} , 'allocations' ,(err1,result1) => {
        console.log('>>>>' , err1 ,result1)
        if(err1){
          res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
        }
        else if(result1[0] == null)
        {
          res.status(400).send({message : 'Plese Kindly Check the Receiver Phone Number' ,statua : 400 ,data : [{sender : result} , {receiver : result1}]})
        }
        else{
          var dat = {sendersEmpId : token.EmpId , receiversEmpId : result1[0].EmpId , description : req.body.description}
          console.log(dat)
          dbService.create(dat,'pendingRequests')
          res.status(200).send({message : 'sucessful' ,statua : 200 ,data : [{sender : result} , {receiver : result1}]})
        }
      })
    }
  })
}

var discardRequest = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({EmpId : token.EmpId, password: token.password}, 'members' , (err,result) => {
    //  console.log(">>",err,result)
    if(err){
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else{
      dbService.clear({sendersEmpId : req.body.EmpId , receiversEmpId : token.EmpId}, 'pendingRequests', (err1,result1) => {
        console.log(">>>",err,result1)
        if(err1)
        res.status(400).send({message : 'Some Error Occured Whle Discrading The Request' , status : 400 ,data : []})
        else if(result1 == null)
        res.status(400).send({message : `No requsts from that ${req.body.EmpId}` , status : 400 ,data : []})
        else
        res.status(200).send({message:`Discarded the request from the ${req.body.EmpId}` , status : 200 , data : []})
      })
    }
  })
}

var acceptRequest = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({EmpId : token.EmpId, password: token.password} , 'members' , (err,result) => {
    if(err)
    res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    else{
      dbService.find({sendersEmpId : req.body.EmpId , receiversEmpId : token.EmpId}, 'pendingRequests', (err1,result1) => {
        if(err1){
          res.status(400).send({message : 'Some Error Occured Whle Discrading The Request' , status : 400 ,data : []})
        }
        else if (result1 == null) {
          res.status(400).send({message : `No requsts from that ${req.body.EmpId} in Pending Requests` , status : 400 ,data : []})
        }
        else{
          var dat = {sendersEmpId : req.body.EmpId , receiversEmpId : token.EmpId}
          dbService.create(dat, 'transactions')
          dbService.clear(dat, 'pendingRequests', (err1,result1) => {
            if(err1){
              res.status(400).send({message : 'Some Error Occured Whle Accepting The Request' , status : 400 ,data : []})
            }
            else if(result1 == null)
            {
              res.status(400).send({message : `No requsts from that ${req.body.EmpId}` , status : 400 ,data : []})
            }
            else{
              res.status(200).send({message:`Accepted the request from the ${req.body.EmpId}` , status : 200 , data : []})
            }
          })
        }
      })
    }
  })
}

var removePhoto = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({phone : token.phone , pic : req.body.pic},'myPics',(err,result) => {
    console.log('>>>>' ,err,result);
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else{
      dbService.clear({phone : token.phone , pic : req.body.pic},'myPics',(err,result) => {
        if(err){
          res.status(400).send({message : 'Some Error Occured whle Clearing the picture' , status : 400 ,data : []})
        }
        else{
          res.status(200).send({message:'sucessful' , status : 200 , data : []})
        }
      })
    }
  })
}

var updateProfile = (req,res) => {
  var token = jwtDecode(req.headers.authorization);
  dbService.find({phone : token.phone, password : token.password},'members',(err,result) => {
    console.log('>>>>' ,err,result);
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else
    {
      var post = {name : req.body.name ,address : req.body.address};
      dbService.update({phone : token.phone},post,'members' ,(err,result) =>{
        if(err)
        {
          res.status(400).send({message : 'Some Error Occured' ,status :400 ,data :[]})
        }
        else{
          dbService.find({phone : token.phone},'members',(err,result) => {
            res.status(200).send({message: 'Sucessful' ,status : 200 ,data : [result]})
          })
        }
      })
    }
  })
}

module.exports = {
  //  registerMember,
  getDevices,
  addPhotos,
  getPhotos,
  sendPhoto,
  sendRequest,
  discardRequest,
  acceptRequest,
  removePhoto,
  updateProfile,
  memberLogin
};
