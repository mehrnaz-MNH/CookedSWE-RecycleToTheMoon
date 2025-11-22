/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  useGroups,
  useFriends,
  useUsers,
  DEMO_USER_ID,
} from "../../lib/hooks";

export default function DiscoverTab() {
  const [discoverType, setDiscoverType] = useState<"groups" | "friends">(
    "groups"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch groups and users from database
  const { groups, loading: groupsLoading, joinGroup } = useGroups("all");
  const { friends, loading: friendsLoading, addFriend } =
    useFriends(DEMO_USER_ID);
  const { users: allUsers, loading: usersLoading } = useUsers(DEMO_USER_ID);

  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null);
  const [addingFriendId, setAddingFriendId] = useState<string | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      setJoiningGroupId(groupId);
      await joinGroup(groupId, DEMO_USER_ID);
      showNotification("success", "Successfully joined the group!");
    } catch (error) {
      console.error("Error joining group:", error);
      showNotification("error", "Failed to join group. Please try again.");
    } finally {
      setJoiningGroupId(null);
    }
  };

  const handleAddFriend = async (friendId: string) => {
    try {
      setAddingFriendId(friendId);
      await addFriend(friendId);
      showNotification("success", "Successfully added friend!");
    } catch (error) {
      console.error("Error adding friend:", error);
      showNotification("error", "Failed to add friend. Please try again.");
    } finally {
      setAddingFriendId(null);
    }
  };

  // Filter groups based on search query
  const filteredGroups = groups.filter(
    (group: any) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get friend IDs for comparison
  const friendIds = useMemo(
    () => new Set(friends.map((friend: any) => friend._id)),
    [friends]
  );

  // Filter users to show only non-friends
  const discoverableUsers = useMemo(() => {
    return allUsers
      .filter((user: any) => !friendIds.has(user._id))
      .map((user: any) => ({
        id: user._id,
        name: user.username,
        avatar: user.avatar,
        recyclingPersona: user.recyclingPersona,
        itemsRecycled: user.containerCount || 0,
        isFriend: false,
      }));
  }, [allUsers, friendIds]);

  // Filter users based on search query
  const filteredUsers = discoverableUsers.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.recyclingPersona?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const loading = discoverType === "groups" ? groupsLoading : usersLoading;

  return (
    <div className="relative">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {notification.type === "success" ? "✓" : "✗"}
            </span>
            <span className="font-medium">{notification.message}</span>
          </div>
        </motion.div>
      )}

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            Loading {discoverType}...
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && (
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
          key={discoverType}
        >
          {discoverType === "groups"
            ? filteredGroups.map((group: any) => (
                <motion.div
                  key={group._id}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Group Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-3xl">{group.avatar || "♻️"}</span>
                    </div>

                    {/* Group Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {group.description || "No description"}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span>👥 {group.members?.length || 0} members</span>
                        <span>⭐ {group.points || 0} points</span>
                      </div>
                    </div>

                    {/* Join Button */}
                    <motion.button
                      onClick={() => handleJoinGroup(group._id)}
                      disabled={joiningGroupId === group._id}
                      className="px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {joiningGroupId === group._id ? "Joining..." : "Join"}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            : filteredUsers.map((user: any) => (
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
                      onClick={() => !user.isFriend && handleAddFriend(user.id)}
                      disabled={user.isFriend || addingFriendId === user.id}
                      className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                        user.isFriend
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          : "bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {addingFriendId === user.id
                        ? "Adding..."
                        : user.isFriend
                        ? "Friends"
                        : "Add Friend"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredGroups.length === 0 && discoverType === "groups" && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No groups found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Try a different search term
          </p>
        </div>
      )}

      {!loading && filteredUsers.length === 0 && discoverType === "friends" && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No users found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {searchQuery
              ? "Try a different search term"
              : "All users are already your friends!"}
          </p>
        </div>
      )}

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
