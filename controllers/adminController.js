import Admin from "../models/adminModel.js";

export function addAdmin(req, res, next) {
  const admin = new Admin(req.body);
  admin
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getAdmins(req, res, next) {
  Admin.find({})
    .then((admins) => {
      res.status(200).send({ status: 200, message: admins });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getAdmin(req, res, next) {
  const { id } = req.params;
  Admin.findOne({ _id: id })
    .then((admin) => {
      if(!admin){
        res.status(404).send({status:404,message:"admin not found"});
      }
      res.status(200).send({ status: 200, message: admin });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);;
    });
}

export function editAdmin(req, res, next) {
  const {id}=req.params;
  Admin.findOneAndUpdate({_id:id},req.body).then((admin)=>{
    res.status(200).send({ status: 200, message: admin });
    
  }).catch((error)=>{
    res.status(error.status || 500).send({ status: error.status, message: error.message });
    next(error);
  })
}

export function deleteAdmin(req,res,next){
  const {id}=req.params;
  Admin.findOneAndDelete({_id:id}).then((admin)=>{
    res.status(200).send({status:200,message:admin});
  }).catch((error)=>{
    res.status(error.status || 500).send({ status: error.status, message: error.message });
    next(error);
  })
}