import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader2, ServerCrash, ShieldCheck, Plus } from 'lucide-react';

import { ComparisonTable } from './ComparisonTable';
import { ComparisonHeader } from './ComparisonHeader';
import { PolicySelectionModal } from './PolicySelectionModal';
import { AiRecommendation } from './AiRecommendation';
import { RAW_POLICIES, type PolicyInfo, type ComparisonData, getInsurerIcon } from '../../data/comparisonData';

interface ComparisonScreenProps {
  onOpenMenu?: () => void;
  onToggleSidebar?: () => void;
  initialSelectedPolicies?: string[];
}

export function ComparisonScreen({ initialSelectedPolicies = [] }: ComparisonScreenProps) {
  // --- State Management ---
  const [allPolicies, setAllPolicies] = useState<PolicyInfo[]>([]);
  const [selectedPolicyNames, setSelectedPolicyNames] = useState<string[]>(initialSelectedPolicies);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for modal selections
  const [tempSelectedPolicies, setTempSelectedPolicies] = useState<string[]>([]);

  useEffect(() => {
    const formattedPolicies: PolicyInfo[] = RAW_POLICIES.map((p, index) => ({
      id: `p-${index}`,
      name: p.policy_name,
      company: p.insurer,
      icon: getInsurerIcon(p.insurer)
    }));
    setAllPolicies(formattedPolicies);
  }, []);

  useEffect(() => {
    if (selectedPolicyNames.length === 0) {
      setComparisonData(null);
      setAiAnalysis(null);
      setIsLoading(false);
      return;
    }

    const fetchComparisonData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use environment variable or constant for API URL in real app
        const response = await fetch('https://askmypolicybackend.onrender.com/compare', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            policy_names: selectedPolicyNames.map(name => name.toLowerCase()),
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        setComparisonData(data.policy_comparison);
        setAiAnalysis(data.ai_analysis);

      } catch (err) {
        setError('Failed to fetch comparison data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparisonData();
  }, [selectedPolicyNames]);


  // --- UI Handlers ---
  const handleModalOpen = () => {
    setTempSelectedPolicies(selectedPolicyNames);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setSelectedPolicyNames(tempSelectedPolicies);
    setIsModalOpen(false);
  };

  const handleTempPolicyToggle = (policyName: string) => {
    setTempSelectedPolicies(prev =>
      prev.includes(policyName)
        ? prev.filter(name => name !== policyName)
        : [...prev, policyName]
    );
  };

  const handleRemovePolicy = (policyName: string) => {
    setSelectedPolicyNames(prev => prev.filter(name => name !== policyName));
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PolicySelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allPolicies={allPolicies}
        tempSelectedPolicies={tempSelectedPolicies}
        onToggle={handleTempPolicyToggle}
        onConfirm={handleModalConfirm}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ComparisonHeader
          onOpenModal={handleModalOpen}
          hasPolicies={selectedPolicyNames.length > 0}
        />

        {/* Empty State */}
        {!isLoading && !error && selectedPolicyNames.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck size={48} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Comparison</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Select up to 3 health insurance policies to see a detailed side-by-side comparison of features, benefits, and costs.
            </p>
            <button
              onClick={handleModalOpen}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Select Policies</span>
            </button>
          </div>
        )}

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-gray-200">
            <Loader2 className="animate-spin text-orange-500" size={48} />
            <p className="mt-4 text-lg font-medium text-gray-700">Fetching latest policy data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-xl border border-red-200 p-4 text-center">
            <ServerCrash className="text-red-500" size={48} />
            <p className="mt-4 text-lg font-medium text-red-700">Oops! Something went wrong.</p>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Main Content - Renders only when data is available */}
        <AnimatePresence>
          {!isLoading && !error && comparisonData && (
            <>
              <ComparisonTable
                selectedPolicyNames={selectedPolicyNames}
                allPolicies={allPolicies}
                comparisonData={comparisonData}
                onRemovePolicy={handleRemovePolicy}
              />

              <AiRecommendation aiAnalysis={aiAnalysis} />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}