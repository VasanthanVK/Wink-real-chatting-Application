import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  RocketLaunchIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket";
import { DeleteMessage } from "../components/DeteleMessage";

function Chatcontainer({ selectedChat }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // ✅ store chat messages
  const [error, setError] = useState("");
  const [selectedMessageForDelete, setSelectedMessageForDelete] =
    useState(null);
  const bottomRef = useRef(null); // ✅ for auto-scroll
  const isConnectedRef = useRef(false); // ✅ track connection state
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState(null); // File preview
  const [uploadedImage, setUploadedImage] = useState(null); // url after upload
  const senderid = currentuser?._id;
  const receiverid = selectedChat?._id;
  console.log(messages);

  // Fetch chat history when selectedChat changes
  useEffect(() => {
    if (!receiverid || !senderid) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/Message/${senderid}/${receiverid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        // Ensure data is always an array
        setMessages(Array.isArray(data) ? data : data.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [receiverid, senderid, token]);

  //  Auto-scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Socket: connect and join room once
  useEffect(() => {
    if (senderid && !isConnectedRef.current) {
      socket.connect();
      socket.emit("join", senderid);
      isConnectedRef.current = true;
    }
    return () => {
      if (isConnectedRef.current) {
        socket.disconnect();
        isConnectedRef.current = false;
      }
    };
  }, [senderid]);

  // Socket: receive message and update UI
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data && data._id) {
        setMessages((prev) => {
          const updated = [...prev, data];

          socket.emit("messageDeliverd", {
            messageID: data._id,
            senderID: data.senderID,
            receiverID: data.receiverID,
          });
          // Keep only last 500 messages to prevent memory issues
          return updated.slice(-500);
        });
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, []);

  useEffect(() => {
    socket.emit("messageSeen", {
      chatUserId: selectedChat?._id,
    });
  }, [selectedChat]);

  const handleMessage = async () => {
    if (!message.trim()) return;
    setError("");

    const newMessage = {
      senderID: senderid,
      receiverID: receiverid,
      message: message,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/Message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //  Add Bearer prefix
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Add sent message to UI immediately
      setMessages((prev) => {
        const updated = [...prev, data];
        return updated.slice(-500);
      });

      socket.emit("sendMessage", data);

      setMessage(""); //  clear input
    } catch (err) {
      const errorMsg = err.message || "Failed to send message";
      console.error(errorMsg, err);
      setError(errorMsg);
    }
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", {
      messageId,
      senderID: senderid,
      receiverID: receiverid,
    });
    console.log("delete", messageId);
    setMessages((prev) =>
      prev.filter((msg) => String(msg._id) !== String(messageId)),
    );

    return () => socket.off("deleteMessage");
  };

  // Send on Enter key (Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessage();
    }
  };
  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) {
        setError("No file selected");
        return;
      } else {
        setSelectedImage(file);
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("receiverID", receiverid);

      const res = await fetch("http://localhost:3000/api/v1/Message/image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log(data);

      if (!data.imageUrl) {
        setError("Failed to upload image");
        return;
      } else {
        setUploadedImage(data.imageUrl);
        // Preview shows until next message or upload
      }

      //selectedimage(null);

      // ✅ send image url via socket
      socket.emit("sendMessage", {
        senderID: senderid,
        receiverID: receiverid,
        image: data.imageUrl,
        type: "image",
      });

      // Clear file input
      e.target.value = "";
    } catch (err) {
      const errorMsg = err.message || "Failed to upload image";
      console.error(errorMsg, err);
      setError(errorMsg);
    }
  };

  const sendLiveLocation = () => {
    if (!senderid || !receiverid) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        try {
          const response = await fetch("http://localhost:3000/api/v1/Message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              senderID: senderid,
              receiverID: receiverid,
              messageType: "location",
              latitude: latitude,
              longitude: longitude,
            }),
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();

          // Add location message to UI immediately
          setMessages((prev) => [...prev, data]);

          // Send through socket for real-time delivery
          socket.emit("sendMessage", data);
        } catch (err) {
          const errorMsg = err.message || "Failed to send location";
          console.error(errorMsg, err);
          setError(errorMsg);
        }
      },
      (err) => {
        console.log(err);
        setError("Failed to get location. Please enable location permission.");
      },
      { enableHighAccuracy: true },
    );
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#111b21] text-gray-400">
        <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-15 h-15">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <span className="font-bold text-xl tracking-tight text-gray-900">
          Wink
        </span>

        <p className="text-sm mt-2">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <nav className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={selectedChat?.profilePic}
            onError={(e) => {
              e.target.src =
                "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
            }}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">{selectedChat.Name}</p>
            <p className="text-xs text-gray-300">online</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="p-2 rounded-full hover:bg-white/10">
            <PhoneIcon className="w-5 h-5 text-white cursor-pointer" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10">
            <VideoCameraIcon className="w-5 h-5 text-white cursor-pointer" />
          </button>
          <button
            onClick={sendLiveLocation}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <RocketLaunchIcon className="w-5 h-5 text-white cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto p-4 bg-[url('/chatbg.jpeg')] bg-cover flex flex-col gap-2">
        {error && (
          <div className="bg-red-500/80 text-white px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        {messages.map((msg) => {
          const isSender = String(msg.senderID) === String(senderid);
          return (
            <div
              key={msg._id || `${msg.senderID}-${Date.now()}`} //  use unique ID
              onClick={() => isSender && setSelectedMessageForDelete(msg)}
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm transition ${
                isSender
                  ? "bg-blue-600 text-white self-end ml-auto cursor-pointer hover:opacity-80"
                  : "bg-green-900 text-white self-start"
              }`}
            >
              {msg.message}
              {msg.mediaUrl && (
                <img
                  src={msg.mediaUrl}
                  className="w-40 rounded mt-2"
                  alt="message"
                />
              )}
              {msg.status === "sent" && "✔"}
              {msg.status === "delivered" && "✔✔"}
              {msg.status === "seen" && "🔵✔✔"}
              {uploadedImage && msg.image === uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="preview"
                  className="w-40 rounded mt-2"
                />
              )}
              {msg.type === "location" && (
                <div
                  className="mt-2 cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/live-location/${msg.senderID}`)}
                >
                  <iframe
                    title="location"
                    width="200"
                    height="150"
                    className="rounded-lg pointer-events-none"
                    src={`https://maps.google.com/maps?q=${msg.latitude},${msg.longitude}&z=15&output=embed`}
                  />
                  <p className="text-xs mt-1">📍 Tap to view live location</p>
                </div>
              )}
              {msg.messageType === "location" && (
                <div
                  className="mt-2 cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/live-location/${msg.senderID}`)}
                >
                  <iframe
                    title="location"
                    width="200"
                    height="150"
                    className="rounded-lg pointer-events-none"
                    src={`https://maps.google.com/maps?q=${msg.latitude},${msg.longitude}&z=15&output=embed`}
                  />
                  <p className="text-xs mt-1">📍 Tap to view live location</p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} /> {/* scroll anchor */}
      </div>

      <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-md flex flex-col gap-2">
        {/* Image Preview */}
        {uploadedImage && (
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <img
              src={uploadedImage}
              alt="preview"
              className="w-16 h-16 rounded object-cover"
            />
            <button
              onClick={() => setUploadedImage(null)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* Image Button */}
          <label
            htmlFor="imageUpload"
            className="cursor-pointer text-4xl hover:scale-110 transition ease-in-out text-gray-400"
          >
            📷
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
          {/* INPUT AREA */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} //  Enter to send
            placeholder="Type a message..."
            className="flex-1 resize-none h-12 rounded-lg bg-gray-800 text-white px-3 py-2 outline-none"
          />
          <button
            onClick={handleMessage}
            className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <PaperAirplaneIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* DELETE MESSAGE DIALOG */}
      <DeleteMessage
        isOpen={!!selectedMessageForDelete}
        messageId={selectedMessageForDelete?._id}
        senderID={selectedMessageForDelete?.senderID}
        receiverID={selectedMessageForDelete?.receiverID}
        isSender={
          String(selectedMessageForDelete?.senderID) === String(senderid)
        }
        onDelete={handleDeleteMessage}
        onClose={() => setSelectedMessageForDelete(null)}
      />
    </div>
  );
}

export default Chatcontainer;
