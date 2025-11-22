"use client";

import { motion } from "framer-motion";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: "recycled" | "achievement" | "joined_group" | "challenge";
  content: string;
  group?: string;
  time: string;
  stats?: {
    items?: number;
    points?: number;
  };
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: { name: "Sarah Chen", avatar: "🌸" },
    type: "recycled",
    content: "recycled 15 plastic bottles",
    group: "Green Team",
    time: "2 hours ago",
    stats: { items: 15, points: 45 },
  },
  {
    id: "2",
    user: { name: "Mike Johnson", avatar: "🌳" },
    type: "achievement",
    content: "earned the Eco Champion badge",
    time: "3 hours ago",
    stats: { points: 100 },
  },
  {
    id: "3",
    user: { name: "Emma Wilson", avatar: "🌺" },
    type: "joined_group",
    content: "joined Ocean Savers",
    group: "Ocean Savers",
    time: "5 hours ago",
  },
  {
    id: "4",
    user: { name: "Alex Green", avatar: "🌱" },
    type: "challenge",
    content: "completed the Weekly Challenge",
    group: "Green Team",
    time: "Yesterday",
    stats: { points: 250 },
  },
  {
    id: "5",
    user: { name: "Lisa Park", avatar: "🦋" },
    type: "recycled",
    content: "recycled 8 aluminum cans",
    time: "Yesterday",
    stats: { items: 8, points: 24 },
  },
];

export default function FeedTab() {
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

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "recycled":
        return "♻️";
      case "achievement":
        return "🏆";
      case "joined_group":
        return "👥";
      case "challenge":
        return "🎯";
      default:
        return "📝";
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "recycled":
        return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      case "achievement":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
      case "joined_group":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case "challenge":
        return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

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
        {mockActivities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`rounded-xl p-4 border ${getActivityColor(
              activity.type
            )} transition-shadow hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">{activity.user.avatar}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {activity.user.name}
                    </span>
                    <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {activity.content}
                </p>

                {/* Group Badge */}
                {activity.group && (
                  <span className="inline-block px-2 py-1 bg-white/60 dark:bg-black/20 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    👥 {activity.group}
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

      {/* Load More Button */}
      <motion.button
        className="w-full mt-6 py-3 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md transition-colors border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Load More
      </motion.button>
    </div>
  );
}
