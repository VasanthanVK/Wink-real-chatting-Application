import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../Socket";
import "../App.css";

export default function LiveLocation() {

  const { receiverId } = useParams(); // Get receiver ID from URL
  
  // your own position
  const [position, setPosition] = useState([9.9193253, 78.163347]);

  // receiver live location
  const [userLocation, setUserLocation] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // ✅ Track your GPS and send to receiver
  useEffect(() => {

    if (!userId || !receiverId) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        // ✅ SEND location to receiver
        socket.emit("sendLocation", {
          senderID: userId,
          receiverID: receiverId,
          latitude: lat,
          longitude: lng,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);

  }, [userId, receiverId]);

  // ✅ Receive live location from socket
  useEffect(() => {

    const handleReceiveLocation = (data) => {
      console.log("Live Location:", data);

      setUserLocation([
        data.latitude,
        data.longitude,
      ]);
    };

    socket.on("receiveLocation", handleReceiveLocation);

    return () => socket.off("receiveLocation", handleReceiveLocation);

  }, []);

  return (
    <div className="space">
      <div className="circle-map">

        <MapContainer center={position} zoom={15}>
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* YOUR LOCATION */}
          <Marker position={position}>
            <Popup>You are here 📍</Popup>
          </Marker>

          <Circle center={position} radius={50} />

          {/* RECEIVER LOCATION */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Friend Live Location 🚀</Popup>
            </Marker>
          )}

        </MapContainer>

      </div>
    </div>
  );
}