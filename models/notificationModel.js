import mongoose from "mongoose";
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
commentSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});

const Notification = model("Notification", notificationSchema);
export default Notification;
