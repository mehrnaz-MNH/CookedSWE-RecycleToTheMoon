"use client";

import { useState } from "react";
import { Search, UserPlus, Trophy, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  bottles: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface FunFact {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<
    "leaderboard" | "friends" | "facts"
  >("leaderboard");
  const [timeframe, setTimeframe] = useState<"week" | "month" | "alltime">(
    "week"
  );

  const leaderboardData: LeaderboardUser[] = [
    { id: "1", name: "Sarah Johnson", avatar: "🌟", bottles: 1543, rank: 1 },
    { id: "2", name: "Mike Chen", avatar: "🚀", bottles: 1389, rank: 2 },
    { id: "3", name: "Emma Davis", avatar: "💎", bottles: 1205, rank: 3 },
    {
      id: "4",
      name: "Alex Green",
      avatar: "🌍",
      bottles: 127,
      rank: 12,
      isCurrentUser: true,
    },
    { id: "5", name: "John Smith", avatar: "⚡", bottles: 98, rank: 15 },
    { id: "6", name: "Lisa Wong", avatar: "🌸", bottles: 87, rank: 18 },
  ];

  const friends: LeaderboardUser[] = [
    { id: "1", name: "Sarah Johnson", avatar: "🌟", bottles: 1543, rank: 1 },
    { id: "2", name: "Mike Chen", avatar: "🚀", bottles: 1389, rank: 2 },
    { id: "5", name: "John Smith", avatar: "⚡", bottles: 98, rank: 15 },
  ];

  const funFacts: FunFact[] = [
    {
      id: "1",
      title: "Plastic Takes 450 Years",
      description:
        "A plastic bottle takes 450 years to decompose in the ocean. By recycling, you prevent this!",
      icon: "🌊",
    },
    {
      id: "2",
      title: "Energy Saving Champion",
      description:
        "Recycling one plastic bottle saves enough energy to power a lightbulb for 3 hours!",
      icon: "💡",
    },
    {
      id: "3",
      title: "Ocean Pollution Crisis",
      description:
        "8 million tons of plastic enter our oceans each year. Every bottle you recycle makes a difference!",
      icon: "🐋",
    },
    {
      id: "4",
      title: "Infinite Recycling",
      description:
        "Glass can be recycled endlessly without losing quality. Keep those bottles coming!",
      icon: "♻️",
    },
    {
      id: "5",
      title: "CO₂ Reduction",
      description:
        "Recycling reduces CO₂ emissions by 50% compared to making new plastic from scratch.",
      icon: "🌱",
    },
  ];

  return (
    <div className="min-h-screen bg-primary-darkNavy pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-green to-primary-darkGreen p-6">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Community
        </h1>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-white/10 text-white placeholder-white/60 pl-12 pr-4 py-3 rounded-xl border border-white/20 focus:border-white focus:outline-none"
          />
        </div>
      </div>

      {/* Tab navigation */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "leaderboard"
                ? "bg-primary-green text-white"
                : "bg-primary-navy text-white/60 hover:text-white"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "friends"
                ? "bg-primary-green text-white"
                : "bg-primary-navy text-white/60 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab("facts")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "facts"
                ? "bg-primary-green text-white"
                : "bg-primary-navy text-white/60 hover:text-white"
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            Fun Facts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timeframe selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTimeframe("week")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeframe === "week"
                    ? "bg-primary-navy text-primary-green border-2 border-primary-green"
                    : "bg-primary-navy/50 text-white/60 border-2 border-transparent"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeframe === "month"
                    ? "bg-primary-navy text-primary-green border-2 border-primary-green"
                    : "bg-primary-navy/50 text-white/60 border-2 border-transparent"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeframe("alltime")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeframe === "alltime"
                    ? "bg-primary-navy text-primary-green border-2 border-primary-green"
                    : "bg-primary-navy/50 text-white/60 border-2 border-transparent"
                }`}
              >
                All Time
              </button>
            </div>

            {/* Top 3 podium */}
            <div className="mb-6">
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd place */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl mb-2 shadow-xl">
                    {leaderboardData[1].avatar}
                  </div>
                  <div className="text-white font-semibold text-sm text-center mb-1">
                    {leaderboardData[1].name.split(" ")[0]}
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-xl flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-xs text-white/80">
                      {leaderboardData[1].bottles}
                    </div>
                  </div>
                </motion.div>

                {/* 1st place */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-4xl mb-2 shadow-2xl animate-float">
                    {leaderboardData[0].avatar}
                  </div>
                  <div className="text-white font-bold text-center mb-1">
                    {leaderboardData[0].name.split(" ")[0]}
                  </div>
                  <div className="w-24 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-xl flex flex-col items-center justify-center shadow-xl">
                    <div className="text-3xl font-bold text-white">1</div>
                    <div className="text-sm text-white/90 font-semibold">
                      {leaderboardData[0].bottles}
                    </div>
                  </div>
                </motion.div>

                {/* 3rd place */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl mb-2 shadow-xl">
                    {leaderboardData[2].avatar}
                  </div>
                  <div className="text-white font-semibold text-sm text-center mb-1">
                    {leaderboardData[2].name.split(" ")[0]}
                  </div>
                  <div className="w-20 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-t-xl flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-xs text-white/80">
                      {leaderboardData[2].bottles}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Rest of leaderboard */}
            <div className="space-y-3">
              {leaderboardData.slice(3).map((user, index) => (
                <motion.div
                  key={user.id}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    user.isCurrentUser
                      ? "bg-primary-green/20 border-2 border-primary-green"
                      : "bg-primary-navy border-2 border-transparent"
                  }`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary-darkNavy rounded-full flex items-center justify-center font-bold text-white">
                    #{user.rank}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-primary-darkGreen flex items-center justify-center text-2xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{user.name}</div>
                    <div className="text-sm text-white/60">
                      {user.bottles} bottles
                    </div>
                  </div>
                  {user.isCurrentUser && (
                    <div className="text-primary-green font-bold text-sm">
                      You
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="btn-primary w-full flex items-center justify-center gap-2 mb-6">
              <UserPlus className="w-5 h-5" />
              Add Friends
            </button>

            <div className="space-y-3">
              {friends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  className="flex items-center gap-4 p-4 bg-primary-navy rounded-xl"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-green to-primary-darkGreen flex items-center justify-center text-3xl">
                    {friend.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">
                      {friend.name}
                    </div>
                    <div className="text-sm text-white/60">
                      Rank #{friend.rank} • {friend.bottles} bottles
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-green text-white rounded-lg text-sm font-semibold hover:bg-primary-darkGreen transition-colors">
                    Donate
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fun Facts Tab */}
        {activeTab === "facts" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {funFacts.map((fact, index) => (
              <motion.div
                key={fact.id}
                className="card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary-green/20 flex items-center justify-center text-4xl flex-shrink-0">
                    {fact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {fact.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {fact.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
