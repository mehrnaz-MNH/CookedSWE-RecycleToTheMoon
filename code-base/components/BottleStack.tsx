'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Bottle from './Bottle';

interface BottleStackProps {
  count?: number;
}

type BottleType = 'plastic' | 'glass' | 'aluminum';

const BottleStack = ({ count = 6 }: BottleStackProps) => {
  // Generate random bottle types for variety
  const bottleTypes: BottleType[] = useMemo(() => {
    const types: BottleType[] = ['plastic', 'glass', 'aluminum'];
    return Array.from({ length: count }, () =>
      types[Math.floor(Math.random() * types.length)]
    );
  }, [count]);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col-reverse items-center gap-0 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {bottleTypes.map((type, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.15,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <Bottle
            type={type}
            index={index}
            delay={0}
          />
        </motion.div>
      ))}
      
      {/* Subtle glow effect at the base */}
      <motion.div
        className="absolute bottom-0 w-16 h-3 bg-green-400/20 rounded-full blur-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{
          delay: count * 0.15 + 0.3,
          duration: 0.8,
        }}
      />
    </motion.div>
  );
};

export default BottleStack;
