'use client'

import { useState, useEffect } from 'react'
import Bottle from './components/Bottle'
import { Menu, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UserStats {
  totalBottles: number
  coins: number
  streak: number
  co2Saved: number
}

interface BottleItem {
  id: number
  type: 'plastic' | 'glass' | 'aluminum'
}

export default function HomePage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalBottles: 10532,
    coins: 10532,
    streak: 42,
    co2Saved: 15,
  })
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [bottleCount, setBottleCount] = useState(1)
  const [bottles, setBottles] = useState<BottleItem[]>([])

  useEffect(() => {
    // Generate initial bottle stack with random types
    const bottleTypes: Array<'plastic' | 'glass' | 'aluminum'> = ['plastic', 'glass', 'aluminum']
    const initialBottles = Array.from({ length: Math.min(userStats.totalBottles, 20) }, (_, i) => ({
      id: i,
      type: bottleTypes[Math.floor(Math.random() * bottleTypes.length)]
    }))
    setBottles(initialBottles)
  }, [])

  const handleAddBottles = () => {
    const newBottles = userStats.totalBottles + bottleCount
    setUserStats({
      ...userStats,
      totalBottles: newBottles,
      coins: newBottles,
      co2Saved: Math.round(newBottles * 0.0014 * 10) / 10,
    })
    
    // Add new bottles to visualization with random types
    const bottleTypes: Array<'plastic' | 'glass' | 'aluminum'> = ['plastic', 'glass', 'aluminum']
    const newBottleItems = Array.from({ length: bottleCount }, (_, i) => ({
      id: bottles.length + i,
      type: bottleTypes[Math.floor(Math.random() * bottleTypes.length)]
    }))
    setBottles([...bottles, ...newBottleItems])
    
    setShowAddModal(false)
    setBottleCount(1)
  }

  // Calculate stack height percentage (toward the moon)
  const stackProgress = Math.min((userStats.totalBottles / 50000) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-darkNavy via-accent-blue to-primary-navy pb-24 relative overflow-hidden">
      {/* Animated stars background */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <button className="p-2">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">My Recycling</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Moon */}
        <motion.div
          className="mb-12 animate-float"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-moon to-gray-300 shadow-2xl shadow-white/20">
              {/* Moon craters */}
              <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-gray-400/30" />
              <div className="absolute top-12 right-8 w-4 h-4 rounded-full bg-gray-400/30" />
              <div className="absolute bottom-8 left-12 w-8 h-8 rounded-full bg-gray-400/30" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
          </div>
        </motion.div>

        {/* Stack visualization */}
        <div className="relative w-full max-w-xs" style={{ height: '400px' }}>
          {/* Bottle stack container */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 flex flex-col-reverse items-center">
            {bottles.slice(-6).map((bottle, index) => (
              <Bottle 
                key={bottle.id} 
                type={bottle.type}
                index={index}
                delay={0}
              />
            ))}
          </div>

          {/* Progress indicator with milestone markers */}
          <div className="absolute bottom-0 right-8 h-full w-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-t from-primary-green via-primary-darkGreen to-accent-lightBlue relative"
              initial={{ height: 0 }}
              animate={{ height: `${stackProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/50 to-transparent blur-sm" />
            </motion.div>
            
            {/* Progress percentage text */}
            <div className="absolute top-2 left-4 text-xs font-bold text-white/70 whitespace-nowrap">
              {stackProgress.toFixed(0)}%
            </div>
          </div>

          {/* Ground platform */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-gradient-to-b from-primary-navy to-primary-darkNavy rounded-lg shadow-xl border-t border-white/20" />
        </div>

        {/* Stats Display */}
        <motion.div
          className="relative w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Earth visualization */}
          <div className="relative mb-8">
            <div className="w-full aspect-square rounded-full overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-accent-blue via-primary-green to-primary-darkGreen relative">
                {/* Continents effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-green-600 rounded-full" />
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-600 rounded-full" />
                  <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-green-600 rounded-full" />
                </div>
                
                {/* Center stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold text-white drop-shadow-lg">
                    {userStats.totalBottles.toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold text-white/90 mt-2">
                    containers recycled
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-green">{userStats.coins}</div>
              <div className="text-xs text-white/60 mt-1">Coins</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-green">{userStats.streak}</div>
              <div className="text-xs text-white/60 mt-1">Day Streak</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary-green">{userStats.co2Saved}kg</div>
              <div className="text-xs text-white/60 mt-1">CO₂ Saved</div>
            </div>
          </div>

          {/* Add bottles button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Log Recycled Bottles
          </button>
        </motion.div>
      </div>

      {/* Add Bottles Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="card max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Log Bottles</h2>
              
              <div className="mb-6">
                <label className="block text-sm text-white/80 mb-2">
                  Number of bottles
                </label>
                <input
                  type="number"
                  min="1"
                  value={bottleCount}
                  onChange={(e) => setBottleCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-primary-darkNavy text-white text-2xl font-bold p-4 rounded-xl border-2 border-primary-green/30 focus:border-primary-green outline-none text-center"
                />
              </div>

              <div className="mb-6 p-4 bg-primary-darkNavy rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">You'll earn:</span>
                  <span className="text-primary-green font-bold text-lg">
                    +{bottleCount} coins
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBottles}
                  className="btn-primary flex-1"
                >
                  Add Bottles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

