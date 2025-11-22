import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/lib/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, password } = body;

    console.log("Login attempt:", { username, passwordLength: password?.length });

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user by username (case-insensitive)
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

    console.log("User found:", user ? "yes" : "no");
    if (user) {
      console.log("Stored password:", user.password);
      console.log("Provided password:", password);
      console.log("Match:", user.password === password);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Check password (in production, use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      console.log("Password mismatch!");
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    console.log("Login successful!");

    // Return user ID for client-side storage
    return NextResponse.json({
      userId: user._id.toString(),
      username: user.username,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
