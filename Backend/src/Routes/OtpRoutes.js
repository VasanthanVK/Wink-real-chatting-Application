import express from "express";
import { sendOTP, verifyOTP } from "../Controller/otpCOntroller.js";
const router = express.Router();

router.post("/api/v1/sendOTP", sendOTP);
router.post("/api/v1/verifyOTP", verifyOTP);

export default router;