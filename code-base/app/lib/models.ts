import mongoose, { Schema, Document, Model } from "mongoose";

// User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  recyclingPersona: string;
  containerCount: number;
  containerCountCurrentMonth: number;
  monthStreak: number;
  digitalCoins: number;
  location: string;
  groups: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  dateJoined: Date;
  badges: {
    id: string;
    name: string;
    earnedDate: Date;
  }[];
  points: number;
  co2Saved: string;
  profileSettings: {
    notifications: boolean;
    privacy: string;
  };
}

// Transaction Interface
export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  quantity: number;
  datetime: Date;
  itemType: string;
  pointsEarned: number;
  receiptUrl?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  groupId?: mongoose.Types.ObjectId;
}

// Group Interface
export interface IGroup extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  recycledCount: number;
  location: string;
  type: "standard" | "geo";
  avatar: string;
  description: string;
  dateCreated: Date;
  admins: mongoose.Types.ObjectId[];
  points: number;
  challenges: mongoose.Types.ObjectId[];
}

// Activity Interface
export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: "recycled" | "achievement" | "joined_group" | "challenge_completed";
  content: string;
  groupId?: mongoose.Types.ObjectId;
  datetime: Date;
  stats: {
    items?: number;
    points?: number;
  };
  visibility: "public" | "friends" | "group";
}

// Badge Interface
export interface IBadge extends Document {
  name: string;
  description: string;
  emoji: string;
  criteria: string;
  pointValue: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

// Donation Interface
export interface IDonation extends Document {
  fromUserId: mongoose.Types.ObjectId;
  toUserId?: mongoose.Types.ObjectId;
  charityId?: string;
  amount: number;
  datetime: Date;
  type: "friend" | "charity";
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "password" },
    avatar: { type: String, default: "🌱" },
    recyclingPersona: { type: String, default: "Eco Enthusiast" },
    containerCount: { type: Number, default: 0 },
    containerCountCurrentMonth: { type: Number, default: 0 },
    monthStreak: { type: Number, default: 0 },
    digitalCoins: { type: Number, default: 0 },
    location: { type: String, default: "" },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dateJoined: { type: Date, default: Date.now },
    badges: [
      {
        id: String,
        name: String,
        earnedDate: { type: Date, default: Date.now },
      },
    ],
    points: { type: Number, default: 0 },
    co2Saved: { type: String, default: "0kg" },
    profileSettings: {
      notifications: { type: Boolean, default: true },
      privacy: { type: String, default: "public" },
    },
  },
  { timestamps: true }
);

// Transaction Schema
const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
    datetime: { type: Date, default: Date.now },
    itemType: { type: String, required: true },
    pointsEarned: { type: Number, default: 0 },
    receiptUrl: String,
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

// Group Schema
const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    recycledCount: { type: Number, default: 0 },
    location: { type: String, default: "" },
    type: { type: String, enum: ["standard", "geo"], default: "standard" },
    avatar: { type: String, default: "♻️" },
    description: { type: String, default: "" },
    dateCreated: { type: Date, default: Date.now },
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    points: { type: Number, default: 0 },
    challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  },
  { timestamps: true }
);

// Activity Schema
const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["recycled", "achievement", "joined_group", "challenge_completed"],
      required: true,
    },
    content: { type: String, required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    datetime: { type: Date, default: Date.now },
    stats: {
      items: Number,
      points: Number,
    },
    visibility: {
      type: String,
      enum: ["public", "friends", "group"],
      default: "public",
    },
  },
  { timestamps: true }
);

// Badge Schema
const BadgeSchema = new Schema<IBadge>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    emoji: { type: String, required: true },
    criteria: { type: String, required: true },
    pointValue: { type: Number, default: 0 },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },
  },
  { timestamps: true }
);

// Donation Schema
const DonationSchema = new Schema<IDonation>(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User" },
    charityId: String,
    amount: { type: Number, required: true },
    datetime: { type: Date, default: Date.now },
    type: { type: String, enum: ["friend", "charity"], required: true },
  },
  { timestamps: true }
);

// Create indexes
UserSchema.index({ username: 1, location: 1, points: -1 });
TransactionSchema.index({ userId: 1, datetime: -1, groupId: 1 });
GroupSchema.index({ location: 1, type: 1, points: -1 });
ActivitySchema.index({ userId: 1, datetime: -1, groupId: 1 });

// Export Models
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
export const Group: Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
export const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);
export const Badge: Model<IBadge> =
  mongoose.models.Badge || mongoose.model<IBadge>("Badge", BadgeSchema);
export const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);
