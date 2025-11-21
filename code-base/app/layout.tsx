"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import BottomNavigation from "@/components/profile/BottomNavigation";
import UploadReceiptModal from "@/components/profile/UploadReceiptModal";
import ViewSelector from "@/components/profile/ViewSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note: metadata export must be in a Server Component
// You'll need to move this - see solution below

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("My Recycling");
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

  const views = ["My Recycling", "Green Team Recycling", "City Recycling"];

  const handleViewSelect = (view: string) => {
    setCurrentView(view);
    setIsViewDropdownOpen(false);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header with ViewSelector */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 shadow-sm flex items-center justify-end">
          <ViewSelector
            currentView={currentView}
            views={views}
            isOpen={isViewDropdownOpen}
            onToggle={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            onSelectView={handleViewSelect}
          />
        </div>

        {/* Main content area with padding for fixed nav */}
        <div className="pb-20">{children}</div>

        {/* Bottom Navigation */}
        <BottomNavigation onUploadClick={() => setIsUploadModalOpen(true)} />

        {/* Upload Modal */}
        <UploadReceiptModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </body>
    </html>
  );
}
