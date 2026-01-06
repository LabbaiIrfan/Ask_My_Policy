import { useState } from 'react';
import { motion } from 'motion/react';
import {
  policyData,
  addOnCategories,
  addOns,
  riders,
  testimonials
} from '../../data/policyDetailData';

import { PolicyHeader } from './PolicyHeader';
import { PolicyInfo } from './PolicyInfo';
import { PremiumSummary } from './PremiumSummary';
import { AddOnsSection } from './AddOnsSection';
import { RidersSection } from './RidersSection';
import { TestimonialsSection } from './TestimonialsSection';

interface PolicyDetailScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  onBack?: () => void;
  onBuyPolicy?: (policyData: any, selectedAddOns: string[], selectedRiders: string[]) => void;
}

export function PolicyDetailScreen({ onOpenMenu, onBack, onBuyPolicy }: PolicyDetailScreenProps) {
  const [activeAddOnTab, setActiveAddOnTab] = useState('topup');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedRiders, setSelectedRiders] = useState<string[]>([]);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnName)
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const toggleRider = (riderName: string) => {
    setSelectedRiders(prev =>
      prev.includes(riderName)
        ? prev.filter(name => name !== riderName)
        : [...prev, riderName]
    );
  };

  const currentAddOns = addOns[activeAddOnTab as keyof typeof addOns] || [];

  const handleBuyNow = () => {
    if (onBuyPolicy) {
      onBuyPolicy(policyData, selectedAddOns, selectedRiders);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PolicyHeader onBack={onBack} onOpenMenu={onOpenMenu} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 lg:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-sm border border-orange-100/50"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
            <PolicyInfo policyData={policyData} />
            <PremiumSummary policyData={policyData} onBuyNow={handleBuyNow} />
          </div>
        </motion.div>

        <AddOnsSection
          activeTab={activeAddOnTab}
          onTabChange={setActiveAddOnTab}
          selectedAddOns={selectedAddOns}
          onToggleAddOn={toggleAddOn}
          addOnCategories={addOnCategories}
          currentAddOns={currentAddOns}
        />

        <RidersSection
          selectedRiders={selectedRiders}
          onToggleRider={toggleRider}
          riders={riders}
        />

        <TestimonialsSection
          testimonials={testimonials}
          averageRating={4.8}
          totalReviews={2847}
        />
      </div>
    </div>
  );
}