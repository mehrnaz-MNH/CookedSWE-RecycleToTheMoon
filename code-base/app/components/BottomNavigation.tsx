"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Heart, User, Plus } from "lucide-react";

interface BottomNavigationProps {
  onUploadClick: () => void;
}

export default function BottomNavigation({
  onUploadClick,
}: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: Heart, label: "Donate", href: "/donate" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {/* First two nav items */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-colors ${
                isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Center Upload Button */}
        <button
          onClick={onUploadClick}
          className="flex items-center justify-center -mt-6 w-14 h-14 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <Plus className="h-8 w-8" />
        </button>

        {/* Last two nav items */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-colors ${
                isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
