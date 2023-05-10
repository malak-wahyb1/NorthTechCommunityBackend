import User from "../models/userModel.js";

export function addUser(req, res, next) {
  const user = new User(req.body);
  user
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getUsers(req, res, next) {
  User.find({})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getUser(req, res, next) {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((response) => {
      if(!response){
        res.status(404).send({status:404,message:"user not found"});
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res.status(error.status || 500).send({ status: error.status, message: error.message });
      next(error);;
    });
}

export function editUser(req, res, next) {
  const {id}=req.params;
  User.findOneAndUpdate({_id:id},req.body).then((response)=>{
    res.status(200).send({ status: 200, message: response });
    
  }).catch((error)=>{
    res.status(error.status || 500).send({ status: error.status, message: error.message });
    next(error);
  })
}

export function deleteUser(req,res,next){
  const {id}=req.params;
  User.findOneAndDelete({_id:id}).then((response)=>{
    res.status(200).send({status:200,message:response});
  }).catch((error)=>{
    res.status(error.status || 500).send({ status: error.status, message: error.message });
    next(error);
  })
}