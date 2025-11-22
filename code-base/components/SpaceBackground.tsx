'use client';

import React from 'react';

const SpaceBackground = () => {
  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 70}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#2a3550] -z-10 overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Moon base */}
          <circle cx="50" cy="50" r="45" fill="#e5e7eb" />

          {/* Moon craters for texture */}
          <circle cx="35" cy="35" r="8" fill="#d1d5db" opacity="0.6" />
          <circle cx="60" cy="40" r="6" fill="#d1d5db" opacity="0.5" />
          <circle cx="45" cy="60" r="10" fill="#d1d5db" opacity="0.7" />
          <circle cx="65" cy="65" r="5" fill="#d1d5db" opacity="0.4" />
          <circle cx="30" cy="55" r="4" fill="#d1d5db" opacity="0.5" />

          {/* Shadows for depth */}
          <circle cx="70" cy="30" r="3" fill="#9ca3af" opacity="0.3" />
          <circle cx="50" cy="75" r="7" fill="#9ca3af" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export default SpaceBackground;
