import { io } from "socket.io-client";

const user = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
const URL = "http://localhost:3000"; // backend URL

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  query:{
    userId: user?._id
  }  // manual connect
});

