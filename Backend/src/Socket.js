import { Server } from "socket.io";
import { Message } from "./Model/MessageModel.js";

let io;
const userSocketMap = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://your-frontend.vercel.app", "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      socket.userId = userId; // Save userId to socket object for later use
    }

    console.log("User Connected:", userId);

    socket.on("join", (userId) => {
      if (userId) {
        userSocketMap[userId] = socket.id;
        socket.userId = userId;
      }
    });


    // ✅ RECEIVE MESSAGE EVENT
    socket.on("sendMessage", (data) => {
      const receiverSocketId = userSocketMap[data.receiverID];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", data);
      }
    });

    socket.on("messageDeliverd", async (data) => {
      //console.log("Message delivered:",data);

      await Message.findByIdAndUpdate(data.messageID, { status: "delivered" }, { new: true });

      io.to(userSocketMap[data.senderID]).emit("messageStatusUpdate", {
        messageID: data.messageID,
        status: "delivered"
      })
      // Here you can update message status in DB to "delivered" if needed
    })

    socket.on("messageSeen", async ({ chatUserId }) => {

      const messages = await Message.updateMany(
        {
          senderId: chatUserId,
          receiverId: socket.userId,
          status: { $ne: "seen" }
        },
        { status: "seen" }
      );

      const senderSocket = userSocketMap[chatUserId];

      io.to(senderSocket).emit("messagesSeen");
    });


    // ✅ SEND LOCATION EVENT
    socket.on("sendLocation", (data) => {
      const { senderID, receiverID, latitude, longitude } = data;
      const receiverSocketId = userSocketMap[receiverID];

      // Send to receiver user
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveLocation", {
          senderID,
          latitude,
          longitude,
        });
      }
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      //  console.log("User Disconnected:", userId);
    });
  });
};

export const getReceiverSocketId = (userId) =>
  userSocketMap[userId];

export { io };