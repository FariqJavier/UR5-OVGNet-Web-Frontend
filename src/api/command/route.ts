import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    if (!command) return NextResponse.json({ message: "No command provided" }, { status: 400 });
    return NextResponse.json({ message: "Command received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
