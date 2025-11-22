import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // In a real app with sessions, we'd destroy the session here
  // For now, we just return success and let the client clear localStorage
  return NextResponse.json({ message: "Logout successful" });
}
