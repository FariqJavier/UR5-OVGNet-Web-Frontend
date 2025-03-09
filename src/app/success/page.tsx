"use client";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-green-600">Command Sent Successfully!</h1>
      <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => router.push("/")}>Close</button>
    </div>
  );
}
