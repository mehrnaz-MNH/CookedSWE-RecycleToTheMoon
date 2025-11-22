'use client'

import { motion } from 'framer-motion'

interface BottleProps {
  type?: 'plastic' | 'glass' | 'aluminum'
  index: number
  delay?: number
}

export default function Bottle({ type = 'plastic', index, delay = 0 }: BottleProps) {
  // Neutral color palettes that can be recolored
  const plasticStyle = {
    body: 'from-blue-400/70 to-cyan-500/60',
    cap: 'bg-blue-700',
    highlight: 'bg-white/40',
    shadow: 'shadow-blue-400/30',
  }
  
  const glassStyle = {
    body: 'from-emerald-600/50 to-green-700/40',
    cap: 'bg-amber-700',
    highlight: 'bg-white/50',
    shadow: 'shadow-emerald-500/30',
  }
  
  const aluminumStyle = {
    body: 'from-slate-300/80 to-slate-400/70',
    top: 'bg-slate-500',
    tab: 'bg-slate-600',
    highlight: 'bg-white/60',
    shadow: 'shadow-slate-400/40',
  }

  return (
    <motion.div
      className="relative mb-[-2px]"
      initial={{ opacity: 0, y: -100, scale: 0.5, rotate: -15 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        delay: delay + index * 0.15,
        type: 'spring',
        stiffness: 150,
        damping: 12,
        mass: 0.8,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Container - Different shapes based on type */}
      <div className="relative w-full flex flex-col items-center">
        
        {/* PLASTIC BOTTLE - Tall, slim PET water bottle */}
        {type === 'plastic' && (
          <div className="relative h-20 flex flex-col items-center">
            {/* Screw cap */}
            <div className={`w-4 h-2 ${plasticStyle.cap} rounded-t-sm shadow-md relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
            
            {/* Neck ring */}
            <div className={`w-5 h-1 bg-gradient-to-b ${plasticStyle.body} border-l border-r border-white/20`} />
            
            {/* Long slim neck */}
            <div className={`w-4 h-5 bg-gradient-to-b ${plasticStyle.body} border-l border-r border-white/25 relative`}>
              <div className={`absolute top-0 left-0.5 w-1 h-4 ${plasticStyle.highlight} rounded-full blur-[0.5px]`} />
            </div>
            
            {/* Shoulder transition */}
            <div 
              className={`w-6 h-1.5 bg-gradient-to-b ${plasticStyle.body} border-l border-r border-white/20`}
              style={{ clipPath: 'polygon(33% 0%, 67% 0%, 100% 100%, 0% 100%)' }}
            />
            
            {/* Slim body */}
            <div className={`w-6 h-8 bg-gradient-to-br ${plasticStyle.body} border-l border-r border-white/30 ${plasticStyle.shadow} shadow-lg relative overflow-hidden`}>
              {/* Vertical highlight */}
              <div className={`absolute top-0 left-1 w-1.5 h-full ${plasticStyle.highlight} rounded-full blur-[1px]`} />
              
              {/* Label band */}
              <div className="absolute top-2 left-0 right-0 h-4 bg-white/10 border-t border-b border-white/15">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[5px] font-bold text-white/40">♻️</div>
                </div>
              </div>
            </div>
            
            {/* Tapered base */}
            <div 
              className={`w-6 h-1.5 bg-gradient-to-b ${plasticStyle.body} border-l border-r border-white/20`}
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 83% 100%, 17% 100%)' }}
            />
            
            {/* Bottom */}
            <div className={`w-5 h-1 bg-gradient-to-b ${plasticStyle.body} rounded-b-md border-l border-r border-b border-white/30 ${plasticStyle.shadow} shadow-md`} />
            
            {/* Ground shadow */}
            <div className="absolute bottom-[-3px] w-7 h-1.5 bg-black/20 rounded-full blur-sm" />
          </div>
        )}

        {/* GLASS BOTTLE - Slim wine/beer bottle profile */}
        {type === 'glass' && (
          <div className="relative h-20 flex flex-col items-center">
            {/* Cork/cap */}
            <div className={`w-3 h-2 ${glassStyle.cap} rounded-t-sm shadow-md relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600/30 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-600/40" />
            </div>
            
            {/* Long narrow neck */}
            <div className={`w-3 h-6 bg-gradient-to-b ${glassStyle.body} border-l border-r border-white/30 relative`}>
              {/* Glass shine */}
              <div className={`absolute top-0 left-0.5 w-0.5 h-5 ${glassStyle.highlight} rounded-full blur-[0.5px]`} />
            </div>
            
            {/* Shoulder */}
            <div 
              className={`w-5 h-2 bg-gradient-to-b ${glassStyle.body} border-l border-r border-white/25 relative`}
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
            >
              <div className={`absolute top-0 left-1 w-0.5 h-1.5 ${glassStyle.highlight} rounded-full blur-[0.5px]`} />
            </div>
            
            {/* Slim body */}
            <div className={`w-5 h-8 bg-gradient-to-br ${glassStyle.body} border-l border-r border-white/35 ${glassStyle.shadow} shadow-xl relative overflow-hidden`}>
              {/* Main glass highlight */}
              <div className={`absolute top-0 left-1 w-1 h-full ${glassStyle.highlight} rounded-full blur-[1px]`} />
              
              {/* Label area */}
              <div className="absolute top-2 left-0 right-0 h-4 bg-green-800/20 border-t border-b border-green-700/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[4px] font-bold text-white/30 tracking-wider">GLASS</div>
                </div>
              </div>
              
              {/* Secondary highlight */}
              <div className="absolute top-1 right-1 w-0.5 h-6 bg-white/20 rounded-full blur-[0.5px]" />
            </div>
            
            {/* Base */}
            <div className={`w-5 h-1.5 bg-gradient-to-b ${glassStyle.body} rounded-b-sm border-l border-r border-b border-white/35 ${glassStyle.shadow} shadow-lg relative`}>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20 rounded-b-sm" />
            </div>
            
            {/* Ground shadow */}
            <div className="absolute bottom-[-3px] w-6 h-1.5 bg-black/25 rounded-full blur-sm" />
          </div>
        )}

        {/* ALUMINUM CAN - Coca-Cola style with realistic proportions */}
        {type === 'aluminum' && (
          <div className="relative h-[4.5rem] flex flex-col items-center">
            {/* Top rim with pull-tab */}
            <div className={`w-8 h-1.5 ${aluminumStyle.top} rounded-t-md shadow-md relative overflow-hidden`}>
              {/* Metallic gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10" />
              
              {/* Pull-tab indentation */}
              <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-slate-600/60 rounded-full" />
            </div>
            
            {/* Concave top section */}
            <div 
              className={`w-8 h-1 bg-gradient-to-b ${aluminumStyle.body} border-l border-r border-white/30 relative`}
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
            </div>
            
            {/* Upper body */}
            <div className={`w-8 h-2 bg-gradient-to-br ${aluminumStyle.body} border-l border-r border-white/30 relative`}>
              {/* Metallic shine */}
              <div className={`absolute top-0 left-1.5 w-2 h-full ${aluminumStyle.highlight} rounded-full blur-[1px] opacity-70`} />
            </div>
            
            {/* Middle section with slight waist */}
            <div className={`w-8 h-7 bg-gradient-to-br ${aluminumStyle.body} border-l border-r border-white/35 ${aluminumStyle.shadow} shadow-lg relative overflow-hidden`}>
              {/* Main highlight stripe */}
              <div className={`absolute top-0 left-2 w-2.5 h-full ${aluminumStyle.highlight} rounded-full blur-[1px] opacity-80`} />
              
              {/* Label area with metallic effect */}
              <div className="absolute top-1.5 left-0 right-0 h-4 bg-gradient-to-r from-red-600/20 via-red-500/25 to-red-600/20 border-t border-b border-red-600/30">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[5px] font-bold text-white/50 tracking-tight">CAN</div>
                </div>
              </div>
              
              {/* Secondary highlight */}
              <div className="absolute top-0 right-2 w-1 h-full bg-white/30 rounded-full blur-[0.5px] opacity-60" />
              
              {/* Aluminum texture */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            {/* Bottom curve */}
            <div className={`w-8 h-1.5 bg-gradient-to-b ${aluminumStyle.body} border-l border-r border-white/30 relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            </div>
            
            {/* Base rim */}
            <div className={`w-8 h-1 bg-gradient-to-b from-slate-400/80 to-slate-500/70 rounded-b-md border-l border-r border-b border-white/35 ${aluminumStyle.shadow} shadow-md relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/20 rounded-b-md" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-600/40" />
            </div>
            
            {/* Ground shadow */}
            <div className="absolute bottom-[-3px] w-9 h-1.5 bg-black/30 rounded-full blur-sm" />
          </div>
        )}
      </div>
    </motion.div>
  )
}