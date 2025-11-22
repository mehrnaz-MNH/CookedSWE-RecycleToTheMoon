'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  currentAvatar: string;
  availableAvatars: string[];
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

export default function AvatarSelectionModal({
  isOpen,
  currentAvatar,
  availableAvatars,
  onClose,
  onSelectAvatar,
}: AvatarSelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <motion.h3
                className="text-xl font-bold text-gray-900 dark:text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Choose Avatar
              </motion.h3>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
            <motion.div
              className="grid grid-cols-4 gap-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {availableAvatars.map((avatar) => (
                <motion.button
                  key={avatar}
                  onClick={() => onSelectAvatar(avatar)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-4xl transition-all ${
                    currentAvatar === avatar
                      ? 'bg-green-100 dark:bg-green-900 ring-2 ring-green-600'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  variants={{
                    hidden: { scale: 0, rotate: -180 },
                    show: { scale: 1, rotate: 0 }
                  }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {avatar}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
