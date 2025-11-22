import connectDB from "../app/lib/mongodb";
import { User, Group, Activity, Badge, Transaction } from "../app/lib/models";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Group.deleteMany({});
    await Activity.deleteMany({});
    await Transaction.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const users = await User.create([
      {
        username: "alex_green",
        email: "alex@example.com",
        avatar: "🌱",
        recyclingPersona: "Eco Warrior",
        location: "San Francisco, CA",
        containerCount: 127,
        containerCountCurrentMonth: 45,
        monthStreak: 3,
        digitalCoins: 82,
        points: 450,
        co2Saved: "15kg",
        badges: [
          { id: "first_recycle", name: "First Steps", earnedDate: new Date() },
        ],
      },
      {
        username: "sarah_johnson",
        email: "sarah@example.com",
        avatar: "🌟",
        recyclingPersona: "Green Champion",
        location: "San Francisco, CA",
        containerCount: 245,
        containerCountCurrentMonth: 78,
        monthStreak: 6,
        digitalCoins: 120,
        points: 780,
        co2Saved: "28kg",
      },
      {
        username: "mike_chen",
        email: "mike@example.com",
        avatar: "🚀",
        recyclingPersona: "Sustainability Guru",
        location: "San Francisco, CA",
        containerCount: 189,
        containerCountCurrentMonth: 56,
        monthStreak: 4,
        digitalCoins: 95,
        points: 560,
        co2Saved: "22kg",
      },
      {
        username: "emma_davis",
        email: "emma@example.com",
        avatar: "💎",
        recyclingPersona: "Eco Enthusiast",
        location: "Oakland, CA",
        containerCount: 156,
        containerCountCurrentMonth: 42,
        monthStreak: 5,
        digitalCoins: 78,
        points: 480,
        co2Saved: "18kg",
      },
    ]);

    console.log("Created users:", users.length);

    // Set up friendships
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { friends: { $each: [users[1]._id, users[2]._id, users[3]._id] } },
    });

    // Create sample groups
    const groups = await Group.create([
      {
        name: "Green Team",
        description: "Our office recycling team",
        location: "San Francisco, CA",
        avatar: "♻️",
        members: [users[0]._id, users[1]._id, users[2]._id],
        admins: [users[0]._id],
        recycledCount: 450,
        points: 450,
        type: "standard",
      },
      {
        name: "SF Eco Warriors",
        description: "San Francisco community recycling initiative",
        location: "San Francisco, CA",
        avatar: "🌍",
        members: [users[0]._id, users[1]._id, users[3]._id],
        admins: [users[1]._id],
        recycledCount: 890,
        points: 890,
        type: "geo",
      },
    ]);

    console.log("Created groups:", groups.length);

    // Update users with groups
    for (const user of [users[0], users[1], users[2]]) {
      await User.findByIdAndUpdate(user._id, {
        $push: { groups: groups[0]._id },
      });
    }

    for (const user of [users[0], users[1], users[3]]) {
      await User.findByIdAndUpdate(user._id, {
        $push: { groups: groups[1]._id },
      });
    }

    // Create sample transactions
    const transactions = await Transaction.create([
      {
        userId: users[0]._id,
        quantity: 5,
        itemType: "plastic bottles",
        pointsEarned: 5,
        verificationStatus: "verified",
        groupId: groups[0]._id,
        datetime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        userId: users[1]._id,
        quantity: 8,
        itemType: "aluminum cans",
        pointsEarned: 8,
        verificationStatus: "verified",
        datetime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
    ]);

    console.log("Created transactions:", transactions.length);

    // Create sample activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: "recycled",
        content: "Recycled 5 plastic bottles",
        groupId: groups[0]._id,
        stats: { items: 5, points: 5 },
        visibility: "public",
        datetime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: "achievement",
        content: "Earned Green Champion badge!",
        stats: { points: 50 },
        visibility: "public",
        datetime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      },
      {
        userId: users[2]._id,
        type: "joined_group",
        content: "Joined Green Team",
        groupId: groups[0]._id,
        visibility: "public",
        datetime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      },
    ]);

    console.log("Created activities:", activities.length);

    // Create sample badges
    const badges = await Badge.create([
      {
        name: "First Steps",
        description: "Recycle your first item",
        emoji: "🌱",
        criteria: "Recycle 1 item",
        pointValue: 10,
        rarity: "common",
      },
      {
        name: "Green Champion",
        description: "Recycle 100 items",
        emoji: "🌟",
        criteria: "Recycle 100 items",
        pointValue: 50,
        rarity: "rare",
      },
      {
        name: "Eco Warrior",
        description: "Maintain a 30-day streak",
        emoji: "⚡",
        criteria: "30-day streak",
        pointValue: 100,
        rarity: "epic",
      },
    ]);

    console.log("Created badges:", badges.length);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nSample user ID for testing:", users[0]._id);
    console.log("Use this ID in your API calls and components");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
