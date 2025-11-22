import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { Badge } from "@/app/lib/models";

// GET all badges
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const badges = await Badge.find().sort({ rarity: 1, name: 1 });

    return NextResponse.json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}
