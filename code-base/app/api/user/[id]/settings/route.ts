import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/lib/models";

// PATCH - Update user settings
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const { notifications, privacy } = body;

    const updateData: any = {};

    if (notifications !== undefined) {
      updateData["profileSettings.notifications"] = notifications;
    }
    if (privacy !== undefined) {
      updateData["profileSettings.privacy"] = privacy;
    }

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
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
