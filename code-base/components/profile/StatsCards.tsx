'use client';

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

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {statsList.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center border border-gray-100 dark:border-gray-700"
        >
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stat.value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
