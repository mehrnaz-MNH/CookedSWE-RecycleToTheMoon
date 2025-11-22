"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
  };
  points: number;
  itemsRecycled: number;
  isCurrentUser?: boolean;
}

const mockFriendsLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: { name: "Sarah Chen", avatar: "🌸" },
    points: 1250,
    itemsRecycled: 342,
  },
  {
    rank: 2,
    user: { name: "Mike Johnson", avatar: "🌳" },
    points: 1180,
    itemsRecycled: 298,
  },
  {
    rank: 3,
    user: { name: "Alex Green", avatar: "🌱" },
    points: 1050,
    itemsRecycled: 267,
    isCurrentUser: true,
  },
  {
    rank: 4,
    user: { name: "Emma Wilson", avatar: "🌺" },
    points: 980,
    itemsRecycled: 245,
  },
  {
    rank: 5,
    user: { name: "Lisa Park", avatar: "🦋" },
    points: 850,
    itemsRecycled: 213,
  },
];

const mockGroupLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: { name: "Ocean Savers", avatar: "🌊" },
    points: 15420,
    itemsRecycled: 4205,
  },
  {
    rank: 2,
    user: { name: "Green Team", avatar: "🌿" },
    points: 12850,
    itemsRecycled: 3567,
  },
  {
    rank: 3,
    user: { name: "Eco Warriors", avatar: "⚡" },
    points: 11200,
    itemsRecycled: 3102,
  },
  {
    rank: 4,
    user: { name: "Planet Protectors", avatar: "🌍" },
    points: 9800,
    itemsRecycled: 2890,
  },
  {
    rank: 5,
    user: { name: "Clean City", avatar: "🏙️" },
    points: 8950,
    itemsRecycled: 2654,
  },
];

export default function LeaderboardTab() {
  const [leaderboardType, setLeaderboardType] = useState<"friends" | "groups">("friends");

  const data = leaderboardType === "friends" ? mockFriendsLeaderboard : mockGroupLeaderboard;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-br from-amber-600 to-amber-800 text-white";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { x: -30, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <motion.button
          onClick={() => setLeaderboardType("friends")}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            leaderboardType === "friends"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          👥 Friends
        </motion.button>
        <motion.button
          onClick={() => setLeaderboardType("groups")}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            leaderboardType === "groups"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🏢 Groups
        </motion.button>
      </div>

      {/* Leaderboard List */}
      <motion.div
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
        key={leaderboardType}
      >
        {data.map((entry) => (
          <motion.div
            key={`${leaderboardType}-${entry.rank}`}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`rounded-xl p-4 shadow-md transition-shadow hover:shadow-lg ${
              entry.isCurrentUser
                ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600"
                : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md ${getRankColor(
                  entry.rank
                )}`}
              >
                {getRankIcon(entry.rank) || `#${entry.rank}`}
              </div>

              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">{entry.user.avatar}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {entry.user.name}
                  </h3>
                  {entry.isCurrentUser && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span>⭐ {entry.points.toLocaleString()} pts</span>
                  <span>♻️ {entry.itemsRecycled.toLocaleString()} items</span>
                </div>
              </div>

              {/* Trend Arrow */}
              {entry.rank <= 3 && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl"
                >
                  🔥
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current User Stats Card */}
      {leaderboardType === "friends" && (
        <motion.div
          className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 shadow-lg text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-3">Your Stats This Week</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">3rd</div>
              <div className="text-xs opacity-90">Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">+250</div>
              <div className="text-xs opacity-90">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">67</div>
              <div className="text-xs opacity-90">Items</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
