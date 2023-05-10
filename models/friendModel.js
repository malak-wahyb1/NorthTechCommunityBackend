import mongoose from "mongoose";
const { Schema, model } = mongoose;

const friendSchema = new Schema(
  {
    friend:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
friendSchema.pre(["find", "findOne"], function () {
  this.populate(["user","friend"]);
});

const Friend = model("Friend", friendSchema);
export default Friend;
