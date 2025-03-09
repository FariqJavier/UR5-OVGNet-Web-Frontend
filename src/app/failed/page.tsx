"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function Failed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error") || "Unknown";
  const message = searchParams.get("message") || "An error occurred";

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-red-600">Error {error}: {message}</h1>
      <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => router.push("/")}>Close</button>
    </div>
  );
}