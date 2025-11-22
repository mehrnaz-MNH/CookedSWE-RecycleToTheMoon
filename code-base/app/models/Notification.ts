import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  content: string;
  read: boolean;
  datetime: Date;
  relatedId?: mongoose.Types.ObjectId;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["friend_request", "group_invite", "achievement", "challenge_update", "badge_earned", "leaderboard_update"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
NotificationSchema.index({ userId: 1, read: 1, datetime: -1 });

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
