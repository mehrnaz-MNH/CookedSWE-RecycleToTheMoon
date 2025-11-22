import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  content: string;
  groupId?: mongoose.Types.ObjectId;
  datetime: Date;
  stats?: {
    items?: number;
    points?: number;
  };
  visibility: string;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["recycled", "achievement", "joined_group", "challenge_completed", "friend_added", "badge_earned"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    stats: {
      items: {
        type: Number,
        default: null,
      },
      points: {
        type: Number,
        default: null,
      },
    },
    visibility: {
      type: String,
      enum: ["public", "friends", "group"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
ActivitySchema.index({ userId: 1, datetime: -1 });
ActivitySchema.index({ groupId: 1, datetime: -1 });
ActivitySchema.index({ visibility: 1, datetime: -1 });

export default mongoose.models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);
