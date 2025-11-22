import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  quantity: number;
  datetime: Date;
  itemType: string;
  pointsEarned: number;
  receiptUrl?: string;
  verificationStatus: string;
  groupId?: mongoose.Types.ObjectId;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    itemType: {
      type: String,
      enum: ["plastic", "aluminum", "glass", "paper", "cardboard", "electronics", "other"],
      required: true,
    },
    pointsEarned: {
      type: Number,
      required: true,
      default: 0,
    },
    receiptUrl: {
      type: String,
      default: null,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
TransactionSchema.index({ userId: 1, datetime: -1 });
TransactionSchema.index({ groupId: 1 });
TransactionSchema.index({ verificationStatus: 1 });

export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);
