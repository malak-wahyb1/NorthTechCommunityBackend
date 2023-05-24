import mongoose from "mongoose";

const { Schema, model } = mongoose;
const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },
    user: 
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
  
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    qroupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
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
chatSchema.pre(["find", "findOne","save"], function () {
  this.populate(["user", "latestMessage","qroupAdmin"]);
});
const Chat=model("Chat",chatSchema)
export default Chat
