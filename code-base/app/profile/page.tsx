/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProfileHeader from "@/app/components/ProfileHeader";
import StatsCards from "@/app/components/StatsCards";
import RecentActivity from "@/app/components/RecentActivity";
import AvatarSelectionModal from "@/app/components/AvatarSelectionModal";
import EditProfileModal from "@/app/components/EditProfileModal";
import SettingsModal from "@/app/components/SettingsModal";
import UploadReceiptModal from "@/app/components/UploadReceiptModal";
import BottomNavigation from "@/app/components/BottomNavigation";
import { useUser, useActivities } from "../../app/lib/hooks";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      // Not logged in, redirect to login
      router.push("/login");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  // Don't fetch user data until we have a userId
  const shouldFetch = userId !== null;
  const availableAvatars = [
    "🌱",
    "🌍",
    "♻️",
    "🌳",
    "🌿",
    "🌺",
    "🍃",
    "🦋",
    "🌻",
    "🌈",
    "⚡",
    "🔥",
  ];

  const { user, loading, updateUser } = useUser(userId || "");
  const { activities, loading: activitiesLoading } = useActivities(
    "user",
    userId || ""
  );

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleAvatarSelect = async (avatar: string) => {
    try {
      await updateUser({ avatar });
      setIsAvatarModalOpen(false);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('userId');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!userId || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">User not found</div>
      </div>
    );
  }

  const userProfile = {
    username: user.username,
    avatar: user.avatar,
    recyclingPersona: user.recyclingPersona,
    location: user.location,
  };

  const userSettings = {
    notifications: user.profileSettings?.notifications ?? true,
    privacy: user.profileSettings?.privacy ?? 'public',
  };

  const stats = {
    itemsRecycled: user.containerCount,
    dayStreak: user.monthStreak * 30, // Approximate
    co2Saved: user.co2Saved,
  };

  // Convert activities to the format expected by RecentActivity component
  const recentActivities = activitiesLoading
    ? []
    : activities.slice(0, 5).map((activity: any) => ({
        id: activity._id,
        title: activity.content,
        time: new Date(activity.datetime).toLocaleDateString(),
        type: activity.type === "recycled" ? "recycling" : "achievement",
      }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Logout button in top right */}
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>

        <ProfileHeader
          user={userProfile}
          onEditAvatar={() => setIsAvatarModalOpen(true)}
        />

        <StatsCards stats={stats} />

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </motion.button>

          <motion.button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </motion.button>
        </motion.div>

        <RecentActivity activities={recentActivities} />
      </div>

      <AvatarSelectionModal
        isOpen={isAvatarModalOpen}
        currentAvatar={user.avatar}
        availableAvatars={availableAvatars}
        onClose={() => setIsAvatarModalOpen(false)}
        onSelectAvatar={handleAvatarSelect}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        userId={userId}
        user={userProfile}
        onClose={() => setIsEditProfileModalOpen(false)}
        onSave={async (updatedData) => {
          await updateUser(updatedData);
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        userId={userId}
        settings={userSettings}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={async (updatedSettings) => {
          await updateUser({ profileSettings: updatedSettings });
        }}
      />

      <UploadReceiptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <BottomNavigation onUploadClick={() => setIsUploadModalOpen(true)} />
    </div>
  );
}
