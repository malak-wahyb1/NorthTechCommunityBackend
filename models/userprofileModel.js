import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    about: {
      type: String,
      max: [400, "max about is 400 characters"],
    },
    
    date: {
      type: Date,
    },
    website: [{
   facebook:String,
   github:String,
   linkedin:String,
   instagram:String,
   youtube:String,
   twitter:String,
   gitlab:String,
    }],
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