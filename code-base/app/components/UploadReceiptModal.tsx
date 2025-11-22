'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadReceiptModal({ isOpen, onClose }: UploadReceiptModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    dateTime: string;
    quantity: number;
    items: string;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeReceipt = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // DEMO: Hardcoded values for demonstration
      setAnalysisResult({
        dateTime: new Date().toLocaleString(),
        quantity: 42, // Hardcoded demo value: 42 items
        items: 'Plastic bottles, aluminum cans',
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmitReceipt = async () => {
    if (!analysisResult) return;

    try {
      // Get userId from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in to submit receipts');
        return;
      }

      // Submit to database
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          quantity: analysisResult.quantity,
          itemType: 'Mixed recyclables', // Hardcoded item type
          receiptUrl: previewUrl || '', // Use the preview image as receipt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit receipt');
      }

      const data = await response.json();
      console.log('Receipt submitted successfully:', data);

      // Show success message
      alert(`Success! You earned ${data.pointsEarned} points for recycling ${analysisResult.quantity} items!`);

      handleClose();

      // Refresh the page to show updated stats
      window.location.reload();
    } catch (error) {
      console.error('Error submitting receipt:', error);
      alert('Failed to submit receipt. Please try again.');
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h3
                className="text-xl font-bold text-gray-900 dark:text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Submit Recycling Receipt
              </motion.h3>
              <motion.button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

        {!uploadedFile ? (
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receipt image (PNG, JPG, PDF)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
              />
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Upload your recycling receipt from Containers for Change or similar services
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                />
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setPreviewUrl(null);
                    setAnalysisResult(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            {analysisResult ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Analysis Complete</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {analysisResult.dateTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {analysisResult.quantity} items
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Items:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {analysisResult.items}
                    </span>
                  </div>
                </div>
              </div>
            ) : isAnalyzing ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-blue-700 dark:text-blue-400 font-medium">
                  Analyzing receipt...
                </span>
              </div>
            ) : (
              <button
                onClick={handleAnalyzeReceipt}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Analyze Receipt
              </button>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReceipt}
                disabled={!analysisResult}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  analysisResult
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
