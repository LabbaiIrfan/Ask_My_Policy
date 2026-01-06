import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { companies } from '../../data/companyData';
import { CompanyHeader } from './CompanyHeader';
import { CompanyHero } from './CompanyHero';
import { CompanyOverview } from './CompanyOverview';
import { CompanyFinancials } from './CompanyFinancials';
import { CompanyPerformance } from './CompanyPerformance';

interface CompanyAnalysisProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

export function CompanyAnalysis({ onOpenMenu }: CompanyAnalysisProps) {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'performance'>('overview');
  const [compareMode, setCompareMode] = useState(false);

  const handleCompanyChange = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) setSelectedCompany(company);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      <div className="lg:hidden glass-card border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Company Analysis</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <CompanyHeader
          selectedCompany={selectedCompany}
          companies={companies}
          onCompanyChange={handleCompanyChange}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
        />

        <CompanyHero selectedCompany={selectedCompany} />

        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview'
              ? 'bg-white text-orange-600 shadow-md'
              : 'text-gray-600 hover:bg-white/50'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'financial'
              ? 'bg-white text-orange-600 shadow-md'
              : 'text-gray-600 hover:bg-white/50'
              }`}
          >
            Financial Metrics
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'performance'
              ? 'bg-white text-orange-600 shadow-md'
              : 'text-gray-600 hover:bg-white/50'
              }`}
          >
            Performance History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <CompanyOverview selectedCompany={selectedCompany} />
          )}

          {activeTab === 'financial' && (
            <CompanyFinancials selectedCompany={selectedCompany} />
          )}

          {activeTab === 'performance' && (
            <CompanyPerformance selectedCompany={selectedCompany} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
