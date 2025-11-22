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

    // Find both users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already friends
    if (user.friends.includes(friendId)) {
      return NextResponse.json(
        { error: "Already friends with this user" },
        { status: 400 }
      );
    }

    // Add friend to both users' friends lists
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return NextResponse.json(
      { message: "Friend added successfully", user },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
