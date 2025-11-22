'use client';

import React from 'react';
import Image from 'next/image';

interface RecycleCounterProps {
  count: number;
}

const RecycleCounter = ({ count }: RecycleCounterProps) => {
  return (
    <div className="relative flex items-end justify-center w-full">
      <div className="relative w-full flex justify-center">
        <div className="relative w-full">
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
              <div className="text-6xl font-bold tracking-tight">
                {count.toLocaleString()}
              </div>
              <div className="text-sm mt-2 font-medium tracking-wide">
                containers recycled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleCounter;
