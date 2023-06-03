import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    Linkedin:{
      type: String,
    },
    Email:{
      type: String,
    },
    Github:{
      type: String,
    },
    Instagram:{
      type: String,
    },
    Twitter:{
      type: String,
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
  },
  {
   
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);
profileSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});
profileSchema.plugin(mongoosePaginate)
const Profile=model("Profile",profileSchema);
export default Profile;