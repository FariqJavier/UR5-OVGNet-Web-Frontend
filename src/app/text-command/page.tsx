"use client";
import { useState } from "react";
import { X, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TextCommand() {
  const [textCommand, setCommand] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/proxy/ros_text_command/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: textCommand.trim() }),
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
      <div 
        className="relative w-[500px] bg-[#C6E7E6] p-6 rounded-2xl border-4 border-black shadow-md"
        style={{ 
            borderColor: "rgba(0, 0, 0, 0.5)" 
        }}
        >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer shadow-md hover:shadow-lg transition">
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-700">Text Command</h2>
        <hr className="border-gray-500 my-2" />

        {/* Text Area */}
        <textarea
          className="w-full h-40 p-3 border-3 rounded-2xl bg-gray-100 text-gray-800"
          style={{ 
                borderColor: "rgba(0, 0, 0, 0.5)" 
            }}
          placeholder="Insert your command here . . ."
          value={textCommand}
          onChange={(e) => setCommand(e.target.value)}
        ></textarea>

        {/* Send Button */}
        <div className="flex justify-end mt-4">
          <button 
            className="flex items-center gap-2 bg-[#4A9797] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b8080] transition cursor-pointer"
            onClick={handleSubmit}
            >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
