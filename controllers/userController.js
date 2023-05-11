import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function addUser(req, res, next) {
  const user = new User(req.body);
  user
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getUsers(req, res, next) {
  const pageNumber = req.query.page||1;
  const pageSize = req.query.pageSize||10;
  User.paginate({},{page:pageNumber, limit:pageSize})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getUser(req, res, next) {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "user not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function editUser(req, res, next) {
  const { id } = req.params;
 if(req.body.password){
      const password={}
  bcrypt.genSalt(10).then((salt) =>
          bcrypt.hash(req.body.password, salt).then((hashPassword) => {
           password.password= hashPassword;
            return User.findByIdAndUpdate({_id:id}, {$set:password});
          })
        );
 }

  User.findOneAndUpdate({ _id: id }, req.body)
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function deleteUser(req, res, next) {
  const { id } = req.params;
  User.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function loginUser(req, res, next) {
  const userLoggingIn = req.body;
  User.findOne({ email: userLoggingIn.email })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ message: "Invalid user" });
      }
      bcrypt.compare(userLoggingIn.password, admin.password)
      .then((isCorrect)=>{
        if(isCorrect) {
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_KEY,
        { expiresIn: 3000 }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3000 * 1000,
      });

      return res.status(201).json({
        message: "user successfully Logged in",
        user: admin,
        token,
      });}else if(!isCorrect){
        return(
          res.status(401).send({status:401,message:"you are not an admin"})
        )
      }
      })
    })
    .catch((error) => {
      return res.status(error.status || 500).json({
        status: error.status,
        message: error.message,
      });
    });
}
