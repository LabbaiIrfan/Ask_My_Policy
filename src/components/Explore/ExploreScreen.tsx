import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart2, X, ArrowRight } from 'lucide-react';
import { policies, type Policy } from '../../data/policies';

// Import New Components
import { HeroSection } from './HeroSection';
import { SearchSection } from './SearchSection';
import { StatsSection } from './StatsSection';
import { FilterWizard, type FilterData } from './FilterWizard';
import { SearchResults } from './SearchResults';

interface ExploreScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  userData?: any;
  onNavigateToDetail?: () => void;
  onBuyPolicy?: (policy: Policy) => void;
  onComparePolicies?: (policies: string[]) => void;
}

export function ExploreScreen({ onBuyPolicy, onComparePolicies }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterWizard, setShowFilterWizard] = useState(false);

  // Filter Data State
  const [filterData, setFilterData] = useState<FilterData>({
    category: '',
    gender: '',
    age: '',
    city: '',
    medicalHistory: [],
    budget: '',
    requiredCoverage: ''
  });

  const [showResults, setShowResults] = useState(false);

  // Use shared policies data
  const [filteredPolicies, setFilteredPolicies] = useState(policies);

  // Comparison State
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>(null);

  // Search Results Header State
  const [resultsHeader, setResultsHeader] = useState('Your Recommendations');
  const [resultsSubheader, setResultsSubheader] = useState('Based on your preferences and requirements');

  // --- Comparison Logic ---

  const toggleDetails = (id: string) => {
    setExpandedPolicyId(prev => prev === id ? null : id);
  };

  const togglePolicySelection = (policyName: string) => {
    setSelectedPolicies(prev => {
      if (prev.includes(policyName)) {
        return prev.filter(p => p !== policyName);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, policyName];
    });
  };

  const handleCompare = () => {
    if (onComparePolicies && selectedPolicies.length >= 2) {
      onComparePolicies(selectedPolicies);
    }
  };

  const clearSelection = () => {
    setSelectedPolicies([]);
  };

  // --- Search & Filter Logic ---

  // Live Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        handleSearch();
      } else if (searchQuery.trim().length === 0) {
        setShowResults(false);
        setFilteredPolicies(policies);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPolicies(policies);
      setShowResults(false);
      return;
    }

    const filtered = policies.filter(policy =>
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setResultsHeader(`Search Results for "${searchQuery}"`);
    setResultsSubheader(`Found ${filtered.length} plans matching your search`);
    setFilteredPolicies(filtered);
    setShowResults(true);
  };

  const handleFilterComplete = () => {
    // Generate recommendations based on filter data
    const recommended = generateRecommendations();
    // policies not in recommended
    const others = policies.filter(p => !recommended.some(r => r.id === p.id));

    setResultsHeader('Your Recommendations');
    setResultsSubheader('Based on your preferences and requirements');
    setFilteredPolicies([...recommended, ...others]);
    setShowResults(true);
    setShowFilterWizard(false);
  };

  const generateRecommendations = () => {
    let recommended = [...policies];

    // Filter by category
    if (filterData.category) {
      recommended = recommended.filter(p => p.category === filterData.category);
    }

    // Budget filtering
    if (filterData.budget) {
      const budgetNum = parseInt(filterData.budget.replace(/[^\d]/g, ''));
      recommended = recommended.filter(p => {
        const premiumNum = parseInt(p.premium.replace(/[^\d]/g, ''));
        return premiumNum <= budgetNum * 1.2; // Allow 20% flexibility
      });
    }

    // Age-based recommendations
    if (filterData.age) {
      if (filterData.age === '65+') {
        recommended = recommended.filter(p => p.category === 'Senior' || p.name.includes('Senior'));
      } else if (filterData.age === '18-35' && filterData.gender === 'Female') {
        recommended = recommended.filter(p =>
          p.features.some(f => f.includes('Maternity')) || p.category === 'Maternity'
        );
      }
    }

    // Medical history based
    if (filterData.medicalHistory.includes('Diabetes')) {
      recommended = recommended.filter(p => p.name.includes('Diabetes') || p.category === 'Individual');
    }

    // Mark as recommended
    return recommended.slice(0, 3).map(p => ({ ...p, recommended: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-[95%] mx-auto px-4 py-6">
        {!showFilterWizard && (
          <div className={`flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-8 transition-all duration-500 ${showResults ? 'min-h-fit' : 'min-h-[60vh]'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 w-full"
            >
              <HeroSection />

              <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                onOpenFilterWizard={() => setShowFilterWizard(true)}
              />

              {showResults && (
                <SearchResults
                  resultsHeader={resultsHeader}
                  resultsSubheader={resultsSubheader}
                  filteredPolicies={filteredPolicies}
                  selectedPolicies={selectedPolicies}
                  expandedPolicyId={expandedPolicyId}
                  onToggleDetails={toggleDetails}
                  onToggleSelection={togglePolicySelection}
                  onBuyPolicy={onBuyPolicy}
                  onCompare={handleCompare}
                  onClearSelection={clearSelection}
                />
              )}

              {!showResults && <StatsSection />}
            </motion.div>
          </div>
        )}

        <FilterWizard
          isOpen={showFilterWizard}
          onClose={() => setShowFilterWizard(false)}
          onComplete={handleFilterComplete}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </div>

      {/* Comparison Box */}
      {/* Kept here or moved to a component? Let's keep small simple UI here or move it later. 
          Actually, let's keep it here for now as it floats over everything. relative to screen.
      */}
      <AnimatePresence>
        {selectedPolicies.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 lg:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full hidden sm:block">
                  <BarChart2 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Compare Plans</h3>
                  <p className="text-sm text-gray-500">
                    {selectedPolicies.length} {selectedPolicies.length === 1 ? 'plan' : 'plans'} selected
                    {selectedPolicies.length === 1 && <span className="text-orange-600 ml-2 font-medium">Add atleast 1 more to compare</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearSelection}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedPolicies.length < 2}
                  className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${selectedPolicies.length >= 2
                    ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-primary/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <span>Compare Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}