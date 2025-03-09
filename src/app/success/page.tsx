"use client";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#6BFFF8] to-[#409995]">
      <div className="bg-[#B3E5FC] p-6 rounded-2xl shadow-md border border-black flex items-center relative w-[400px]">
        {/* Success Message */}
        <p className="text-lg font-bold text-gray-800 drop-shadow-md mx-auto">
          Command Sent Successfully !
        </p>
        
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-xl text-gray-800"
          onClick={() => router.push("/")}
        >
          ✖
        </button>
      </div>
    </div>
  );
}

