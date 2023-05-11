import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content:{
      type:string
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
notificationSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});
notificationSchema.plugin(mongoosePaginate)

const Notification = model("Notification", notificationSchema);
export default Notification;
