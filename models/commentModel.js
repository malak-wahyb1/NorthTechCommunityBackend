import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      max: [150, "too long"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
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
commentSchema.pre(["find", "findOne"], function () {
  this.populate(["user", "post"]);
});
commentSchema.plugin(mongoosePaginate);
const Comment = model("Comment", commentSchema);
export default Comment;
