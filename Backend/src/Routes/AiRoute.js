import express from "express"
import { aimessage } from "../Controller/AiController.js"
import verifyToken from "../Middleware/verifytoke.js"



const route=express.Router()

route.post("/api/v1/Aichat",aimessage)

export default route