"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import BottomNavigation from "@/app/components/BottomNavigation";
import UploadReceiptModal from "@/app/components/UploadReceiptModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const pathname = usePathname();

  // Hide navigation on login and root pages
  const hideNav = pathname === "/login" ;

  return (
    <>
      {/* Main content with padding for fixed navigation */}
      <main className={hideNav ? "min-h-screen" : "pb-20 min-h-screen"}>
        {children}
      </main>

      {/* Bottom Navigation - hidden on login/root */}
      {!hideNav && (
        <BottomNavigation onUploadClick={() => setIsUploadModalOpen(true)} />
      )}

      {/* Upload Modal */}
      <UploadReceiptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}
