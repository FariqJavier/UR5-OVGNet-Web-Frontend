"use client";
import { useState } from "react";
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
    <div className="flex flex-col items-center gap-4 p-4">
      <textarea className="border p-2 w-80" value={command} onChange={(e) => setCommand(e.target.value)} />
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}
