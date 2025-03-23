"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#6BFFF8] to-[#409995]">
      <div 
        className="bg-[#B3E5FC] p-6 rounded-2xl shadow-md border-4 border-black flex flex-col items-center relative w-[450px]"
        style={{ 
            borderColor: "rgba(0, 0, 0, 0.5)" 
        }}
        >
        {/* Error Title */}
        <p className="text-lg font-bold text-gray-600 drop-shadow-md">
          Command Failed To Sent
        </p>
        <hr className="w-full border-gray-500 mt-1" />

        {/* Error Details */}
        <div className="bg-gray-300 mt-4 p-4 rounded-md w-full text-sm text-gray-600 border border-gray-400">
          <p>ERROR CODE: 404</p>
          <p>ERROR MESSAGE: AUTHORIZED</p>
        </div>

        {/* Close Button */}
        <button 
            className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer shadow-md hover:shadow-lg transition"
            onClick={() => router.push("/")}
            >
            <X size={20} />
        </button>
      </div>
    </div>
  );
}