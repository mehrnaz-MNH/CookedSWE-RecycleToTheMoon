'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface FriendCardProps {
  friend: {
    id: string
    name: string
    avatar: string
  }
  index: number
  onDonate: () => void
}

export default function FriendCard({ friend, index, onDonate }: FriendCardProps) {
  return (
    <motion.div
      className="card flex items-center gap-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex-1">
        <div className="text-white font-semibold text-lg">{friend.name}</div>
        <div className="text-sm text-white/60">Your recycling buddy</div>
      </div>
      <button
        onClick={onDonate}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
      >
        <Heart className="w-4 h-4" />
        Donate
      </button>
    </motion.div>
  )
}

