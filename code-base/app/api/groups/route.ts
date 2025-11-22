/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { Group, User } from "../../lib/models";

// Get groups (all or by user)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get("userId");
    const type = request.nextUrl.searchParams.get("type"); // 'user' or 'all'

    let groups;

    if (type === "user" && userId) {
      // Get user's groups
      const user = await User.findById(userId).populate("groups");
      groups = user?.groups || [];
    } else {
      // Get all groups (for discovery)
      groups = await Group.find()
        .sort({ points: -1 })
        .limit(20)
        .populate("members", "username avatar");
    }

    return NextResponse.json({ groups }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new group
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, location, type, avatar, creatorId } = body;

    const group = await Group.create({
      name,
      description,
      location,
      type: type || "standard",
      avatar: avatar || "♻️",
      members: [creatorId],
      admins: [creatorId],
      dateCreated: new Date(),
    });

    // Add group to user's groups
    await User.findByIdAndUpdate(creatorId, {
      $push: { groups: group._id },
    });

    return NextResponse.json({ group }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Join a group
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { groupId, userId } = body;

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(userId, { $addToSet: { groups: groupId } });

    return NextResponse.json({ group }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
