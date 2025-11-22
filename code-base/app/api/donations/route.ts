/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { Donation, User, Activity } from "../../lib/models";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { fromUserId, toUserId, charityId, amount, type } = body;

    // Check if user has enough coins
    const fromUser = await User.findById(fromUserId);
    if (!fromUser || fromUser.digitalCoins < amount) {
      return NextResponse.json(
        { error: "Insufficient coins" },
        { status: 400 }
      );
    }

    // Create donation record
    const donation = await Donation.create({
      fromUserId,
      toUserId: type === "friend" ? toUserId : undefined,
      charityId: type === "charity" ? charityId : undefined,
      amount,
      type,
      datetime: new Date(),
    });

    // Deduct coins from sender
    await User.findByIdAndUpdate(fromUserId, {
      $inc: { digitalCoins: -amount },
    });

    // Add coins to recipient if it's a friend donation
    if (type === "friend" && toUserId) {
      await User.findByIdAndUpdate(toUserId, {
        $inc: { digitalCoins: amount },
      });

      // Create activity for recipient
      await Activity.create({
        userId: toUserId,
        type: "achievement",
        content: `Received ${amount} coins from a friend!`,
        datetime: new Date(),
        stats: { points: amount },
        visibility: "friends",
      });
    }

    return NextResponse.json({ donation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const donations = await Donation.find({
      $or: [{ fromUserId: userId }, { toUserId: userId }],
    })
      .sort({ datetime: -1 })
      .populate("fromUserId", "username avatar")
      .populate("toUserId", "username avatar")
      .limit(20);

    return NextResponse.json({ donations }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
