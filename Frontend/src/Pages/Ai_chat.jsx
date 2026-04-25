import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  PhoneIcon,
  RocketLaunchIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

function Ai_chat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState([]);

  const sendmessage=async()=>{
    if (!message.trim()) return;

    const currentMessage = message;
    // Append user message immediately
    setReply((prev) => [...prev, { text: currentMessage, sender: "user" }]);
    setMessage("");

    const token=localStorage.getItem("token");
    const res=await fetch("http://localhost:3000/api/v1/Aichat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({message: currentMessage})
    })

    const data=await res.json();

    console.log(data);
    // Append AI reply
    setReply((prev)=> [...prev , { text: data.reply, sender: "ai" }])
    
  }

  return (
    <div className="h-screen flex flex-col">
      {/* HEADER */}
      <nav className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold">Wink AI</p>
            <p className="text-xs text-gray-300">Always here to help</p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Icons have been removed as requested */}
        </div>
      </nav>

      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto p-4 bg-[url('/chatbg.jpeg')] bg-cover flex flex-col gap-2">
        {reply && reply.length > 0 ? (
          reply.map((item, i) => (
            <div 
              key={i} 
              className={`max-w-md px-4 py-3 rounded-2xl text-sm ${
                item.sender === 'user' 
                  ? 'bg-blue-600 text-white self-end ml-auto' 
                  : 'bg-green-900 text-white self-start'
              }`}
            >
              {item.text}
            </div>
          ))
        ) : (
          <div className="bg-blue-600/20 border border-blue-500/30 text-white self-center px-4 py-3 rounded-2xl text-sm max-w-md text-center mt-4">
            Hello! I am Wink AI. Ask me anything and I'll do my best to help you.
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-md flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Wink anything..."
            className="flex-1 resize-none h-12 rounded-lg bg-gray-800 text-white px-3 py-2 outline-none border-2 border-blue-400 focus:border-blue-600"
          />
          <button
            className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
           onClick={sendmessage}>
            <PaperAirplaneIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ai_chat;