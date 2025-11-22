"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SpaceBackground from "@/components/SpaceBackground";
import ParisBackground from "@/components/ParisBackground";
import TypeDropdown from "@/components/TypeDropdown";
import RecycleCounter from "@/components/RecycleCounter";
import ParisCounter from "@/components/ParisCounter";
import BottleStack from "@/components/BottleStack";
import BottomNav from "@/components/BottomNav";
import DistanceAxis from "@/components/DistanceAxis";
import EiffelHeightAxis from "@/components/EiffelHeightAxis";

type CounterType = "individual" | "group";

export default function Home() {
  const [counterType, setCounterType] = useState<CounterType>("individual");

  // Mock data - will be replaced with MongoDB data later
  const mockData = {
    individual: 10532,
    group: 25780,
  };

  const currentCount = mockData[counterType];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background - switches based on counter type */}
      <AnimatePresence mode="wait">
        {counterType === "individual" ? (
          <motion.div
            key="paris"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ParisBackground />
          </motion.div>
        ) : (
          <motion.div
            key="space"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpaceBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Height Axis - only for paris/individual scene */}
      <AnimatePresence>
        {counterType === "individual" && (
          <motion.div
            className="fixed inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full w-full">
              <div className="absolute left-0 right-0 bottom-[30%]" style={{ height: '50vh' }}>
                <EiffelHeightAxis />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Distance Axis - only for space/group scene */}
      <AnimatePresence>
        {counterType === "group" && (
          <motion.div
            className="fixed inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full max-w-md mx-auto">
              <div className="absolute left-0 right-0 top-32 bottom-52">
                <DistanceAxis />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed header with dropdown - removed from normal flow */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
        <TypeDropdown value={counterType} onChange={setCounterType} />
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen max-w-md mx-auto overflow-hidden">
        {/* Main counter area */}
        <main className="flex-1 flex flex-col items-center justify-end pb-20 relative overflow-hidden min-h-0 pt-20">
          <div className="relative w-full flex flex-col items-center gap-4">
            {/* Bottle stack - positioned differently based on scene */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bottles-${counterType}`}
                className={`relative z-20`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <BottleStack count={5} />
              </motion.div>
            </AnimatePresence>

            {/* Counter - switches based on scene */}
            <AnimatePresence mode="wait">
              {counterType === "individual" ? (
                <motion.div
                  key="paris-counter"
                  className="relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <ParisCounter count={currentCount} />
                </motion.div>
              ) : (
                <motion.div
                  key="space-counter"
                  className="relative z-10 -mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <RecycleCounter count={currentCount} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Bottom navigation - stays constant */}
        <BottomNav />
      </div>
    </div>
  );
}
