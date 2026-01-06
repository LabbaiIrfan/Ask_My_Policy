import { useState } from 'react';
import { cities, hospitalsByCity, reimburseSteps } from '../../data/claimsData';

import { ClaimsHeader } from './ClaimsHeader';
import { CashlessSection } from './CashlessSection';
import { ReimburseSection } from './ReimburseSection';
import { CopaySection } from './CopaySection';
import { ExpertSection } from './ExpertSection';

interface ClaimsScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

export function ClaimsScreen(_props: ClaimsScreenProps) {
  const [activeSection, setActiveSection] = useState('cashless');
  const [selectedCity, setSelectedCity] = useState('');
  const [showHospitals, setShowHospitals] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24 lg:pb-6">

        {/* Navigation Cards */}
        <ClaimsHeader activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Content Sections */}

        {/* Cashless Section - City & Hospital Selection */}
        {activeSection === 'cashless' && (
          <CashlessSection
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            showHospitals={showHospitals}
            setShowHospitals={setShowHospitals}
            cities={cities}
            hospitalsByCity={hospitalsByCity}
          />
        )}

        {/* Reimburse Section - Steps */}
        {activeSection === 'reimburse' && (
          <ReimburseSection reimburseSteps={reimburseSteps} />
        )}

        {/* Co-pay Section */}
        {activeSection === 'copay' && <CopaySection />}

        {/* Expert Section */}
        {activeSection === 'expert' && <ExpertSection />}
      </div>
    </div>
  );
}