import Getallprofile, { updateProfile } from "../Controller/profileController.js";
import express from "express";
import verifyToken from "../Middleware/verifytoke.js";
import { checkSchema } from "express-validator";
import { updateValidationSchema } from "../Middleware/validation.js";
import { upload } from "../Middleware/Multer.js";

const router = express.Router();

router.get("/api/v1/Profile", verifyToken,Getallprofile);

router.put("/api/v1/updateProfile/:id", verifyToken, upload.single("profilePic"), checkSchema(updateValidationSchema), updateProfile);

export default router;