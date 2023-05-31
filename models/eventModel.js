import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    event_name: {
      type: String,
    },
    event_links: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
    },

    date: {
      type: Date,
    },
    time: {
      type: String,
    },

    media: {
      type: String,
    },
    posted: {
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
eventSchema.pre(["find", "findOne"], function () {
  this.populate(["attend", "speaker", "posted"]);
});
eventSchema.plugin(mongoosePaginate);
const Event = model("Event", eventSchema);
export default Event;
