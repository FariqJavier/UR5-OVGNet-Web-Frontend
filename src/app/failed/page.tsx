"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#6BFFF8] to-[#409995]">
      <div className="bg-[#B3E5FC] p-6 rounded-2xl shadow-md border border-black flex flex-col items-center relative w-[450px]">
        {/* Error Title */}
        <p className="text-lg font-bold text-gray-800 drop-shadow-md">
          Command Failed To Sent
        </p>
        <hr className="w-full border-gray-700 mt-1" />

        {/* Error Details */}
        <div className="bg-gray-300 mt-4 p-4 rounded-md w-full text-sm text-gray-800 border border-gray-400">
          <p>ERROR CODE: 404</p>
          <p>ERROR MESSAGE: AUTHORIZED</p>
        </div>

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