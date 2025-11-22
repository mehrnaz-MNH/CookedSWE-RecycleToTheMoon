'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useSpring, useTransform } from 'framer-motion';

interface RecycleCounterProps {
  count: number;
}

const RecycleCounter = ({ count }: RecycleCounterProps) => {
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
      className="relative flex items-end justify-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative w-full flex justify-center">
        <motion.div
          className="relative w-full"
          animate={{ rotate: [0, 1, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/newearth.png"
            alt="Earth"
            width={480}
            height={480}
            className="w-full h-auto object-contain"
            priority
          />

          {/* Counter overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
            <div className="text-white text-center">
              <motion.div
                className="text-6xl font-bold tracking-tight"
                key={count}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {displayCount.toLocaleString()}
              </motion.div>
              <motion.div
                className="text-sm mt-2 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                containers recycled
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecycleCounter;
