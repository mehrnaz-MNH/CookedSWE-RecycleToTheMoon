import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
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
  co2Saved: number;
  profileSettings: {
    notifications: boolean;
    privacy: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "🌱",
    },
    recyclingPersona: {
      type: String,
      default: "Eco Beginner",
    },
    containerCount: {
      type: Number,
      default: 0,
    },
    containerCountCurrentMonth: {
      type: Number,
      default: 0,
    },
    monthStreak: {
      type: Number,
      default: 0,
    },
    digitalCoins: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    badges: [
      {
        id: String,
        name: String,
        earnedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    points: {
      type: Number,
      default: 0,
    },
    co2Saved: {
      type: Number,
      default: 0,
    },
    profileSettings: {
      notifications: {
        type: Boolean,
        default: true,
      },
      privacy: {
        type: String,
        enum: ["public", "friends", "private"],
        default: "public",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
UserSchema.index({ username: 1 });
UserSchema.index({ location: 1 });
UserSchema.index({ points: -1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
