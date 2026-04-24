import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function ChatPerson({setSelectedChat}) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user) {
      setError("Please login first");
      return;
    }

    const getProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/v1/Profile",
          {
            headers: {
              Authorization: token
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profiles");
        }

        if (data.user && Array.isArray(data.user)) {
          setUserProfiles(data.user);
          setError(null);
        } else {
          setUserProfiles([]);
        }

      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "Failed to load profiles");
        setUserProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    getProfiles();

  }, [token]);

  if (loading) {
    return <div className="h-full flex items-center justify-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!userProfiles.length) {
    return <div className="h-full flex items-center justify-center text-gray-500">No users available</div>;
  }
console.log(userProfiles);
console.log(user);

  return (
    <div className="h-full bg-white flex flex-col flex-1 overflow-y-auto p-2 space-y-2">
      {userProfiles.filter(profile => profile._id !== user._id)
        .map((profile, index) => (
          <div 
            key={profile._id || index} 
            onClick={() => setSelectedChat(profile)} 
            className="flex items-center gap-7 p-4 border-b text-lg font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {/* Profile Image */}
            <img
              src={profile.profilePic}
              onError={(e) => {
                e.target.src = "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
              }}
              className="w-16 h-16 rounded-full object-cover"
              alt={profile.Name || "profile"}
            />

            {/* Name + Bio */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {profile.Name}
              </h2>

              <p className="text-sm text-gray-500 truncate">
                {profile.Bio || "Good vibes only always"}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ChatPerson
