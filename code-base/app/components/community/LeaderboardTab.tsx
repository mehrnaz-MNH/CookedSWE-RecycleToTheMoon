/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLeaderboard, DEMO_USER_ID } from "../../lib/hooks";

export default function LeaderboardTab() {
  const [leaderboardType, setLeaderboardType] = useState<"users" | "groups">(
    "users"
  );
  const { leaderboard, loading } = useLeaderboard(
    leaderboardType === "users" ? "users" : "groups",
    "all-time"
  );

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <motion.button
          onClick={() => setLeaderboardType("users")}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            leaderboardType === "users"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          👥 Users
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
        {leaderboard.map((entry: any) => (
          <motion.div
            key={`${leaderboardType}-${entry.rank}`}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            className="rounded-xl p-4 shadow-md transition-shadow hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
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

              {/* User/Group Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">
                  {leaderboardType === "users" ? entry.avatar : entry.avatar}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {leaderboardType === "users" ? entry.username : entry.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span>⭐ {entry.points?.toLocaleString() || 0} pts</span>
                  <span>
                    ♻️ {entry.itemsRecycled?.toLocaleString() || 0} items
                  </span>
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

      {leaderboard.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
}
