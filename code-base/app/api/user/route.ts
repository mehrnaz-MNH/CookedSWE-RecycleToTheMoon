import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { User } from "../../lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // For now, we'll use a hardcoded user ID or get from session
    // In production, you'd get this from authentication
    const userId =
      request.nextUrl.searchParams.get("userId") || "000000000000000000000001";

    const user = await User.findById(userId)
      .populate("friends", "username avatar")
      .populate("groups", "name avatar");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, updates } = body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
