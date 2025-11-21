'use client';

import { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsCards from '@/components/profile/StatsCards';
import RecentActivity from '@/components/profile/RecentActivity';
import AvatarSelectionModal from '@/components/profile/AvatarSelectionModal';
import EditProfileModal from '@/components/profile/EditProfileModal';
import SettingsModal from '@/components/profile/SettingsModal';
import UploadReceiptModal from '@/components/profile/UploadReceiptModal';
import BottomNavigation from '@/components/profile/BottomNavigation';
import ViewSelector from '@/components/profile/ViewSelector';

export default function ProfilePage() {
  const availableAvatars = ['🌱', '🌍', '♻️', '🌳', '🌿', '🌺', '🐝', '🦋', '🌻', '🌈', '⚡', '🔥'];

  const [user, setUser] = useState({
    name: 'Alex Green',
    avatar: '🌱',
    recyclingPersona: 'Eco Warrior',
    location: 'San Francisco, CA',
  });

  const [currentView, setCurrentView] = useState('My Recycling');
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const views = ['My Recycling', 'Green Team Recycling', 'City Recycling'];

  const handleAvatarSelect = (avatar: string) => {
    setUser({ ...user, avatar });
    setIsAvatarModalOpen(false);
  };

  const handleViewSelect = (view: string) => {
    setCurrentView(view);
    setIsViewDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 shadow-sm flex items-center justify-end">
        <ViewSelector
          currentView={currentView}
          views={views}
          isOpen={isViewDropdownOpen}
          onToggle={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
          onSelectView={handleViewSelect}
        />
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <ProfileHeader
          user={user}
          onEditAvatar={() => setIsAvatarModalOpen(true)}
        />

        <StatsCards />

        <div className="space-y-3">
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
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
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
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
          </button>
        </div>

        <RecentActivity />
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
        user={user}
        onClose={() => setIsEditProfileModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <UploadReceiptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <BottomNavigation onUploadClick={() => setIsUploadModalOpen(true)} />
    </div>
  );
}
