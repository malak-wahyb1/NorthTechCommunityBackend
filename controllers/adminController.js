import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export function addAdmin(req, res, next) {
  const admin = new Admin(req.body);
  if(!req.body){
    res.status(404).send({message:"Please enter a valid admin"})
  }
  admin
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

export function getAdmins(req, res, next) {
 
  Admin.find({})
    .then((admins) => {
      res.status(200).send({ status: 200, message: admins });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getAdmin(req, res, next) {
  const { id } = req.params;
  Admin.findOne({ _id: id })
    .then((admin) => {
      if (!admin) {
        res.status(404).send({ status: 404, message: "admin not found" });
      }
      res.status(200).send({ status: 200, message: admin });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function editAdmin(req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;

  Admin.findById(id)
    .then((model) => {
      if (!model) {
        return res
          .status(404)
          .send({ status: 404, message: "Admin not found" });
      }

      const updates = {};

      if (username) {
        updates.username = username;
      }

      if (password) {
        return bcrypt.genSalt(10).then((salt) =>
          bcrypt.hash(password, salt).then((hashPassword) => {
            updates.password = hashPassword;
            return Admin.findByIdAndUpdate(id, { $set: updates });
          })
        );
      }

      return Admin.findByIdAndUpdate(id, { $set: updates });
    })
    .then((model) => {
      let message = model;

      if (username && !password) {
        message = model;
      }

      if (!username && password) {
        message = model;
      }

      res.status(200).send({ status: 200, message });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function deleteAdmin(req, res, next) {
  const { id } = req.params;
  Admin.findOneAndDelete({ _id: id })
    .then((admin) => {
      res.status(200).send({ status: 200, message: admin });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}
export function loginAdmin(req, res, next) {
  const userLoggingIn = req.body;
  Admin.findOne({ username: userLoggingIn.username })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ message: "Invalid Admin" });
      }
      bcrypt
      .compare(userLoggingIn.password, admin.password)
      .then((isCorrect) => {
        if(isCorrect) {
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        process.env.JWT_KEY,
        { expiresIn: 3000 }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3000 * 1000,
      });

      return res.status(201).json({
        message: "Admin successfully Logged in",
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
