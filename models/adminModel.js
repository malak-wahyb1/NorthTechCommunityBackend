import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2'
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";
const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: [6, "username must be between 6 and 12 characters"],
      max: [12, "username must be between 6 and 12 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);
adminSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
adminSchema.plugin(uniqueValidator);
adminSchema.plugin(mongoosePaginate)
const Admin = model("Admin", adminSchema);
export default Admin;
