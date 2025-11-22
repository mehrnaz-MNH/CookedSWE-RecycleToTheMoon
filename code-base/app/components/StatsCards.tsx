'use client';

import { motion } from 'framer-motion';

interface Stat {
  value: string | number;
  label: string;
}

interface StatsCardsProps {
  stats?: {
    itemsRecycled: number;
    dayStreak: number;
    co2Saved: string;
  };
}

export default function StatsCards({ stats = { itemsRecycled: 127, dayStreak: 42, co2Saved: '15kg' } }: StatsCardsProps) {
  const statsList: Stat[] = [
    { value: stats.itemsRecycled, label: 'Items Recycled' },
    { value: stats.dayStreak, label: 'Day Streak' },
    { value: stats.co2Saved, label: 'CO₂ Saved' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-3 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {statsList.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center border border-gray-100 dark:border-gray-700"
          variants={item}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="text-2xl font-bold text-green-600 dark:text-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.7 + index * 0.1
            }}
          >
            {stat.value}
          </motion.div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
