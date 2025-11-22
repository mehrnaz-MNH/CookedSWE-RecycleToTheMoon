/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { User } from "../../lib/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, friendId } = body;

    if (!userId || !friendId) {
      return NextResponse.json(
        { error: "userId and friendId are required" },
        { status: 400 }
      );
    }

    if (userId === friendId) {
      return NextResponse.json(
        { error: "Cannot add yourself as a friend" },
        { status: 400 }
      );
    }

    // Check if both users exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add friend to both users' friends lists using $addToSet (prevents duplicates)
    await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $addToSet: { friends: userId },
    });

    return NextResponse.json(
      { message: "Friend added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding friend:", error);
    return NextResponse.json(
      { error: "Failed to add friend" },
      { status: 500 }
    );
  }
}
