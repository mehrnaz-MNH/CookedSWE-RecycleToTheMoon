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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
}
