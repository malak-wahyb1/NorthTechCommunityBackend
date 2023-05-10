import mongoose from "mongoose";
const { Schema, model } = mongoose;

const educationSchema = new Schema(
  {
    school: {
      type: String,
    },
    degree: {
      type: String,
    },
    field: {
      type: String,
    },

    date_start: {
      type: Date,
    },
    date_end: {
      type: Date,
    },
    currently_studying: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
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
educationSchema.pre(["find", "findOne"], function () {
  this.populate("profile");
});
const Education = model("Education", educationSchema);
export default Education;
