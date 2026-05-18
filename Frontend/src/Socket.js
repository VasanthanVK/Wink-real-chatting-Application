import { io } from "socket.io-client";

const user = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  query:{
    userId: user?._id
  }  // manual connect
});

