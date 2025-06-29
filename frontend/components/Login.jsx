"use client";

import { useState } from "react";
import { useUser } from "@/components/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { setUser, user } = useUser();
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, password }),
      });

     if (response.ok) {
  const data = await response.json();
console.log("Login response data:", data); 
localStorage.setItem("user", JSON.stringify(data)); 
setUser(data);  

  router.push("/dashboard");
}
 else {
        const errData = await response.json();
        console.error("Login failed:", errData);
        setMessage("❌ Login failed: " + (errData.error || ""));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("❌ Error logging in");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FF6A00] to-[#FFB347] flex justify-center items-center px-4 py-10">
      <form
        className="w-full max-w-md bg-white/10 p-6 sm:p-8 rounded-xl shadow-lg flex flex-col gap-5 items-center"
        onSubmit={handleLogin}
      >
        <img src="/user.png" alt="user" className="w-20 h-20" />
        <h1 className="text-3xl font-bold text-white">Login</h1>

        <div className="relative w-full">
          <img
            src="/user1.png"
            alt="icon"
            className="absolute left-3 top-3 w-5 h-5"
          />
          <input
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        <div className="relative w-full">
          <img
            src="/lock.png"
            alt="icon"
            className="absolute left-3 top-3 w-5 h-5"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#D9D9D9] border border-gray-300 placeholder-gray-700 outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-lg font-bold hover:bg-gray-800 transition"
        >
          Login
        </button>

        <a href="/register" className="text-white underline">
          Create new account
        </a>

        <p className="text-white font-semibold mt-4">
          {message}
          {user && ` — Welcome, ${user.full_name}`}
        </p>
      </form>
    </div>
  );
}
