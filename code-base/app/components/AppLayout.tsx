"use client";

import { useState } from "react";
import BottomNavigation from "@/app/components/BottomNavigation";
import UploadReceiptModal from "@/app/components/UploadReceiptModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      {/* Main content with padding for fixed navigation */}
      <main className="pb-20 min-h-screen">{children}</main>

      {/* Bottom Navigation */}
      <BottomNavigation onUploadClick={() => setIsUploadModalOpen(true)} />

      {/* Upload Modal */}
      <UploadReceiptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}
