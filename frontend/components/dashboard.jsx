"use client";
import { useUser } from "./UserContext";

export default function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        Hello <strong>{user.full_name}</strong>, welcome to your dashboard!
      </p>
    </div>
  );
}
