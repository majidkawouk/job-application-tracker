"use client";

import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  const handledash = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-gradient-to-br from-[#FF6A00] to-[#FFB347] w-full min-h-screen flex flex-col items-center justify-start py-10 px-6 text-slate-800">
      <img src="motorway.png" className="absolute opacity-10" alt="" />
      <ul className="text-3xl list-disc font-bold">
        <li className="my-9">🏞 Welcome to Job Trail</li>
        <li className="my-9">Your personal job application tracker.</li>
        <li className="my-9">Stay organized, never miss an opportunity</li>
        <li className="my-9">
          Track every step of your job hunt from application to offer.
        </li>
      </ul>

      <div className="flex flex-col items-center gap-4 mt-10 text-white">
    
  
        <button
          onClick={handledash}
          className="bg-black hover:bg-gray-900 transition rounded-md px-6 py-3 text-xl  z-30 font-semibold shadow"
        >
          View Your Dashboard
        </button>
      </div>
    </div>
  );
}
