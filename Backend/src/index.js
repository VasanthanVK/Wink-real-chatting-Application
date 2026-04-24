import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./utils/DB.js";
import Registerroutes from "./Routes/registerRoutes.js";
import ProfileRoutes from "./Routes/ProfileRoutes.js";
import messagerouter from "./Routes/MessageRoutes.js"
import OtpRoutes from "./Routes/OtpRoutes.js"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import http from 'http'
import { initSocket } from "./Socket.js";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app=express();





const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173", // your React port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

app.use("/Upload", express.static(path.join(__dirname, "Upload")));

app.use(Registerroutes)
app.use(ProfileRoutes)
app.use(messagerouter)
app.use(OtpRoutes)


ConnectDB()

initSocket(server)

server.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})