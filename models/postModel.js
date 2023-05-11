import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2'
const postSchema = new Schema(
  {
    media: {
      type: String,
    },
    description: {
      type: String,
      max: [300, "full"],
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
postSchema.pre(["find", "findOne"], function () {
  this.populate( "user");
});
postSchema.plugin(mongoosePaginate)

const Post = model("Post", postSchema);
export default Post;
