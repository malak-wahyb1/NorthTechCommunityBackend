import mongoose from "mongoose";
const { Schema, model } = mongoose;
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
      required:true
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


const Post = model("Post", postSchema);
export default Post;
