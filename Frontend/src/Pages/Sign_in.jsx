import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Sign_in() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate()  
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email:email, Password:password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Login failed");
      } else {
         localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        toast.success(data.message) 

        setEmail("");
        setPassword("");

        navigate("/chat");
       
      }

    } catch (error) {
      toast.error("Server Error");
      console.error(error);
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
        Sign in to your account
      </h2>
    </div>

    <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-blue-700">
          Email
        </label>
        <input
          type="email"
          className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-blue-700">
          Password
        </label>
        <input
          type="password"
          className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
        onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <button
        className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-400">
        Sign in
      </button>
     <p className="text-center text-sm text-gray-500 mt-6">
  Not a Member so please?{" "}
  <a
    href="/signup"
    className="font-semibold text-indigo-600 hover:text-indigo-400"
  >
    Create a Account
  </a>
</p>
    </form>

  </div>
</div>
    </>
  )
}

