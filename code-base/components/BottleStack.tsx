'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BottleStackProps {
  count?: number;
}

const BottleStack = ({ count = 6}: BottleStackProps) => {
  const bottles = Array.from({ length: count }, (_, i) => i);

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {bottles.map((bottle, index) => (
        <motion.svg
          key={bottle}
          viewBox="0 0 40 80"
          className="w-6 h-12 opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.8,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: index * 0.1, duration: 0.3 },
            y: {
              delay: index * 0.1,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
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
        </motion.svg>
      ))}
    </motion.div>
  );
};

export default BottleStack;
