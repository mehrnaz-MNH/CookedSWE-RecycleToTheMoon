/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import CoinBalance from "../components/CoinBalance";
import TabButton from "../components/DonateTabButton";
import FriendCard from "../components/FriendCard";
import CharityCard from "../components/CharityCard";
import DonateModal from "../components/DonateModal";
import { useUser, useDonations, DEMO_USER_ID } from "../lib/hooks";

interface Charity {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalDonations: number;
}

export default function DonatePage() {
  const [activeTab, setActiveTab] = useState<"friends" | "charities">(
    "friends"
  );
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState(10);

  const { user, loading, refetch: refetchUser } = useUser(DEMO_USER_ID);
  const { createDonation, loading: donating } = useDonations(DEMO_USER_ID);

  const availableCoins = user?.digitalCoins || 0;

  // Mock friends data - in production, fetch from user.friends with populated data
  const friends = user?.friends || [
    { id: "1", name: "Sarah Johnson", avatar: "🌟" },
    { id: "2", name: "Mike Chen", avatar: "🚀" },
    { id: "3", name: "Emma Davis", avatar: "💎" },
    { id: "4", name: "John Smith", avatar: "⚡" },
  ];

  const charities: Charity[] = [
    {
      id: "ocean_cleanup",
      name: "Ocean Cleanup",
      description: "Cleaning plastic from oceans and rivers worldwide",
      icon: "🌊",
      totalDonations: 15420,
    },
    {
      id: "plant_trees",
      name: "Plant Trees Initiative",
      description: "Planting trees to combat climate change",
      icon: "🌳",
      totalDonations: 12850,
    },
    {
      id: "wildlife",
      name: "Wildlife Conservation",
      description: "Protecting endangered species and habitats",
      icon: "🦁",
      totalDonations: 10230,
    },
    {
      id: "clean_energy",
      name: "Clean Energy Fund",
      description: "Supporting renewable energy projects",
      icon: "⚡",
      totalDonations: 8965,
    },
  ];

  const handleDonate = async () => {
    try {
      const donationData: any = {
        amount: donationAmount,
        type: selectedRecipient.type,
      };

      if (selectedRecipient.type === "friend") {
        donationData.toUserId = selectedRecipient.id || selectedRecipient._id;
      } else {
        donationData.charityId = selectedRecipient.id;
      }

      await createDonation(donationData);

      // Refresh user data to update coin balance
      await refetchUser();

      setShowDonateModal(false);
      setDonationAmount(10);
      setSelectedRecipient(null);

      // Show success message (you could add a toast notification here)
      alert(`Successfully donated ${donationAmount} coins!`);
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    }
  };

  const openDonateModal = (recipient: any, type: "friend" | "charity") => {
    setSelectedRecipient({ ...recipient, type });
    setShowDonateModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-darkNavy pb-24 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-darkNavy pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Donate Coins
        </h1>
        <CoinBalance availableCoins={availableCoins} />
      </div>

      {/* Tab navigation */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          <TabButton
            icon={Users}
            label="Friends"
            isActive={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
          />
          <TabButton
            icon={Building2}
            label="Charities"
            isActive={activeTab === "charities"}
            onClick={() => setActiveTab("charities")}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Friends Tab */}
        {activeTab === "friends" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/60 text-sm mb-6">
              Support your friends by donating coins. Your generosity helps them
              reach their recycling goals!
            </p>

            <div className="space-y-3">
              {friends.map((friend: any, index: number) => (
                <FriendCard
                  key={friend.id || friend._id}
                  friend={{
                    id: friend.id || friend._id,
                    name: friend.name || friend.username,
                    avatar: friend.avatar,
                  }}
                  index={index}
                  onDonate={() => openDonateModal(friend, "friend")}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Charities Tab */}
        {activeTab === "charities" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/60 text-sm mb-6">
              Make a real-world impact by donating to verified environmental
              charities.
            </p>

            <div className="space-y-4">
              {charities.map((charity, index) => (
                <CharityCard
                  key={charity.id}
                  charity={charity}
                  index={index}
                  onDonate={() => openDonateModal(charity, "charity")}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Donate Modal */}
      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        recipient={selectedRecipient}
        donationAmount={donationAmount}
        setDonationAmount={setDonationAmount}
        availableCoins={availableCoins}
        onDonate={handleDonate}
      />
    </div>
  );
}
