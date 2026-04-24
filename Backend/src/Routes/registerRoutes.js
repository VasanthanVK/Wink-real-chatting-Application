import express from "express";
import { upload } from "../Middleware/Multer.js";
import { login, register } from "../Controller/RegisterController.js";
import {checkSchema} from "express-validator"
import { validationSchema } from "../Middleware/validation.js";

const routes= express.Router()

routes.post("/api/v1/Register", upload.single("profilePic"),checkSchema(validationSchema),register)

routes.post("/api/v1/login",login)

export default routes