'use client'

import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DonateModalProps {
  isOpen: boolean
  onClose: () => void
  recipient: {
    name: string
    avatar?: string
    icon?: string
    type: 'friend' | 'charity'
  } | null
  donationAmount: number
  setDonationAmount: (amount: number) => void
  availableCoins: number
  onDonate: () => void
}

export default function DonateModal({
  isOpen,
  onClose,
  recipient,
  donationAmount,
  setDonationAmount,
  availableCoins,
  onDonate,
}: DonateModalProps) {
  if (!recipient) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card max-w-sm w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Donate Coins</h2>

            {/* Recipient info */}
            <div className="flex items-center gap-4 p-4 bg-primary-darkNavy rounded-xl mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green to-primary-darkGreen flex items-center justify-center text-3xl">
                {recipient.avatar || recipient.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-lg">{recipient.name}</div>
                <div className="text-sm text-white/60">
                  {recipient.type === 'friend' ? 'Friend' : 'Charity'}
                </div>
              </div>
            </div>

            {/* Amount input */}
            <div className="mb-6">
              <label className="block text-sm text-white/80 mb-2">Donation amount</label>
              <input
                type="number"
                min="1"
                max={availableCoins}
                value={donationAmount}
                onChange={(e) => setDonationAmount(Math.min(parseInt(e.target.value) || 1, availableCoins))}
                className="w-full bg-primary-darkNavy text-white text-2xl font-bold p-4 rounded-xl border-2 border-primary-green/30 focus:border-primary-green outline-none text-center"
              />

              {/* Quick amounts */}
              <div className="flex gap-2 mt-3">
                {[5, 10, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(Math.min(amount, availableCoins))}
                    disabled={amount > availableCoins}
                    className="flex-1 py-2 bg-primary-darkNavy text-primary-green text-sm font-semibold rounded-lg hover:bg-primary-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Balance info */}
            <div className="mb-6 p-4 bg-primary-darkNavy rounded-xl">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Current balance:</span>
                <span className="text-white font-bold">{availableCoins} coins</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">After donation:</span>
                <span className="text-primary-green font-bold">
                  {availableCoins - donationAmount} coins
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={onDonate}
                disabled={donationAmount > availableCoins || donationAmount < 1}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send {donationAmount} Coins
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

