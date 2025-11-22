"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpaceBackground from "@/components/SpaceBackground";
import TypeDropdown from "@/components/TypeDropdown";
import RecycleCounter from "@/components/RecycleCounter";
import BottleStack from "@/components/BottleStack";
import BottomNav from "@/components/BottomNav";
import DistanceAxis from "@/components/DistanceAxis";
import { useStats } from "@/app/lib/hooks";

type CounterType = "individual" | "group";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [counterType, setCounterType] = useState<CounterType>("individual");

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      // Not logged in, redirect to login
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserId(storedUserId);
    }
  }, [router]);

  const { stats, loading } = useStats(userId || "");

  const currentCount = loading ? 5000 : stats[counterType] || 0;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Space background with stars and moon */}
      <SpaceBackground />

      {/* Distance Axis - spans from moon to earth surface */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="relative h-full max-w-md mx-auto">
          <div className="absolute left-0 right-0 top-32 bottom-52">
            <DistanceAxis />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto">
        {/* Header with dropdown */}
        <header className="pt-4 px-4">
          <TypeDropdown value={counterType} onChange={setCounterType} />
        </header>

        {/* Main counter area */}
        <main className="flex-1 flex flex-col items-center justify-end pb-20 relative">
          <div className="relative w-full flex flex-col items-center">
            {/* Bottle stack */}
            <div className="relative z-20 mb-5">
              <BottleStack count={5} />
            </div>

            {/* Counter with Earth */}
            <div className="relative z-10 -mt-8">
              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                <RecycleCounter count={currentCount} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
