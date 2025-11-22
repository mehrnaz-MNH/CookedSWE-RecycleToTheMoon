'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ParisCounterProps {
  count: number;
}

const ParisCounter = ({ count }: ParisCounterProps) => {
  const [displayCount, setDisplayCount] = useState(0);
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    spring.set(count);
  }, [spring, count]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayCount(Math.floor(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Counter content */}
      <div className="relative text-white text-center">
        <motion.div
          className="text-6xl font-bold tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          key={count}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayCount.toLocaleString()}
        </motion.div>
        <motion.div
          className="text-sm mt-2 font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          containers recycled
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParisCounter;