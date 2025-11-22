'use client';

import React from 'react';

interface BottleStackProps {
  count?: number;
}

const BottleStack = ({ count = 6}: BottleStackProps) => {
  const bottles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-1">
      {bottles.map((bottle) => (
        <svg
          key={bottle}
          viewBox="0 0 40 80"
          className="w-6 h-12 opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: `float 3s ease-in-out infinite ${bottle * 0.2}s`,
          }}
        >
          {/* Bottle neck */}
          <rect x="14" y="0" width="12" height="20" fill="#1a1f2e" rx="2" />

          {/* Bottle cap */}
          <rect x="12" y="0" width="16" height="8" fill="#2a3040" rx="3" />

          {/* Bottle body */}
          <path
            d="M 10 20 L 8 28 L 8 70 Q 8 75 13 75 L 27 75 Q 32 75 32 70 L 32 28 L 30 20 Z"
            fill="#1a1f2e"
          />

          {/* Bottle highlight */}
          <rect x="10" y="25" width="3" height="40" fill="#2a3548" opacity="0.3" rx="1" />
        </svg>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default BottleStack;
