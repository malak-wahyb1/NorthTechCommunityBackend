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
phone: {
type: String,
unique: true,
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
userSchema.pre("save", function (next) {
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
userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate)

const User = model("User", userSchema);
export default User;
