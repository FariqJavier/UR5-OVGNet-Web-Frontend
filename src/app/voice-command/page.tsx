"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VoiceCommand() {
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRecording) {
      // Simulated voice recording logic
      setTimeout(() => {
        const success = Math.random() > 0.2; // Simulate API response
        if (success) router.push("/success");
        else router.push(`/failed?error=400&message=Voice command failed`);
      }, 3000);
    }
  }, [isRecording, router]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Recording..." : "Start Voice Command"}
      </button>
    </div>
  );
}