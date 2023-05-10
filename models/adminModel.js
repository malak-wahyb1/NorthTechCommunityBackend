import mongoose from "mongoose";
const { Schema, model } = mongoose;
import uniqueValidator from "mongoose-unique-validator";
const adminSchema = new Schema(
  {
    username: {
      type: String,
   
      min: [6, "username must be between 6 and 12 characters"],
      max: [12, "username must be between 6 and 12 characters"],
    },
    password: {
      type: String,
    
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
adminSchema.plugin(uniqueValidator);
const Admin = model("Admin", adminSchema);
export default Admin;
