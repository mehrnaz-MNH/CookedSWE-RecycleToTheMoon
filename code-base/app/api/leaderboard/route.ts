import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { User, Group } from "../../lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const type = request.nextUrl.searchParams.get("type") || "users"; // 'users' or 'groups'
    const period = request.nextUrl.searchParams.get("period") || "all-time"; // 'weekly', 'monthly', 'all-time'
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    let leaderboard;

    if (type === "users") {
      // User leaderboard
      const sortField =
        period === "monthly" ? "containerCountCurrentMonth" : "points";

      leaderboard = await User.find()
        .select(
          "username avatar recyclingPersona location points containerCount containerCountCurrentMonth"
        )
        .sort({ [sortField]: -1 })
        .limit(limit);

      // Add rank
      leaderboard = leaderboard.map((user, index) => ({
        rank: index + 1,
        userId: user._id,
        username: user.username,
        avatar: user.avatar,
        recyclingPersona: user.recyclingPersona,
        location: user.location,
        points: user.points,
        itemsRecycled:
          period === "monthly"
            ? user.containerCountCurrentMonth
            : user.containerCount,
      }));
    } else {
      // Group leaderboard
      const sortField = period === "monthly" ? "recycledCount" : "points";

      const groups = await Group.find()
        .select("name avatar location points recycledCount members")
        .sort({ [sortField]: -1 })
        .limit(limit);

      leaderboard = groups.map((group, index) => ({
        rank: index + 1,
        groupId: group._id,
        name: group.name,
        avatar: group.avatar,
        location: group.location,
        points: group.points,
        itemsRecycled: group.recycledCount,
        memberCount: group.members.length,
      }));
    }

    return NextResponse.json({ leaderboard, type, period }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
