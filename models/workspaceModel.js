import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const workspaceSchema = new Schema(
  {
    name: {
      type: String,
    },
    media: {
      type: String,
    },
    address: {
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
workspaceSchema.pre(["find", "findOne"], function () {
  this.populate("user");
});
workspaceSchema.plugin(mongoosePaginate);
const Workspace = model("Workspace", workspaceSchema);
export default Workspace;
