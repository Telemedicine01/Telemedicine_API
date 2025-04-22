import {model, Schema} from "mongoose";
import normalize from "normalize-mongoose"


const messageSchema = new Schema({
    senderId: { type: String, require: true},
    receiverId: { type: String, require: true},
    text: { type: String, require: true},
    timestamp: { type: Date, default: Date.now }
  });
  
  messageSchema.plugin(normalize);
  export const messageModel = model("Message", messageSchema);