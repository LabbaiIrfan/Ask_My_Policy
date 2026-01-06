import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  Plus,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Calendar,
  Bed,
  Baby,
  Clock,
  Stethoscope,
  Ambulance,
  Loader2,
  ServerCrash,
  ShieldCheck
} from 'lucide-react';

// --- Helper Types ---
interface PolicyInfo {
  id: string;
  name: string;
  company: string;
  icon: string;
}

interface ApiPolicyFeatures {
  preHospitalizationDays: number;
  postHospitalizationDays: number;
  sumInsuredRestoration: boolean;
  waitingPeriodInitialDays: number;
  waitingPeriodPEDMonths: number;
  advancedTreatmentsCovered: boolean;
  discountsAvailable: boolean;
  maternityCover: boolean;
  specialCovers: string[];
  roomRentCover: string;
  dayCareCover: boolean;
  ambulanceCover: boolean;
  optionalBenefits: string[];
}

type ComparisonData = Record<string, ApiPolicyFeatures>;

// --- Helper Functions & Components ---

// Helper to assign icons deterministically based on insurer
const getInsurerIcon = (insurer: string) => {
  if (insurer.includes('Aditya Birla')) return '🌞';
  if (insurer.includes('Star')) return '⭐';
  if (insurer.includes('Bajaj')) return '🛡️';
  if (insurer.includes('ICICI')) return '🏦';
  if (insurer.includes('Niva Bupa')) return '❤️';
  if (insurer.includes('Care')) return '💚';
  return '📄';
};

interface PolicySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPolicies: PolicyInfo[];
  tempSelectedPolicies: string[];
  onToggle: (policyName: string) => void;
  onConfirm: () => void;
}

const PolicySelectionModal = ({
  isOpen,
  onClose,
  allPolicies,
  tempSelectedPolicies,
  onToggle,
  onConfirm
}: PolicySelectionModalProps) => {
  const insurers = Array.from(new Set(allPolicies.map(p => p.company)));
  const [selectedInsurer, setSelectedInsurer] = useState<string | null>(null);

  // Filter policies based on selection
  const displayedPolicies = selectedInsurer
    ? allPolicies.filter(p => p.company === selectedInsurer)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-xl text-gray-900">Select Policies to Compare</h3>
                <p className="text-sm text-gray-500 mt-1">First select an insurer, then choose their policies.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar: Insurers List */}
              <div className="w-1/3 border-r bg-gray-50 overflow-y-auto p-4 space-y-2">
                <h4 className="font-semibold text-gray-700 mb-3 px-2">Insurers</h4>
                {insurers.map(insurer => (
                  <button
                    key={insurer}
                    onClick={() => setSelectedInsurer(insurer)}
                    className={`w-full text-left p-3 rounded-lg transition-all text-sm font-medium flex items-center space-x-3
                                          ${selectedInsurer === insurer
                        ? 'bg-white text-primary shadow-sm border border-primary/20 ring-1 ring-primary/10'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                  >
                    <span className="text-xl">{getInsurerIcon(insurer)}</span>
                    <span className="line-clamp-2">{insurer}</span>
                  </button>
                ))}
              </div>

              {/* Main Area: Policies List */}
              <div className="w-2/3 p-6 overflow-y-auto bg-white">
                {selectedInsurer ? (
                  <>
                    <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                      <span className="mr-2 text-2xl">{getInsurerIcon(selectedInsurer)}</span>
                      {selectedInsurer} Policies
                    </h4>
                    <div className="space-y-3">
                      {displayedPolicies.length > 0 ? (
                        displayedPolicies.map(policy => {
                          const isChecked = tempSelectedPolicies.includes(policy.name);
                          return (
                            <label key={policy.id} className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer border transition-all ${isChecked ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                              <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isChecked ? 'bg-primary text-white' : 'bg-gray-100 text-transparent border border-gray-300'}`}>
                                <CheckCircle size={14} />
                              </div>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onToggle(policy.name)}
                                className="sr-only"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{policy.name}</p>
                              </div>
                            </label>
                          )
                        })
                      ) : (
                        <p className="text-gray-500 italic">No policies found for this insurer.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShieldCheck size={64} className="mb-4 text-gray-300" />
                    <p className="text-lg">Select an insurer from the left to view policies</p>
                    <p className="text-sm mt-2 max-w-xs text-center">We have a wide range of insurers and plans to choose from.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t bg-white flex justify-between items-center z-10">
              <div className="text-sm font-medium text-gray-600">
                {tempSelectedPolicies.length} policies selected
              </div>
              <button
                onClick={onConfirm}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none flex items-center space-x-2"
                disabled={tempSelectedPolicies.length === 0}
              >
                <span>Compare Selected</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Component ---
interface ComparisonScreenProps {
  onOpenMenu?: () => void;
  onToggleSidebar?: () => void;
}

export function ComparisonScreen(_props: ComparisonScreenProps) {
  // --- State Management ---
  const [allPolicies, setAllPolicies] = useState<PolicyInfo[]>([]);
  const [selectedPolicyNames, setSelectedPolicyNames] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // State for modal selections
  const [tempSelectedPolicies, setTempSelectedPolicies] = useState<string[]>([]);


  // --- Data & Constants ---
  const RAW_POLICIES = [
    { policy_name: "Activ One", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Super Health Plus Top Up", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Fit", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Health", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Arogya Sanjeevani Policy", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Ekam Suraksha", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Activ Assure", insurer: "Aditya Birla Health Insurance Co. Limited" },
    { policy_name: "Super Star", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Diabetes Safe Insurance Policy", insurer: "Star Health and Allied Insurance Co. Ltd." },
    { policy_name: "Medi Classic Insurance Policy – Individual", insurer: "Star Health and Allied Insurance Co. Ltd." },
    { policy_name: "Star Health Assure Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Star Comprehensive Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Young Star Insurance Policy", insurer: "Star Health and Allied Insurance Company Limited" },
    { policy_name: "Health Guard", insurer: "Bajaj Allianz General Insurance Company Limited" },
    { policy_name: "My Health Care Plan (Plan 1)", insurer: "Bajaj General Insurance Limited" },
    { policy_name: "Elevate", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Smart Janta Personal Accident Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "MashaK (Mosquito) Rakshak Policy", insurer: "ICICI Lombard GIC Limited" },
    { policy_name: "Women’s Cancer Shield", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Saral Suraksha Bima", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Health Shield 360 Retail", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Hospifund Insurance", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Income Protect", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Rashtriya Swasthya Bima Yojana", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Personal Care Insurance Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Personal Protect", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Healthcare Plus Policy", insurer: "ICICI Lombard General Insurance Company Limited" },
    { policy_name: "Rise", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Aspire", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Heart Beat", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "ReAssure 3.0", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "GoActive", insurer: "Niva Bupa Health Insurance Company Limited" },
    { policy_name: "Aapke Liye-Uttar Pradesh", insurer: "Bajaj Allianz General Insurance Co. Ltd" },
    { policy_name: "Care Advantage", insurer: "Care Health Insurance Limited" }
  ];

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


  // --- Feature Definitions & Mappings ---
  const featureDefinitions = {
    'Pre/Post Hospitalization': {
      description: 'Coverage for medical expenses before admission and after discharge.',
      icon: Calendar,
      tip: 'Longer periods mean better coverage for related expenses.',
      formatter: (p: ApiPolicyFeatures) => `${p.preHospitalizationDays} / ${p.postHospitalizationDays} days`,
    },
    'Room Rent Limit': {
      description: 'The maximum amount your insurer will pay for your hospital room per day.',
      icon: Bed,
      tip: '"No Limit" or specific room types offer more flexibility.',
      formatter: (p: ApiPolicyFeatures) => p.roomRentCover,
    },
    'Sum Insured Restoration': {
      description: 'Benefit that restores your sum insured after it has been exhausted.',
      icon: Zap,
      tip: '100% restoration provides a safety net for multiple claims in a year.',
      formatter: (p: ApiPolicyFeatures) => p.sumInsuredRestoration ? 'Yes' : 'No',
    },
    'Maternity Cover': {
      description: 'Coverage for pregnancy-related expenses.',
      icon: Baby,
      tip: 'Crucial for family planning, but usually has a waiting period.',
      formatter: (p: ApiPolicyFeatures) => p.maternityCover ? 'Yes' : 'No',
    },
    'Day Care Procedures': {
      description: 'Medical procedures that don\'t require 24-hour hospitalization.',
      icon: Clock,
      tip: 'Comprehensive plans cover all day care procedures.',
      formatter: (p: ApiPolicyFeatures) => p.dayCareCover ? 'All Covered' : 'Not Covered',
    },
    'Ambulance Cover': {
      description: 'Coverage for emergency ambulance charges.',
      icon: Ambulance,
      tip: 'Higher limits are better for emergencies.',
      formatter: (p: ApiPolicyFeatures) => p.ambulanceCover ? 'Yes' : 'No',
    },
    'PED Waiting Period': {
      description: 'The duration you must wait before the policy covers pre-existing diseases.',
      icon: Stethoscope,
      tip: 'A shorter waiting period is highly desirable.',
      formatter: (p: ApiPolicyFeatures) => `${p.waitingPeriodPEDMonths} months`,
    },
  };

  const compareFeatures = Object.keys(featureDefinitions);

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


  // --- Value & Style Logic ---
  const getBestValue = (feature: string, policies: ComparisonData): string | boolean | null => {
    const values = Object.values(policies).map(p => {
      const key = Object.keys(featureDefinitions).find(k => k === feature);
      return key ? featureDefinitions[key as keyof typeof featureDefinitions].formatter(p) : null;
    });

    if (feature === 'Pre/Post Hospitalization') {
      const postHospDays = Object.values(policies).map(p => p.postHospitalizationDays);
      const maxDays = Math.max(...postHospDays);
      return Object.values(policies).find(p => p.postHospitalizationDays === maxDays)
        ? `${policies[Object.keys(policies)[postHospDays.indexOf(maxDays)]].preHospitalizationDays} / ${maxDays} days`
        : null;
    }
    if (feature === 'PED Waiting Period') {
      const pedMonths = Object.values(policies).map(p => p.waitingPeriodPEDMonths);
      const minMonths = Math.min(...pedMonths);
      return `${minMonths} months`;
    }
    if (['Sum Insured Restoration', 'Maternity Cover'].includes(feature)) {
      return values.includes('Yes') ? 'Yes' : null;
    }
    if (feature === 'Room Rent Limit') {
      if (values.includes('No Limit')) return 'No Limit';
      if (values.includes('Any Room (upgradable to suite)')) return 'Any Room (upgradable to suite)';
      if (values.includes('Single Private Room')) return 'Single Private Room';
    }
    return null;
  };

  const getFeatureColor = (value: string | undefined, feature: string) => {
    if (!value || !comparisonData) return 'text-gray-700 bg-gray-50 border-gray-200';

    const best = getBestValue(feature, comparisonData);
    if (best && value === best) return 'text-green-700 bg-green-50 border-green-200';
    if (value === 'No' || value === 'Not Covered') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  // --- Sub-components ---
  const FeatureExplanation = ({ feature }: { feature: string }) => {
    const featureInfo = featureDefinitions[feature as keyof typeof featureDefinitions];
    if (!featureInfo) return null;
    const FeatureIcon = featureInfo.icon;
    const isActive = activeTooltip === feature;

    return (
      <div className="relative">
        <button
          onClick={() => setActiveTooltip(isActive ? null : feature)}
          className="ml-2 w-5 h-5 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors"
        >
          <HelpCircle size={12} className="text-orange-600" />
        </button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-8 left-0 z-20 bg-white border border-gray-200 rounded-xl p-4 shadow-lg w-80"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FeatureIcon size={16} className="text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature}</h4>
                  <p className="text-sm text-gray-600 mb-3">{featureInfo.description}</p>
                  <div className="bg-orange-50 rounded-lg p-2">
                    <p className="text-xs text-orange-700 font-medium">💡 {featureInfo.tip}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTooltip(null)}
                className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X size={12} className="text-gray-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Policy Comparison</h1>
          <button onClick={handleModalOpen} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md">
            <Plus size={18} />
            <span>Add / Edit Policies</span>
          </button>
        </div>

        {/* Empty State */}
        {!isLoading && !error && selectedPolicyNames.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck size={48} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Comparison</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Select up to 3 health insurance policies to see a detailed side-by-side comparison of features, benefits, and costs.
            </p>
            <button
              onClick={handleModalOpen}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Select Policies</span>
            </button>
          </div>
        )}

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border">
            <Loader2 className="animate-spin text-primary" size={48} />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Policy Cards - Horizontally Scrollable */}
              <div className="relative mb-8">
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex space-x-6">
                    {selectedPolicyNames.map((policyName, index) => {
                      const policyDetails = allPolicies.find(p => p.name === policyName);
                      const policyFeatures = comparisonData[policyName];
                      if (!policyDetails || !policyFeatures) return null;

                      return (
                        <motion.div
                          key={policyDetails.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-80 flex-shrink-0 relative group"
                        >
                          <button
                            onClick={() => handleRemovePolicy(policyName)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-red-100 z-10"
                            title="Remove from comparison"
                          >
                            <X size={16} />
                          </button>
                          <div className="p-6 bg-gray-50/70 text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl transform group-hover:scale-110 transition-transform">
                              {policyDetails.icon}
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{policyDetails.name}</h3>
                            <p className="text-sm text-gray-600">{policyDetails.company}</p>
                          </div>
                          <div className="p-6 flex-grow">
                            <h4 className="font-semibold text-gray-800 text-sm mb-3">Key Highlights</h4>
                            <div className="space-y-3">
                              {compareFeatures.slice(0, 3).map((feature) => {
                                const val = featureDefinitions[feature as keyof typeof featureDefinitions].formatter(policyFeatures);
                                const featureIcon = featureDefinitions[feature as keyof typeof featureDefinitions].icon;
                                const FeatureIcon = featureIcon;
                                return (
                                  <div key={feature} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <FeatureIcon className="text-gray-400" size={16} />
                                      <span className="text-gray-600">{feature}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getFeatureColor(val, feature)}`}>
                                      {val}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Detailed Comparison Table - Horizontally Scrollable */}
              <div className="hidden lg:block bg-white rounded-xl border border-gray-100 overflow-x-auto mb-8">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900 min-w-[200px]">Features</th>
                      {selectedPolicyNames.map(name => (
                        <th key={name} className="text-center p-4 font-medium text-gray-900 min-w-[150px]">
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-lg">{allPolicies.find(p => p.name === name)?.icon}</span>
                            <span className="text-sm">{name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareFeatures.map((feature, index) => (
                      <motion.tr
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-gray-100"
                      >
                        <td className="p-4 font-medium text-gray-900">
                          <div className="flex items-center">
                            <span>{feature}</span>
                            <FeatureExplanation feature={feature} />
                          </div>
                        </td>
                        {selectedPolicyNames.map(policyName => {
                          const policyFeatures = comparisonData[policyName];
                          if (!policyFeatures) return <td key={policyName}></td>;
                          const val = featureDefinitions[feature as keyof typeof featureDefinitions].formatter(policyFeatures);
                          return (
                            <td key={policyName} className="p-4 text-center align-top">
                              {feature === 'Room Rent Limit' && val.includes('(') ? (
                                <ul className="inline-block text-left text-sm font-medium text-gray-700 list-disc list-inside">
                                  {val.split('(').map(part => part.replace(/[()]/g, '').trim()).filter(Boolean).map((item, i) => (
                                    <li key={i} className="whitespace-nowrap">{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${getFeatureColor(val, feature)}`}>
                                  {val}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* AI Recommendation */}
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-3 text-lg">AI Recommendation</h3>
                        <div className="space-y-2">
                          {aiAnalysis.split('\n').filter(line => line.trim() !== '').map((point, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <CheckCircle size={18} className="text-green-300 mt-0.5 flex-shrink-0" />
                              <p className="text-white/90">
                                {point.replace(/^- /, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 text-lg shadow-md hover:shadow-lg">
                  <span>Get Quotes for Selected Policies</span>
                  <ArrowRight size={20} />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}