import mongoose, { Document, Schema } from "mongoose";

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: string;
  pointValue: number;
  rarity: string;
}

const BadgeSchema = new Schema<IBadge>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      default: "🏆",
    },
    criteria: {
      type: String,
      required: true,
    },
    pointValue: {
      type: Number,
      required: true,
      default: 0,
    },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },
  },
  {
    timestamps: true,
  }
);

// Index for lookups
BadgeSchema.index({ name: 1 });

export default mongoose.models.Badge || mongoose.model<IBadge>("Badge", BadgeSchema);
