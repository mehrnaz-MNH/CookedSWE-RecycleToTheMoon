/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { User } from "../../lib/models";

// Get all users (for discovery)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const currentUserId = request.nextUrl.searchParams.get("excludeUserId");

    let query = {};
    if (currentUserId) {
      query = { _id: { $ne: currentUserId } };
    }

    const users = await User.find(query)
      .select("username avatar recyclingPersona containerCount points")
      .sort({ points: -1 })
      .limit(20);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
