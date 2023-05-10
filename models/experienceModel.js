import mongoose from "mongoose";
const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    title: {
      type: String,
    },
    type: {
      type: String,
      enum:["Full_time","Part_time","Freelance"]
    },
    company:{
      type: String,
    },
    location:{
      type: String,
    },
    date_start:{
      type:Date
    }, 
    date_end:{
      type:Date
    },
    currently_working:{
      type:Boolean,
      default:false
    },
    description:{
      type:String,
      max:[300,"Full"]
    },
    profile:{
      type:Schema.Types.ObjectId,
ref:"Profile"
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
experienceSchema.pre(["find", "findOne"], function () {
  this.populate("profile");
});

const Experience=model("Experience",experienceSchema);
export default Experience;