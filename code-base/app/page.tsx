'use client';

import React, { useState } from 'react';
import SpaceBackground from '@/components/SpaceBackground';
import TypeDropdown from '@/components/TypeDropdown';
import RecycleCounter from '@/components/RecycleCounter';
import BottleStack from '@/components/BottleStack';
import BottomNav from '@/components/BottomNav';
import DistanceAxis from '@/components/DistanceAxis';

type CounterType = 'individual' | 'group';

export default function Home() {
  const [counterType, setCounterType] = useState<CounterType>('individual');

  // Mock data - will be replaced with MongoDB data later
  const mockData = {
    individual: 10532,
    group: 25780,
  };

  const currentCount = mockData[counterType];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Space background with stars and moon */}
      <SpaceBackground />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto">
        {/* Header with dropdown */}
        <header className="pt-4 px-4">
          <TypeDropdown value={counterType} onChange={setCounterType} />
        </header>

        {/* Main counter area */}
        <main className="flex-1 flex flex-col items-center justify-end pb-20 relative">
          <div className="relative w-full flex flex-col items-center">
            {/* Distance Axis - positioned from top to bottom of bottle stack */}
            <div className="absolute left-0 right-0 top-0 bottom-32 z-10 pointer-events-none mb-20">
              <DistanceAxis />
            </div>

            {/* Bottle stack */}
            <div className="relative z-20 mb-5">
              <BottleStack count={5} />
            </div>

            {/* Counter with Earth */}
            <div className="relative z-10 -mt-8">
              <RecycleCounter count={currentCount} />
            </div>
          </div>
        </main>

        {/* Bottom navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
