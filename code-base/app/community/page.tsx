"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedTab from "@/app/components/community/FeedTab";
import LeaderboardTab from "@/app/components/community/LeaderboardTab";
import DiscoverTab from "@/app/components/community/DiscoverTab";
import BottomNavigation from "@/app/components/BottomNavigation";

type Tab = "feed" | "leaderboard" | "discover";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const tabs = [
    { id: "feed" as Tab, label: "Feed", icon: "📰" },
    { id: "leaderboard" as Tab, label: "Leaderboard", icon: "🏆" },
    { id: "discover" as Tab, label: "Discover", icon: "🔍" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Community
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto flex">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg mr-1">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 dark:bg-green-400"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "feed" && <FeedTab />}
            {activeTab === "leaderboard" && <LeaderboardTab />}
            {activeTab === "discover" && <DiscoverTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNavigation onUploadClick={() => {}} />
    </div>
  );
}
