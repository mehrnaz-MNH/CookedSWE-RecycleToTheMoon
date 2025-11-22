import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { Transaction, User, Activity } from "../../lib/models";

// Get user transactions
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get("userId");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const transactions = await Transaction.find({ userId })
      .sort({ datetime: -1 })
      .limit(limit);

    return NextResponse.json({ transactions }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create new transaction (recycle items)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, quantity, itemType, receiptUrl, groupId } = body;

    // Calculate points (e.g., 1 point per item)
    const pointsEarned = quantity;

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      quantity,
      itemType,
      pointsEarned,
      receiptUrl,
      groupId,
      verificationStatus: "verified", // Auto-verify for now
    });

    // Update user stats
    const co2PerItem = 0.05; // kg CO2 saved per item (example)
    await User.findByIdAndUpdate(userId, {
      $inc: {
        containerCount: quantity,
        containerCountCurrentMonth: quantity,
        digitalCoins: pointsEarned,
        points: pointsEarned,
      },
      $set: {
        co2Saved: `${(
          parseFloat((await User.findById(userId))?.co2Saved || "0") +
          quantity * co2PerItem
        ).toFixed(1)}kg`,
      },
    });

    // Update group stats if applicable
    if (groupId) {
      await User.findByIdAndUpdate(groupId, {
        $inc: {
          recycledCount: quantity,
          points: pointsEarned,
        },
      });
    }

    // Create activity
    await Activity.create({
      userId,
      type: "recycled",
      content: `Recycled ${quantity} ${itemType}`,
      groupId,
      datetime: new Date(),
      stats: {
        items: quantity,
        points: pointsEarned,
      },
      visibility: "public",
    });

    return NextResponse.json({ transaction, pointsEarned }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
