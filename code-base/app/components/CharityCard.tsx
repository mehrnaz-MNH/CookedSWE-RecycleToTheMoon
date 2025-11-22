'use client'

import { Heart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface CharityCardProps {
  charity: {
    id: string
    name: string
    description: string
    icon: string
    totalDonations: number
  }
  index: number
  onDonate: () => void
}

export default function CharityCard({ charity, index, onDonate }: CharityCardProps) {
  return (
    <motion.div
      className="card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-primary-green/20 flex items-center justify-center text-4xl flex-shrink-0">
          {charity.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{charity.name}</h3>
          <p className="text-sm text-white/60">{charity.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-primary-darkNavy rounded-xl mb-3">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <TrendingUp className="w-4 h-4" />
          Total community donations
        </div>
        <div className="text-primary-green font-bold">
          {charity.totalDonations.toLocaleString()} coins
        </div>
      </div>

      <button
        onClick={onDonate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Heart className="w-5 h-5" />
        Donate to {charity.name}
      </button>
    </motion.div>
  )
}

