import { useState } from 'react';
import { activePolicies } from '../../data/myPoliciesData';
import { MyPoliciesStats } from './MyPoliciesStats';
import { MyPoliciesTabs } from './MyPoliciesTabs';
import { PolicyList } from './PolicyList';
import { EmptyState } from './EmptyState';

interface MyPoliciesProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

export function MyPolicies({ }: MyPoliciesProps) {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Summary Stats */}
        <MyPoliciesStats
          activeCount={3}
          renewalCount={1}
          totalPremium="₹46.9K"
          totalCoverage="₹2.3Cr"
        />

        {/* Tab Navigation */}
        <MyPoliciesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{ active: 3, expired: 0, claiming: 2 }}
        />

        {/* Policy Grid */}
        {activeTab === 'active' && <PolicyList policies={activePolicies} />}

        {/* Empty State for other tabs */}
        {activeTab !== 'active' && <EmptyState activeTab={activeTab} />}
      </div>
    </div>
  );
}