import mongoose, { Document, Schema } from "mongoose";

export interface IGroup extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  recycledCount: number;
  location: string;
  type: string;
  avatar: string;
  description: string;
  dateCreated: Date;
  admins: mongoose.Types.ObjectId[];
  points: number;
  challenges: mongoose.Types.ObjectId[];
}

const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recycledCount: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["standard", "geo"],
      default: "standard",
    },
    avatar: {
      type: String,
      default: "🌿",
    },
    description: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    points: {
      type: Number,
      default: 0,
    },
    challenges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Challenge",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
GroupSchema.index({ location: 1, type: 1 });
GroupSchema.index({ points: -1 });
GroupSchema.index({ name: 1 });

export default mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
