/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { User, Group } from "../../lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get("userId");
    const groupId = request.nextUrl.searchParams.get("groupId");

    const stats: any = {};

    // Get individual count
    if (userId) {
      const user = await User.findById(userId).select("containerCount");
      stats.individual = user?.containerCount || 0;
    }

    // Get group count
    if (groupId) {
      const group = await Group.findById(groupId).select("recycledCount");
      stats.group = group?.recycledCount || 0;
    } else if (userId) {
      // Get total from all user's groups
      const user = await User.findById(userId).populate(
        "groups",
        "recycledCount"
      );
      stats.group =
        user?.groups.reduce(
          (sum: number, group: any) => sum + group.recycledCount,
          0
        ) || 0;
    }

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
