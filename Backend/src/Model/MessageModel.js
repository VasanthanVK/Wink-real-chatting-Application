import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "video", "audio", "file", "location"],
      default: "text",
    },

    mediaUrl: {
      type: String,
      default: null,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    status: {
    type: String,
    enum: ["sent", "delivered", "seen"],
    default: "sent"
  }
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

// {
//   "_id": "msg123",
//   "sender": "user1",
//   "receiver": "user2",
//   "message": "Hello da 👋",
//   "messageType": "text",
//   "seen": false,
//   "delivered": true,
//   "createdAt": "2026-04-13T10:00:00Z"
// }