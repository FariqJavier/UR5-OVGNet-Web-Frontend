"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, X, Loader, Send } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function VoiceCommand() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<{ code: number; message: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  const startRecording = async () => {
    setTranscript("");
    setIsRecording(true);
  
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      console.error("Browser does not support audio recording.");
      setError({ code: 500, message: "Browser does not support audio recording." });
      setIsRecording(false);
      return;
    }
  
    try {
      // Check if a microphone is available
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasMic = devices.some(device => device.kind === "audioinput");
  
      if (!hasMic) {
        console.error("No microphone detected.");
        setError({ code: 404, message: "No microphone detected." });
        setIsRecording(false);
        return;
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
  
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
  
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        setIsModalOpen(true);
        audioChunksRef.current = [];
      };
  
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError({ code: 403, message: "Microphone access denied or unavailable." });
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRecording = () => {
    setIsRecording((prev) => {
      if (!prev) startRecording();
      else stopRecording();
      return !prev;  // Toggle isRecording state
    });
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("wav_file", audioBlob, "audio.wav");

    try {
      const response = await fetch("/api/proxy/ros_voice_command/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to transcribe audio");

      const data = await response.json();
      setTranscript(data.transcript);

      if (response.ok) {
        router.push("/success");
      } else {
        const errorData = await response.json();
        setError({ code: response.status, message: errorData.message || "Unknown error" });
        router.push(`/failed?code=${response.status}&message=${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setError({ code: 500, message: "Internal Server Error" });
      router.push(`/failed?code=500&message=Internal Server Error`);
      setTranscript("Error transcribing audio.");
    } finally {
      setIsModalOpen(false);
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
        <button className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer shadow-md hover:shadow-lg transition">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-700">Voice Command</h2>
        <hr className="border-gray-500 my-2" />

        <div className="flex justify-center my-8">
          <button
            className={`w-28 h-28 flex items-center justify-center rounded-full border-4 cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-300 transition ${
              isRecording
                ? "border-red-500 bg-red-200 animate-pulse"
                : "border-gray-500 bg-gray-200"
            }`}
            // onMouseDown={startRecording}
            // onMouseUp={stopRecording}
            onClick={handleRecording}
          >
            {isModalOpen ? <Loader size={60} className="animate-spin" /> : <Mic size={60} className="text-gray-700" />}
          </button>
        </div>

        <div className="text-center text-gray-800">
          {isRecording ? (
            <p className="text-red-600 font-medium">Recording...</p>
          ) : isModalOpen ? (
            <p className="text-blue-600 font-medium">Uploading & Transcribing...</p>
          ) : transcript ? (
            <p className="font-medium">{transcript.replace(/"/g, "'")}</p>
          ) : (
            <p>Press the mic to record...</p>
          )}
        </div>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-200 rounded-xl p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold text-gray-500 my-4">Send Recorded Audio</Dialog.Title>
          <audio controls src={audioBlob ? URL.createObjectURL(audioBlob) : ""} className="w-full mt-2" />
          <div className="flex justify-end mt-4">
            <button 
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-full mr-2 transition cursor-pointer"
                onClick={() => setIsModalOpen(false)} 
                >
                Cancel
            </button>
            <button 
                className="flex items-center gap-2 bg-[#4A9797] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b8080] transition cursor-pointer"
                onClick={uploadAudio}
                >
                <Send size={18} />
                Send
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
      </div>
    </div>
  );
}