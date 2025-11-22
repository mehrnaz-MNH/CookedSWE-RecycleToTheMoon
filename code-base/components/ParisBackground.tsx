'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ParisBackground = () => {
  // Generate random clouds
  const clouds = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 40 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    size: Math.random() * 30 + 40,
    delay: Math.random() * 2,
  }));

  // Trees on the ground
  const trees = [
    { id: 1, left: '5%', size: 1 },
    { id: 2, left: '12%', size: 0.8 },
    { id: 3, left: '88%', size: 0.9 },
    { id: 4, left: '95%', size: 1.1 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#A8D8F0] to-[#C8E6F5]" />

      {/* Animated clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
          }}
          animate={{
            x: [0, 20, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cloud.delay,
          }}
        >
          {/* Cloud shape using multiple circles */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-[20%] w-[30%] h-[60%] bg-white rounded-full opacity-90" />
            <div className="absolute bottom-0 left-[40%] w-[40%] h-[80%] bg-white rounded-full opacity-95" />
            <div className="absolute bottom-0 left-[65%] w-[35%] h-[65%] bg-white rounded-full opacity-90" />
            <div className="absolute bottom-0 left-[10%] w-[70%] h-[50%] bg-white rounded-full opacity-85" />
          </div>
        </motion.div>
      ))}

      {/* Eiffel Tower - Tall, reaching near top of screen */}
      <motion.div
        className="absolute bottom-[-35%] left-1/2 -translate-x-1/2 w-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-end justify-center" style={{ height: '120vh' }}>
          <Image
            src="/eiffelTower.png"
            alt="Eiffel Tower"
            width={600}
            height={1300}
            className="drop-shadow-2xl"
            style={{
              height: '180%',
              width: 'auto',
              objectFit: 'contain',
              transform: 'scale(1.20)'
            }}
          />
        </div>
      </motion.div>

      {/* Ground with grass */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#7CB342] to-[#689F38]">
        {/* Grass texture */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-1 bg-[#558B2F]"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 15 + 5}px`,
              }}
            />
          ))}
        </div>

        {/* Trees */}
        {trees.map((tree) => (
          <motion.div
            key={tree.id}
            className="absolute bottom-0"
            style={{
              left: tree.left,
              transform: `scale(${tree.size})`,
            }}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: tree.size, y: 0 }}
            transition={{
              delay: 0.5 + tree.id * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
          >
            {/* Tree trunk */}
            <div className="relative">
              <div className="w-3 h-12 bg-[#6D4C41] mx-auto rounded-t-sm" />
              
              {/* Tree foliage - three circles */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="relative w-16 h-16">
                  <div className="absolute bottom-0 left-1 w-10 h-10 bg-[#66BB6A] rounded-full" />
                  <div className="absolute bottom-2 left-4 w-12 h-12 bg-[#4CAF50] rounded-full" />
                  <div className="absolute bottom-1 right-1 w-10 h-10 bg-[#66BB6A] rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParisBackground;