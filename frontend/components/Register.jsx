"use client";
import { useState } from "react";

export default function Register() {
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, password, email }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        setMessage("✅ User registered successfully");
      } else {
        const errorText = await response.text();
        setMessage("❌ Registration failed: " + errorText);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setMessage("❌ Error connecting to server");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#FF6A00] to-[#FFB347] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/10 p-6 sm:p-8 rounded-xl shadow-lg flex flex-col gap-5 items-center"
      >
        <img src="/user.png" alt="user" className="w-20 h-20" />
        <h1 className="text-3xl font-bold text-white">Ride the Trail</h1>

        {/* Username */}
        <div className="relative w-full">
          <img src="/user1.png" alt="icon" className="absolute left-3 top-3 w-5 h-5" />
          <input
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        {/* Gmail */}
        <div className="relative w-full">
          <img src="/gmail.png" alt="icon" className="absolute left-3 top-3 w-5 h-5" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Gmail"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative w-full">
          <img src="/lock.png" alt="icon" className="absolute left-3 top-3 w-5 h-5" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative w-full">
          <img src="/lock.png" alt="icon" className="absolute left-3 top-3 w-5 h-5" />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        <button className="bg-black text-white w-full py-3 rounded-lg font-bold hover:bg-gray-800 transition">
          Register
        </button>

        <a href="http://localhost:3000/login" className="text-white underline">
          Already have an account? Login →
        </a>

        <p className="text-white">{message}</p>
      </form>
    </div>
  );
}
