import mongoose, { Document, Schema } from "mongoose";

export interface IChallenge extends Document {
  title: string;
  description: string;
  targetCount: number;
  startDate: Date;
  endDate: Date;
  pointReward: number;
  participantIds: mongoose.Types.ObjectId[];
  type: string;
  badgeReward?: mongoose.Types.ObjectId;
  status: string;
}

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetCount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    pointReward: {
      type: Number,
      required: true,
      default: 0,
    },
    participantIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    type: {
      type: String,
      enum: ["individual", "group", "global"],
      required: true,
    },
    badgeReward: {
      type: Schema.Types.ObjectId,
      ref: "Badge",
      default: null,
    },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed", "expired"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
ChallengeSchema.index({ status: 1, endDate: -1 });
ChallengeSchema.index({ type: 1 });

export default mongoose.models.Challenge || mongoose.model<IChallenge>("Challenge", ChallengeSchema);
