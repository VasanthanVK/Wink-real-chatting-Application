import express from "express";
import verifyToken from "../Middleware/verifytoke.js";
import { sendMessage, getMessages, deleteMessage, ImageMessage } from "../Controller/MessageController.js";
import { upload } from "../Middleware/Multer.js";
const router = express.Router();

router.post("/api/v1/Message", verifyToken, sendMessage);
router.get("/api/v1/Message/:senderid/:receiverid", verifyToken, getMessages);

router.delete("/api/v1/Message/:messageId/:senderID/:receiverID", verifyToken,deleteMessage);

router.post("/api/v1/Message/image", verifyToken, upload.single("profilePic"), ImageMessage);

export default router