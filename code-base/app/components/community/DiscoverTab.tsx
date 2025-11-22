"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Group {
  id: string;
  name: string;
  avatar: string;
  members: number;
  description: string;
  isJoined: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  recyclingPersona: string;
  itemsRecycled: number;
  isFriend: boolean;
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Ocean Savers",
    avatar: "🌊",
    members: 248,
    description: "Dedicated to cleaning beaches and reducing ocean plastic",
    isJoined: false,
  },
  {
    id: "2",
    name: "Green Team",
    avatar: "🌿",
    members: 189,
    description: "Local community focusing on neighborhood recycling",
    isJoined: true,
  },
  {
    id: "3",
    name: "Eco Warriors",
    avatar: "⚡",
    members: 312,
    description: "Champions of sustainable living and zero waste",
    isJoined: false,
  },
  {
    id: "4",
    name: "Planet Protectors",
    avatar: "🌍",
    members: 156,
    description: "Global community fighting climate change",
    isJoined: false,
  },
];

const mockUsers: User[] = [
  {
    id: "1",
    name: "Jordan Lee",
    avatar: "🌻",
    recyclingPersona: "Sustainability Guru",
    itemsRecycled: 456,
    isFriend: false,
  },
  {
    id: "2",
    name: "Taylor Smith",
    avatar: "🌈",
    recyclingPersona: "Green Champion",
    itemsRecycled: 389,
    isFriend: false,
  },
  {
    id: "3",
    name: "Casey Brown",
    avatar: "🍃",
    recyclingPersona: "Eco Enthusiast",
    itemsRecycled: 312,
    isFriend: true,
  },
  {
    id: "4",
    name: "Morgan Davis",
    avatar: "🌼",
    recyclingPersona: "Recycling Pro",
    itemsRecycled: 298,
    isFriend: false,
  },
];

export default function DiscoverTab() {
  const [discoverType, setDiscoverType] = useState<"groups" | "friends">("groups");
  const [groups, setGroups] = useState(mockGroups);
  const [users, setUsers] = useState(mockUsers);

  const handleJoinGroup = (groupId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
      )
    );
  };

  const handleAddFriend = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isFriend: !user.isFriend } : user
      )
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <motion.button
          onClick={() => setDiscoverType("groups")}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            discoverType === "groups"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🏢 Groups
        </motion.button>
        <motion.button
          onClick={() => setDiscoverType("friends")}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            discoverType === "friends"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          👥 Friends
        </motion.button>
      </div>

      {/* Search Bar */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${discoverType}...`}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
        key={discoverType}
      >
        {discoverType === "groups"
          ? groups.map((group) => (
              <motion.div
                key={group.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Group Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-3xl">{group.avatar}</span>
                  </div>

                  {/* Group Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {group.description}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      👥 {group.members} members
                    </span>
                  </div>

                  {/* Join Button */}
                  <motion.button
                    onClick={() => handleJoinGroup(group.id)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                      group.isJoined
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {group.isJoined ? "Joined" : "Join"}
                  </motion.button>
                </div>
              </motion.div>
            ))
          : users.map((user) => (
              <motion.div
                key={user.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {/* User Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-2xl">{user.avatar}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {user.name}
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                      {user.recyclingPersona}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ♻️ {user.itemsRecycled} items recycled
                    </span>
                  </div>

                  {/* Add Friend Button */}
                  <motion.button
                    onClick={() => handleAddFriend(user.id)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                      user.isFriend
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {user.isFriend ? "Friends" : "Add Friend"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
      </motion.div>

      {/* Suggestions Header */}
      <motion.div
        className="mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Suggested for you
        </h3>
      </motion.div>
    </div>
  );
}
