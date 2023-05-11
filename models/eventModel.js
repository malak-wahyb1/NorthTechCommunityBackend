import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    event_name: {
      type: String,
    },
    event_links:[{
      type: String,
     
    }],
    address:{
      type: String,
    },
   
    date_time_start:{
      type:Date
    }, 
    date_time_end:{
      type:Date
    },
    speaker:[{
      type:Schema.Types.ObjectId,
      ref:'User'
    }],
    attend:[{
      type:Schema.Types.ObjectId,
      ref:'User'
    }],
    description:{
      type:String,
      max:[300,"Full"]
    },
    media:{
      type:String,
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
eventSchema.pre(['find','findOne'],function(){
  this.populate(['attend','speaker']);
    })
    eventSchema.plugin(mongoosePaginate)
const Event=model("Event",eventSchema);
export default Event;