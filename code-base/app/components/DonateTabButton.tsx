'use client'

import { LucideIcon } from 'lucide-react'

interface TabButtonProps {
  icon: LucideIcon
  label: string
  isActive: boolean
  onClick: () => void
}

export default function TabButton({ icon: Icon, label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
        isActive
          ? 'bg-primary-green text-white'
          : 'bg-primary-navy text-white/60 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )
}

