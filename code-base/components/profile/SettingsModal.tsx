'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const settingsOptions = [
    { label: 'Notifications', action: () => console.log('Notifications') },
    { label: 'Privacy', action: () => console.log('Privacy') },
    { label: 'Account', action: () => console.log('Account') },
    { label: 'Help & Support', action: () => console.log('Help & Support') },
    { label: 'Log Out', action: () => console.log('Log Out'), isDanger: true },
  ];

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
            <div className="flex items-center justify-between mb-6">
              <motion.h3
                className="text-xl font-bold text-gray-900 dark:text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Settings
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
              className="space-y-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.15
                  }
                }
              }}
            >
              {settingsOptions.map((option) => (
                <motion.button
                  key={option.label}
                  onClick={option.action}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                    option.isDanger
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
