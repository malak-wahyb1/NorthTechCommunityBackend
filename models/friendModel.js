import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
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
friendSchema.plugin(mongoosePaginate)
const Friend = model("Friend", friendSchema);
export default Friend;
