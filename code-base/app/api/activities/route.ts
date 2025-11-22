/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { Activity } from "../../lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get("userId");
    const type = request.nextUrl.searchParams.get("type") || "public"; // 'public', 'friends', 'user'
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");

    const query: any = {};

    if (type === "user" && userId) {
      // Get user's activities only
      query.userId = userId;
    } else if (type === "friends" && userId) {
      // Get activities from user's friends
      // This would need friend IDs from the user document
      // For now, we'll get public activities
      query.visibility = { $in: ["public", "friends"] };
    } else {
      // Get all public activities
      query.visibility = "public";
    }

    const activities = await Activity.find(query)
      .sort({ datetime: -1 })
      .limit(limit)
      .populate("userId", "username avatar recyclingPersona")
      .populate("groupId", "name avatar");

    return NextResponse.json({ activities }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, type, content, groupId, stats, visibility } = body;

    const activity = await Activity.create({
      userId,
      type,
      content,
      groupId,
      stats,
      visibility: visibility || "public",
      datetime: new Date(),
    });

    const populatedActivity = await Activity.findById(activity._id)
      .populate("userId", "username avatar recyclingPersona")
      .populate("groupId", "name avatar");

    return NextResponse.json({ activity: populatedActivity }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
