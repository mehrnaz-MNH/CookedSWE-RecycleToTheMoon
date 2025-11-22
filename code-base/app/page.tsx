"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");

    if (userId) {
      // User is logged in, redirect to home
      router.push("/home");
    } else {
      // User not logged in, redirect to login
      router.push("/login");
    }
  }, [router]);

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
        <main className="flex-1 flex flex-col items-center justify-end relative pb-12">
          <div className="relative w-full flex flex-col items-center">
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
      </div>
    </div>
  );
}
