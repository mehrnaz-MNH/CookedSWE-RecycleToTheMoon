/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useActivities, DEMO_USER_ID } from "../../lib/hooks";

export default function FeedTab() {
  const { activities, loading } = useActivities("public", DEMO_USER_ID);

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "recycled":
        return "♻️";
      case "achievement":
        return "🏆";
      case "joined_group":
        return "👥";
      case "challenge_completed":
        return "🎯";
      default:
        return "📝";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "recycled":
        return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      case "achievement":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
      case "joined_group":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case "challenge_completed":
        return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  const formatTime = (datetime: string) => {
    const date = new Date(datetime);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading activities...
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          No activities yet
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Start recycling to see activities here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <motion.h2
        className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Recent Activity
      </motion.h2>

      <motion.div
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {activities.map((activity: any) => (
          <motion.div
            key={activity._id}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`rounded-xl p-4 border ${getActivityColor(
              activity.type
            )} transition-shadow hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">
                  {activity.userId?.avatar || "🌱"}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {activity.userId?.username || "User"}
                    </span>
                    <span className="text-xl">
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatTime(activity.datetime)}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {activity.content}
                </p>

                {/* Group Badge */}
                {activity.groupId && (
                  <span className="inline-block px-2 py-1 bg-white/60 dark:bg-black/20 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    👥 {activity.groupId?.name || "Group"}
                  </span>
                )}

                {/* Stats */}
                {activity.stats && (
                  <div className="flex items-center gap-3 mt-2">
                    {activity.stats.items && (
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        📦 {activity.stats.items} items
                      </span>
                    )}
                    {activity.stats.points && (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        ⭐ +{activity.stats.points} points
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
