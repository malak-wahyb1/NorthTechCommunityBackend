import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt'
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema(
{
first_name: {
type: String,
},
last_name: {
type: String,
},
email: {
type: String,
unique: true,
},
media:{
  type: String,
  default:
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
},
phone: {
type: String,
 
},
password: {
type: String,
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
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate)

const User = model("User", userSchema);
export default User;
