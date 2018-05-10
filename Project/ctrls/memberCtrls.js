var dbService = require('/home/chandra/Desktop/jugnoo/Project/DB/mongoService')

var options ;

var registerMember = (req,res) => {
  dbService.find({phone : req.phone}, 'members',(err,result) => {
    console.log("err ... res >>>>>",err,result);
    if(err)
    {
      // throw err;
      res.status(404).send({message : 'Some Error Occured While Executing the script',status : 404, data : []})
    }
    else if(result && Object.keys(result).length)
    {
      res.status(400).send({message : 'Phone Number is already Registered', status: 200, data: {}})
    }
    else{

      var dat = {'firstName': req.firstName,'LastName':req.LastName,'phone':req.phone,'email':req.email, 'password': req.password,'address': req.address} ;
      dbService.create(dat,'members');
      res.status(201).send({message : 'Succesfully created', status: 200, data: dat})
    }
  })
}

var getMembers = (req,res) => {
  dbService.find({phone : req.phone ,password: req.password}, 'members',(err,result) => {
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
      dbService.findAll('members',{},(err,result) => {
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

var addPhotos = (req,res) => {
  dbService.find({phone : req.body.phone , password: req.body.password},'members',(err,result) => {
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
      var dat = { 'pic' : path , phone : req.body.phone, owner : req.body.phone}

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
  dbService.find({phone : req.phone ,password: req.password}, 'members',(err,result) => {
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
      dbService.findAll('myPics',{phone : req.phone},(err,result) => {
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
  dbService.find({phone : req.phone}, 'members', (err,result) => {
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else
    {
      var dat = {'SenderPhone' : req.phone , 'receiverPhone' : req.revPhone ,'file' : req.path}
      var dat1 = {'pic' : req.path , 'phone' : req.revPhone , owner : req.phone}
      dbService.create(dat,'transactions');
      dbService.create(dat1,'myPics');
      res.status(200).send({message:'sucessful' , status : 200 , data : dat})
    }
  })
}


var removePhoto = (req,res) => {
  dbService.find({phone : req.phone , pic : req.pic},'myPics',(err,result) => {
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else{
      dbService.clear({phone : req.phone , pic : req.pic},'myPics',(err,result) => {
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
  dbService.find({phone : req.phone},'members',(err,result) => {
    if(err)
    {
      res.status(500).send({message : 'Some Error in processing the script' , status : 500 , data : []})
    }
    else
    {
      dbService.update({phone : req.phone},{name : req.name ,address : req.address},'members' ,(err,result) =>{
        if(err)
        {
          res.status(400).send({message : 'Some Error Occured' ,status :400 ,data :[]})
        }
        else{
          res.status(200).send({message: 'Sucessful' ,status : 200 ,data : []})
        }
      })
    }
  })
}

module.exports = {
  registerMember,
  getMembers,
  addPhotos,
  getPhotos,
  sendPhoto,
  removePhoto,
  updateProfile
};
