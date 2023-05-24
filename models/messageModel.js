import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender:{
      type:Schema.Types.ObjectId,
      ref: "User",
    },
    content:{
      type:String,
      trim:true
    },
    chat:{
      type: Schema.Types.ObjectId,
      ref: "Chat",
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
)

const Message= model("Message",messageSchema)
export default Message;