/* eslint-disable @typescript-eslint/no-explicit-any */
// Load .env file
import "dotenv/config";

import mongoose from "mongoose";

// Import models AFTER mongoose is ready
async function seedDatabase() {
  try {
    // Connect first
    const MONGODB_URI =
      process.env.NEXT_PUBLIC_MONGODB_URL ||
      process.env.MONGODB_URL ||
      process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("🌱 Connected to MongoDB");

    // Clear cached models to ensure we use the latest schema
    Object.keys(mongoose.connection.models).forEach((key) => {
      delete (mongoose.connection.models as any)[key];
    });

    // Now import models with fresh schema
    const { User, Group, Activity, Badge, Transaction } = await import(
      "../app/lib/models"
    );

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Group.deleteMany({});
    await Activity.deleteMany({});
    await Transaction.deleteMany({});
    await Badge.deleteMany({});
    console.log("✅ Existing data cleared");

    // Create badges first
    console.log("🏆 Creating badges...");
    const badges = await Badge.create([
      {
        name: "Eco Beginner",
        description: "Start your recycling journey",
        emoji: "🌱",
        criteria: "Recycle your first item",
        pointValue: 10,
        rarity: "common",
      },
      {
        name: "Eco Enthusiast",
        description: "Passionate about recycling",
        emoji: "♻️",
        criteria: "Recycle 50 items",
        pointValue: 50,
        rarity: "common",
      },
      {
        name: "Green Champion",
        description: "Leading by example",
        emoji: "🌿",
        criteria: "Recycle 200 items",
        pointValue: 100,
        rarity: "rare",
      },
      {
        name: "Sustainability Guru",
        description: "Master of recycling",
        emoji: "🌍",
        criteria: "Recycle 500 items",
        pointValue: 250,
        rarity: "epic",
      },
      {
        name: "Planet Saver",
        description: "Legendary recycler",
        emoji: "⭐",
        criteria: "Recycle 1000 items",
        pointValue: 500,
        rarity: "legendary",
      },
      {
        name: "Recycling Pro",
        description: "Professional level recycler",
        emoji: "💪",
        criteria: "Maintain 30 day streak",
        pointValue: 150,
        rarity: "rare",
      },
    ]);
    console.log(`✅ Created ${badges.length} badges`);

    // Create groups
    console.log("🏢 Creating groups...");
    const groups = await Group.create([
      {
        name: "Green Team",
        description: "Local community focusing on neighborhood recycling",
        location: "San Francisco, CA",
        avatar: "🌿",
        members: [],
        admins: [],
        recycledCount: 2450,
        points: 12500,
        type: "standard",
      },
      {
        name: "Ocean Savers",
        description: "Dedicated to cleaning beaches and reducing ocean plastic",
        location: "Miami, FL",
        avatar: "🌊",
        members: [],
        admins: [],
        recycledCount: 3120,
        points: 15600,
        type: "standard",
      },
      {
        name: "Eco Warriors",
        description: "Champions of sustainable living and zero waste",
        location: "New York, NY",
        avatar: "⚡",
        members: [],
        admins: [],
        recycledCount: 1890,
        points: 9450,
        type: "geo",
      },
    ]);
    console.log(`✅ Created ${groups.length} groups`);

    // Create users with passwords
    console.log("👥 Creating users...");
    const users = await User.create([
      {
        username: "testuser",
        email: "test@example.com",
        password: "password",
        avatar: "🌱",
        recyclingPersona: "Eco Enthusiast",
        containerCount: 234,
        containerCountCurrentMonth: 45,
        monthStreak: 3,
        digitalCoins: 2340,
        location: "San Francisco, CA",
        groups: [groups[0]._id],
        friends: [],
        badges: [
          {
            id: badges[0]._id.toString(),
            name: badges[0].name,
            earnedDate: new Date(),
          },
          {
            id: badges[1]._id.toString(),
            name: badges[1].name,
            earnedDate: new Date(),
          },
        ],
        points: 2340,
        co2Saved: "45kg",
        profileSettings: {
          notifications: true,
          privacy: "public",
        },
      },
      {
        username: "alexgreen",
        email: "alex@example.com",
        password: "password",
        avatar: "🌍",
        recyclingPersona: "Green Champion",
        containerCount: 456,
        containerCountCurrentMonth: 67,
        monthStreak: 5,
        digitalCoins: 4560,
        location: "New York, NY",
        groups: [groups[0]._id, groups[2]._id],
        friends: [],
        badges: [
          {
            id: badges[0]._id.toString(),
            name: badges[0].name,
            earnedDate: new Date(),
          },
          {
            id: badges[1]._id.toString(),
            name: badges[1].name,
            earnedDate: new Date(),
          },
          {
            id: badges[2]._id.toString(),
            name: badges[2].name,
            earnedDate: new Date(),
          },
        ],
        points: 4560,
        co2Saved: "78kg",
        profileSettings: {
          notifications: true,
          privacy: "friends",
        },
      },
      {
        username: "sarahchen",
        email: "sarah@example.com",
        password: "password",
        avatar: "🌸",
        recyclingPersona: "Sustainability Guru",
        containerCount: 789,
        containerCountCurrentMonth: 98,
        monthStreak: 8,
        digitalCoins: 7890,
        location: "Miami, FL",
        groups: [groups[1]._id],
        friends: [],
        badges: [
          {
            id: badges[0]._id.toString(),
            name: badges[0].name,
            earnedDate: new Date(),
          },
          {
            id: badges[1]._id.toString(),
            name: badges[1].name,
            earnedDate: new Date(),
          },
          {
            id: badges[2]._id.toString(),
            name: badges[2].name,
            earnedDate: new Date(),
          },
          {
            id: badges[3]._id.toString(),
            name: badges[3].name,
            earnedDate: new Date(),
          },
        ],
        points: 7890,
        co2Saved: "123kg",
        profileSettings: {
          notifications: true,
          privacy: "public",
        },
      },
      {
        username: "mikejohnson",
        email: "mike@example.com",
        password: "password",
        avatar: "🌳",
        recyclingPersona: "Recycling Pro",
        containerCount: 345,
        containerCountCurrentMonth: 54,
        monthStreak: 4,
        digitalCoins: 3450,
        location: "Seattle, WA",
        groups: [groups[0]._id],
        friends: [],
        badges: [
          {
            id: badges[0]._id.toString(),
            name: badges[0].name,
            earnedDate: new Date(),
          },
          {
            id: badges[1]._id.toString(),
            name: badges[1].name,
            earnedDate: new Date(),
          },
          {
            id: badges[5]._id.toString(),
            name: badges[5].name,
            earnedDate: new Date(),
          },
        ],
        points: 3450,
        co2Saved: "56kg",
        profileSettings: {
          notifications: false,
          privacy: "public",
        },
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Update group members and admins
    console.log("🔗 Updating group memberships...");
    await Group.findByIdAndUpdate(groups[0]._id, {
      members: [users[0]._id, users[1]._id, users[3]._id],
      admins: [users[0]._id],
    });
    await Group.findByIdAndUpdate(groups[1]._id, {
      members: [users[2]._id],
      admins: [users[2]._id],
    });
    await Group.findByIdAndUpdate(groups[2]._id, {
      members: [users[1]._id],
      admins: [users[1]._id],
    });

    // Update user friends
    await User.findByIdAndUpdate(users[0]._id, {
      friends: [users[1]._id, users[3]._id],
    });
    await User.findByIdAndUpdate(users[1]._id, {
      friends: [users[0]._id, users[2]._id],
    });
    await User.findByIdAndUpdate(users[2]._id, {
      friends: [users[1]._id],
    });

    // Create transactions
    console.log("💰 Creating transactions...");
    const transactions = await Transaction.create([
      {
        userId: users[0]._id,
        quantity: 15,
        datetime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        itemType: "plastic",
        pointsEarned: 45,
        verificationStatus: "verified",
        groupId: groups[0]._id,
      },
      {
        userId: users[0]._id,
        quantity: 8,
        datetime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        itemType: "aluminum",
        pointsEarned: 32,
        verificationStatus: "verified",
      },
      {
        userId: users[1]._id,
        quantity: 20,
        datetime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        itemType: "glass",
        pointsEarned: 60,
        verificationStatus: "verified",
        groupId: groups[0]._id,
      },
    ]);
    console.log(`✅ Created ${transactions.length} transactions`);

    // Create activities
    console.log("📝 Creating activities...");
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: "recycled",
        content: "recycled 15 plastic bottles",
        groupId: groups[0]._id,
        datetime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        stats: { items: 15, points: 45 },
        visibility: "public",
      },
      {
        userId: users[0]._id,
        type: "achievement",
        content: "earned the Eco Enthusiast badge",
        datetime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        stats: { points: 50 },
        visibility: "public",
      },
      {
        userId: users[1]._id,
        type: "joined_group",
        content: "joined Eco Warriors",
        groupId: groups[2]._id,
        datetime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        visibility: "public",
      },
      {
        userId: users[2]._id,
        type: "recycled",
        content: "recycled 25 aluminum cans",
        groupId: groups[1]._id,
        datetime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        stats: { items: 25, points: 75 },
        visibility: "friends",
      },
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📝 Login credentials (all passwords: 'password'):");
    console.log("   • testuser");
    console.log("   • alexgreen");
    console.log("   • sarahchen");
    console.log("   • mikejohnson\n");

    // Verify passwords were saved
    const testUser = await User.findOne({ username: "testuser" });
    console.log(
      "Verification - testuser password saved:",
      !!testUser?.password,
      "Length:",
      testUser?.password?.length
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
