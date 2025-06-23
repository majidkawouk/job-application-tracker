"use client";
import { useUser } from "./UserContext";

export default function Dashboard() {
    const { user } = useUser(); 
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        This is the dashboard page hello {user?.full_name || "Guest"}.
      </p>
    </div>
  );
}
