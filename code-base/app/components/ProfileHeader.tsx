'use client';

import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  user: {
    name: string;
    avatar: string;
    recyclingPersona: string;
    location: string;
  };
  onEditAvatar: () => void;
}

export default function ProfileHeader({ user, onEditAvatar }: ProfileHeaderProps) {
  return (
    <motion.div
      className="flex flex-col items-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
      >
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-6xl">{user.avatar}</span>
        </motion.div>
        <motion.button
          onClick={onEditAvatar}
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg border-2 border-green-600 dark:border-green-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600 dark:text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {user.name}
      </motion.h2>

      <motion.div
        className="flex items-center gap-2 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          {user.recyclingPersona}
        </span>
      </motion.div>

      <motion.div
        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm">{user.location}</span>
      </motion.div>
    </motion.div>
  );
}
