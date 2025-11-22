import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({}).select('username email password');

    return NextResponse.json({
      count: users.length,
      users: users.map(u => ({
        username: u.username,
        email: u.email,
        hasPassword: !!u.password,
        passwordLength: u.password?.length
      }))
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: String(error) },
      { status: 500 }
    );
  }
}
