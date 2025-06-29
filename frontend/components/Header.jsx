"use client";

import Link from "next/link";
import { useUser } from "@/components/UserContext"; 
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1E1E1E] shadow-md text-white">
      <div className="flex items-center space-x-3 cursor-pointer">
        <Link href="/">
          <img src="/path.png" alt="logo" className="w-14 h-12" />
        </Link>
        <h1 className="text-2xl font-semibold">
          Job <span className="text-orange-400">Trail</span>
        </h1>
      </div>

      <div className="flex text-lg font-semibold text-black">
        {user ? (
          <>
           
            <button
              onClick={handleLogout}
              className="mx-2 bg-orange-500 rounded-md px-4 py-2 hover:bg-orange-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="mx-2 bg-orange-500 rounded-md px-4 py-2 hover:bg-orange-600 transition">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="mx-2 bg-orange-500 rounded-md px-4 py-2 hover:bg-orange-600 transition">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
