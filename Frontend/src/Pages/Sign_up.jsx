import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Sign_up() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [textarea, setTextarea] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu|gov|)$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !ConfirmPassword.trim() ||
      !profileImage ||
      !phone ||
      !textarea.trim()
    ) {
      toast.error("Please fill all the fields");
    } else if (phone.length < 10 || phone.length > 15) {
      toast.error("Phone Number must be between 10 and 15 digits");
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number & special character",
      );
    } else if (password !== ConfirmPassword) {
      toast.error("Password and Confirm Password should be same");
    } else {
      const formData = new FormData();
      formData.append("profilePic", profileImage);
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Password", password);
      formData.append("Phone", phone);
      formData.append("Bio", textarea)
      try {
        const userResponse = await fetch(
          "http://localhost:3000/api/v1/Register",
          {
            method: "POST",
            body: formData,
          },
        );
        const response = await userResponse.json();
        if (!userResponse.ok) {
          toast.error(response.message || "Registration failed");
          return;
        }

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({
          id: response.user._id,
          Name: response.user.Name,
          ProfilePic: response.user.profilePic,
          Email: response.user.Email,
          Phone: response.user.Phone,
          Bio: response.user.Bio
        }));

        toast.success("Account created successfully");

        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        setPreview(null);

        setTimeout(() => {
          navigate("/chat");
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Network error or server issue");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* FORM CARD */}
        <div className="w-full max-w-md bg-white rounded-lg border border-blue-700 shadow-lg p-8">
          <div className="text-center">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-6 text-2xl font-bold text-blue-700">
              Sign up to your account
            </h2>
          </div>

          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            {/* Profile CARD */}
            <label className="cursor-pointer flex  justify-center items-cente">
              <div className="  w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                <img
                  src={
                    preview
                      ? preview
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="text-sm text-gray-500">Click image to upload</p>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Phone_Number */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Phone NUmber
              </label>
              <input
                type="tel"
                value={phone || ""}
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* confirm password */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={ConfirmPassword}
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-blue-700">
                Bio
              </label>

              <textarea
                value={textarea}
                rows={4}
                placeholder="Write your bio..."
                className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                onChange={(e) => setTextarea(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-400"
            //onClick={handleSubmit}
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-500 mt-6">
              already you have Account ? please{" "}
              <a
                href="/signin"
                className="font-semibold text-indigo-600 hover:text-indigo-400"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
