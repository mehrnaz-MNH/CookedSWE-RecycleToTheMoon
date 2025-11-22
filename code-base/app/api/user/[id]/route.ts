import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/lib/models";

// GET user by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const user = await User.findById(id)
      .populate("groups", "name avatar")
      .populate("friends", "username avatar");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH - Update user profile
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const { username, avatar, recyclingPersona, location, profileSettings } = body;

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (recyclingPersona !== undefined) updateData.recyclingPersona = recyclingPersona;
    if (location !== undefined) updateData.location = location;
    if (profileSettings !== undefined) updateData.profileSettings = profileSettings;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error updating user:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
