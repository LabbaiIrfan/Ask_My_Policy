import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Star,
  Shield,
  Heart,
  Users,
  MapPin,
  DollarSign,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  X,
  TrendingUp,
  Clock,
  Building,
  Bed,
  Truck,
  Activity,
  Calendar,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { policies, type Policy } from '../data/policies';

interface ExploreScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  userData?: any;
  onNavigateToDetail?: () => void;
  onBuyPolicy?: (policy: Policy) => void;
  onComparePolicies?: (policies: string[]) => void;
}

interface FilterData {
  category: string;
  gender: string;
  age: string;
  city: string;
  medicalHistory: string[];
  budget: string;
  requiredCoverage: string;
}

export function ExploreScreen({ onBuyPolicy, onComparePolicies }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterWizard, setShowFilterWizard] = useState(false);
  const [filterStep, setFilterStep] = useState(0);
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

  const filterSteps = [
    {
      title: 'Select Category',
      description: 'What type of health insurance are you looking for?',
      icon: Shield
    },
    {
      title: 'Personal Details',
      description: 'Tell us about yourself',
      icon: Users
    },
    {
      title: 'Location',
      description: 'Which city are you based in?',
      icon: MapPin
    },
    {
      title: 'Medical History',
      description: 'Any existing health conditions?',
      icon: Stethoscope
    },
    {
      title: 'Budget',
      description: 'What\'s your preferred premium range?',
      icon: DollarSign
    },
    {
      title: 'Coverage Needs',
      description: 'Any specific medical procedures you need covered?',
      icon: Heart
    }
  ];

  const categories = [
    { id: 'Individual', name: 'Individual Health', icon: '👤', description: 'Coverage for yourself' },
    { id: 'Family', name: 'Family Health', icon: '👨‍👩‍👧‍👦', description: 'Coverage for your family' },
    { id: 'Senior', name: 'Senior Citizen', icon: '👴', description: 'Specialized for seniors' },
    { id: 'Critical', name: 'Critical Illness', icon: '❤️‍🩹', description: 'Critical disease coverage' },
    { id: 'Maternity', name: 'Maternity', icon: '🤱', description: 'Pregnancy & childbirth' }
  ];

  const genders = ['Male', 'Female', 'Other'];
  const ageRanges = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Other'];
  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'Cancer History',
    'Kidney Disease', 'Liver Disease', 'Mental Health', 'Obesity', 'None'
  ];
  const budgetRanges = [
    'Under ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹30,000',
    '₹30,000 - ₹50,000', 'Above ₹50,000'
  ];

  // --- Comparison & Card Logic ---

  const getBadgeColor = (tag: string) => {
    const colors = {
      'Bestseller': 'bg-green-50 text-green-700 border-green-200',
      'Top Rated': 'bg-blue-50 text-blue-700 border-blue-200',
      'AI Recommended': 'bg-purple-50 text-purple-700 border-purple-200',
      'Popular': 'bg-orange-50 text-orange-700 border-orange-200',
      'Critical Care': 'bg-rose-50 text-rose-700 border-rose-200',
      'Maternity': 'bg-pink-50 text-pink-700 border-pink-200',
      'Budget Friendly': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Disease Specific': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Wellness Focus': 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

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
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      } else if (searchQuery.trim().length === 0 && showResults && resultsHeader.includes('Search')) {
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

  const nextStep = () => {
    if (filterStep < filterSteps.length - 1) {
      setFilterStep(filterStep + 1);
    } else {
      handleFilterComplete();
    }
  };

  const prevStep = () => {
    if (filterStep > 0) {
      setFilterStep(filterStep - 1);
    }
  };

  const handleArrayToggle = (field: keyof FilterData, value: string) => {
    if (field === 'medicalHistory') {
      const current = filterData[field] as string[];
      if (value === 'None') {
        setFilterData(prev => ({ ...prev, [field]: ['None'] }));
      } else {
        const updated = current.includes(value)
          ? current.filter(item => item !== value && item !== 'None')
          : [...current.filter(item => item !== 'None'), value];
        setFilterData(prev => ({ ...prev, [field]: updated }));
      }
    }
  };

  const renderFilterStep = () => {
    const step = filterSteps[filterStep];
    const StepIcon = step.icon;

    switch (filterStep) {
      case 0: // Category
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setFilterData(prev => ({ ...prev, category: category.id }))}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${filterData.category === category.id
                    ? 'border-primary bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 1: // Personal Details
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  {genders.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setFilterData(prev => ({ ...prev, gender }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.gender === gender
                        ? 'border-primary bg-orange-50 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Age Range</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ageRanges.map((age) => (
                    <button
                      key={age}
                      onClick={() => setFilterData(prev => ({ ...prev, age }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.age === age
                        ? 'border-primary bg-orange-50 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Location
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setFilterData(prev => ({ ...prev, city }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.city === city
                    ? 'border-primary bg-orange-50 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Medical History
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {medicalConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => handleArrayToggle('medicalHistory', condition)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.medicalHistory.includes(condition)
                    ? 'border-primary bg-orange-50 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // Budget
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetRanges.map((budget) => (
                <button
                  key={budget}
                  onClick={() => setFilterData(prev => ({ ...prev, budget }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${filterData.budget === budget
                    ? 'border-primary bg-orange-50 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        );

      case 5: // Coverage Needs
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <div>
              <Input
                value={filterData.requiredCoverage}
                onChange={(e) => setFilterData(prev => ({ ...prev, requiredCoverage: e.target.value }))}
                placeholder="e.g., plastic surgery, cataract, diabetes management, cardiac surgery..."
                className="h-12 text-base"
              />
              <p className="text-sm text-gray-500 mt-2">
                Specify any particular medical procedures or treatments you need covered
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPolicyCard = (policy: Policy, isRecommended = false, index = 0) => {
    const isSelected = selectedPolicies.includes(policy.name);
    return (
      <motion.div
        key={policy.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white rounded-xl p-6 border transition-all duration-300 flex flex-col ${isSelected
          ? 'border-primary ring-1 ring-primary shadow-lg'
          : isRecommended
            ? 'border-primary/30 shadow-md ring-2 ring-primary/10'
            : 'border-gray-100 hover:shadow-lg hover:border-primary/20'
          }`}
      >
        {isRecommended && (
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
              Recommended for You
            </span>
          </div>
        )}

        {/* Policy Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
              {policy.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{policy.name}</h3>
              <p className="text-sm text-gray-600">{policy.company}</p>
              <p className="text-xs text-gray-400 mt-1">{policy.category}</p>
            </div>
          </div>
          {policy.popular && (
            <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-xs font-medium">
              Popular
            </div>
          )}
        </div>

        {/* Unique Feature Banner */}
        {policy.uniqueFeature && (
          <div className="mb-4 bg-primary/5 border border-primary/10 rounded-lg p-3 flex items-start gap-2">
            <Sparkles className="text-primary mt-0.5 shrink-0" size={16} />
            <p className="text-xs text-primary font-medium leading-tight">{policy.uniqueFeature}</p>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-medium text-gray-900">{policy.rating}</span>
            <span className="text-sm text-gray-500">({policy.reviews})</span>
          </div>
          <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-600">
            {policy.claimRatio} claims settled
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {policy.tags.map((tag: string) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-medium rounded-md border ${getBadgeColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Coverage & Premium */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <Shield className="text-green-600" size={14} />
              <span className="text-xs text-green-600 font-medium">Coverage</span>
            </div>
            <p className="font-bold text-green-700 text-sm truncate" title={policy.coverage}>{policy.coverage}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <DollarSign className="text-blue-600" size={14} />
              <span className="text-xs text-blue-600 font-medium">Premium</span>
            </div>
            <p className="font-bold text-blue-700 text-sm truncate" title={policy.premium}>{policy.premium}</p>
          </div>
        </div>

        {/* Key Features (Always visible) */}
        <div className="mb-4 flex-grow">
          <div className="space-y-1">
            {policy.features.slice(0, 3).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle className="text-green-500 shrink-0" size={14} />
                <span className="text-sm text-gray-700 truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        {expandedPolicyId === policy.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 pt-4 border-t border-gray-100 space-y-3"
          >
            {/* Extra Features */}
            {policy.features.length > 3 && (
              <div className="space-y-1 pl-2 border-l-2 border-gray-100 mb-2">
                {policy.features.slice(3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Key Benefits */}
            {policy.keyBenefits && policy.keyBenefits.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-900">Benefits:</p>
                {policy.keyBenefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Star className="text-orange-400 shrink-0" size={12} />
                    <span className="text-xs text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {policy.networkHospitals && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Building size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate" title={`Network: ${policy.networkHospitals}`}>{policy.networkHospitals} Hospitals</span>
                </div>
              )}
              {policy.roomRent && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Bed size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate" title={`Room: ${policy.roomRent}`}>{policy.roomRent}</span>
                </div>
              )}
              {policy.ambulanceCover && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Truck size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate" title={`Ambulance: ${policy.ambulanceCover}`}>{policy.ambulanceCover}</span>
                </div>
              )}
              {policy.healthCheckup && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Activity size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate" title={`Health Checkup: ${policy.healthCheckup}`}>{policy.healthCheckup}</span>
                </div>
              )}
            </div>
            {(policy.preHospitalization || policy.postHospitalization) && (
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <Calendar size={14} className="shrink-0" />
                <span>Pre: {policy.preHospitalization || 'N/A'}</span>
                <span>•</span>
                <span>Post: {policy.postHospitalization || 'N/A'}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Savings & Waiting */}
        <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-50">
          <div className="flex items-center space-x-1">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm font-medium text-green-600">{policy.savings}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock size={12} />
            <span>Wait: {policy.waitingPeriod}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <button
            onClick={() => onBuyPolicy && onBuyPolicy(policy)}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Buy Now</span>
            <ArrowRight size={16} />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggleDetails(policy.id)}
              className={`px-4 py-2 border rounded-lg font-medium transition-colors ${expandedPolicyId === policy.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {expandedPolicyId === policy.id ? 'Less Info' : 'More Info'}
            </button>
            <button
              onClick={() => togglePolicySelection(policy.name)}
              className={`px-4 py-2 border rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isSelected
                ? 'bg-gray-900 border-gray-900 text-white hover:bg-black'
                : 'border-primary text-primary hover:bg-primary/5'
                }`}
            >
              {isSelected ? (
                <>
                  <CheckCircle size={14} />
                  <span>Added</span>
                </>
              ) : (
                '+ Compare'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {!showFilterWizard && !showResults && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 w-full"
            >
              <div className="space-y-4 mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Find Your Perfect <br />
                  <span className="text-primary bg-primary/5 px-2 rounded-lg">Health Insurance</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Use our AI-powered search and smart filters to discover a plan that matches your life and health needs perfectly.
                </p>
              </div>

              {/* Large Search Section */}
              <div className="w-full bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 flex flex-col gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-2">
                    <Search className="w-6 h-6 text-primary" />
                    <span>Quick Search</span>
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by policy name, company, or features..."
                        className="h-16 text-lg border-gray-200 focus:ring-primary/20 rounded-xl px-6"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      className="h-16 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                      <Search className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-4 overflow-hidden">
                  <div className="flex-1 h-px bg-gray-100"></div>
                  <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">or let AI help</span>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>

                {/* Smart Filter CTA */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-2">
                    <Filter className="w-6 h-6 text-secondary" />
                    <span>Personalized Recommendation</span>
                  </h3>
                  <Button
                    onClick={() => setShowFilterWizard(true)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-16 text-xl font-bold rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group flex items-center justify-center gap-3"
                  >
                    <Star className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Get Smart Recommendation
                  </Button>
                  <p className="text-sm text-gray-400">Takes less than 30 seconds for a tailored result</p>
                </div>
              </div>

              {/* Quick Stats/Trust Badges */}
              <div className="grid grid-cols-3 gap-8 mt-16 px-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">35+</p>
                  <p className="text-sm text-gray-500 font-medium">Top Insurers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">500+</p>
                  <p className="text-sm text-gray-500 font-medium">Policies Compared</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">1M+</p>
                  <p className="text-sm text-gray-500 font-medium">Claims Settled</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filter Wizard */}
        <AnimatePresence>
          {showFilterWizard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Find Your Perfect Plan</h2>
                    <p className="text-sm text-gray-600">Step {filterStep + 1} of {filterSteps.length}</p>
                  </div>
                  <button
                    onClick={() => setShowFilterWizard(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {filterSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index <= filterStep ? 'bg-primary' : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((filterStep + 1) / filterSteps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                {renderFilterStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={filterStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                  >
                    <span>{filterStep === filterSteps.length - 1 ? 'Get Recommendations' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-gray-50 z-40 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{resultsHeader}</h2>
                <p className="text-gray-600">{resultsSubheader}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setSearchQuery('');
                  setFilteredPolicies(policies);
                }}
              >
                Back to Explore
              </Button>
            </div>

            {/* Recommended Policies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Recommended for You</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredPolicies.filter(p => p.recommended).map((policy, index) =>
                  renderPolicyCard(policy, true, index)
                )}
              </div>
            </div>

            {/* Other Policies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{resultsHeader.includes('Search') ? 'Matching Plans' : 'Other Available Plans'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.filter(p => !p.recommended).map((policy, index) =>
                  renderPolicyCard(policy, false, index)
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Comparison Box */}
      <AnimatePresence>
        {selectedPolicies.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4"
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