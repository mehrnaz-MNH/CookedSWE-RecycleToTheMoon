'use client';

import { motion } from 'framer-motion';

interface Activity {
  id: string;
  title: string;
  time: string;
  type: 'recycling' | 'achievement';
}

interface RecentActivityProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: '1',
    title: 'Recycled 3 plastic bottles',
    time: '2 hours ago',
    type: 'recycling',
  },
  {
    id: '2',
    title: 'Earned Eco Warrior badge',
    time: 'Yesterday',
    type: 'achievement',
  },
];

export default function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1
      }
    }
  };

  const item = {
    hidden: { x: -50, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <motion.div
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700"
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`${
                  activity.type === 'recycling'
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-blue-100 dark:bg-blue-900'
                } rounded-full p-2`}
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  delay: 1.2 + index * 0.15
                }}
              >
                {activity.type === 'recycling' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </motion.div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
