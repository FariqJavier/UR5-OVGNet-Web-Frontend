"use client";
import { useState } from "react";
import { X, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TextCommand() {
  const [command, setCommand] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const result = await response.json();

      if (response.ok) router.push("/success");
      else router.push(`/failed?error=${response.status}&message=${result.message}`);
    } catch (error) {
      router.push(`/failed?error=500&message=Internal Server Error`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6BFFF8] to-[#409995]">
      <div className="relative w-[500px] bg-[#C6E7E6] p-6 rounded-lg border-2 border-black shadow-md">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-800 hover:text-black">
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">Text Command</h2>
        <hr className="border-gray-700 my-2" />

        {/* Text Area */}
        <textarea
          className="w-full h-40 p-3 border rounded-md bg-gray-100 text-gray-800"
          placeholder="Insert your command here . . ."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        ></textarea>

        {/* Send Button */}
        <div className="flex justify-end mt-4">
          <button className="flex items-center gap-2 bg-[#4A9797] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b8080] transition">
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
