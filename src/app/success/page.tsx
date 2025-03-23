"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#6BFFF8] to-[#409995]">
      <div 
        className="bg-[#B3E5FC] p-6 rounded-2xl shadow-md border-4 border-black flex items-center relative w-[400px]"
        style={{ 
            borderColor: "rgba(0, 0, 0, 0.5)" 
        }}
        >
        {/* Success Message */}
        <p className="text-lg font-bold text-gray-600 drop-shadow-md mx-auto">
          Command Sent Successfully !
        </p>
        
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

