import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const urlSegments = req.nextUrl.pathname.split("/").slice(3); // Extract path after `/api/proxy/`
  const backendPath = urlSegments.join("/");
  const backendUrl = `http://localhost:8000/api/${backendPath}`;

  try {
    let body = null;
    const headers: HeadersInit = {};

    // Check Content-Type
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      body = JSON.stringify(await req.json()); // Handle JSON body
      headers["Content-Type"] = "application/json"; // Set JSON header
    } else {
      body = await req.formData(); // Handle FormData
      // Do NOT manually set "Content-Type" for FormData, browser handles it
    }

    const response = await fetch(backendUrl, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const urlSegments = req.nextUrl.pathname.split("/").slice(3); // Extract path after `/api/proxy/`
  const backendPath = urlSegments.join("/");
  const backendUrl = `http://localhost:8000/api/${backendPath}`;

  try {
    const response = await fetch(backendUrl);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
