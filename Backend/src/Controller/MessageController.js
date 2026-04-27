import { Message } from "../Model/MessageModel.js";
import { Register } from "../Model/RegisterModel.js";
import { io, getReceiverSocketId } from "../Socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderID, receiverID, message, messageType, latitude, longitude } = req.body;
   
    

    if (!senderID || !receiverID) {
      return res.status(400).json({
        message: "senderID and receiverID are required",
      });
    }

    // Validate based on message type
    if (messageType === "location") {
      // Location messages require latitude and longitude
      if (!latitude || !longitude) {
        return res.status(400).json({
          message: "Latitude and longitude are required for location messages",
        });
      }
    } else {
      // Text and other types require message content
      if (!message) {
        return res.status(400).json({
          message: "Message text is required",
        });
      }
    }

    // Save message DB
    const newMessage = await Message.create({
      senderID,
      receiverID,
      message: message || null,
      messageType: messageType || "text",
      latitude: latitude || null,
      longitude: longitude || null,
    });

    //  Send realtime message
    const receiverSocketId =
      getReceiverSocketId(receiverID);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    res.status(201).json(newMessage);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { senderid, receiverid } = req.params;

    const messages = await Message.find({
      $or: [
        { senderID: senderid, receiverID: receiverid },
        { senderID: receiverid, receiverID: senderid },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId} = req.params;

    // find message
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // authorization check - get senderId from token (use id if available, otherwise lookup by email)
    let senderId = req.user.id;
    
    if (!senderId && req.user.Email) {
      // Fallback: lookup user by email for backward compatibility with old tokens
      const user = await Register.findOne({ Email: req.user.Email });
      if (user) {
        senderId = user._id.toString();
      }
    }

   
    
    if (message.senderID.toString() !== senderId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // delete message
    await message.deleteOne();

    // socket notify receiver
    const receiverSocketId = getReceiverSocketId(message.receiverID.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("DeleteMessage", {
        messageId,
      });
    }

    return res.status(200).json({
      message: "Message deleted successfully",
      messageId,
    });

  } catch (error) {
  
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const ImageMessage = async (req, res) => {
  const profileImage = req.file ? req.file.filename : null;
  await Message.create({
    senderID: req.user.id,
    receiverID: req.body.receiverID,
    messageType: "image",
    mediaUrl: `http://localhost:3000/Upload/${profileImage}`,
  });
   res.json({
    imageUrl: `http://localhost:3000/Upload/${profileImage}`,
  });
}