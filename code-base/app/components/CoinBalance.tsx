'use client'

interface CoinBalanceProps {
  availableCoins: number
}

export default function CoinBalance({ availableCoins }: CoinBalanceProps) {
  return (
    <div className="card bg-white/10 backdrop-blur-lg border-white/20">
      <div className="text-center">
        <div className="text-sm text-white/80 mb-2">Available Balance</div>
        <div className="text-5xl font-bold text-white mb-2">{availableCoins}</div>
        <div className="text-white/80">coins</div>
      </div>
    </div>
  )
}

