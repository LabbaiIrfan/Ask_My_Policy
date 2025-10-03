import { useState } from 'react';
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
  X
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ExploreScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  userData?: any;
  onNavigateToDetail?: () => void;
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

export function ExploreScreen({ onNavigateToDetail }: ExploreScreenProps) {
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

  const allPolicies = [
    {
      id: '1',
      name: 'HealthCare Premium Plus',
      company: 'Star Health Insurance',
      category: 'Individual',
      rating: 4.8,
      reviews: 2847,
      premium: '₹18,500',
      coverage: '₹10,00,000',
      features: ['Cashless Hospitals', 'Pre & Post Hospitalization', 'Maternity Cover', 'Critical Illness'],
      claimRatio: '89%',
      waitingPeriod: '2 years',
      tags: ['Bestseller'],
      savings: 'Save ₹3,200',
      icon: '🏥',
      popular: true,
      recommended: false
    },
    {
      id: '2',
      name: 'Family Health Shield',
      company: 'HDFC ERGO Health Insurance',
      category: 'Family',
      rating: 4.9,
      reviews: 1923,
      premium: '₹24,000',
      coverage: '₹15,00,000',
      features: ['Family Floater', 'Maternity Benefits', 'OPD Coverage', 'Annual Health Checkup'],
      claimRatio: '93%',
      waitingPeriod: '1 year',
      tags: ['Top Rated'],
      savings: 'Save ₹5,100',
      icon: '👨‍👩‍👧‍👦',
      popular: true,
      recommended: false
    },
    {
      id: '3',
      name: 'SeniorCare Complete',
      company: 'National Insurance Company',
      category: 'Senior',
      rating: 4.7,
      reviews: 1567,
      premium: '₹28,800',
      coverage: '₹3,00,000',
      features: ['Pre-existing Disease Cover', 'Domiciliary Treatment', 'Alternative Treatment', 'Health Checkups'],
      claimRatio: '87%',
      waitingPeriod: '3 years',
      tags: ['AI Recommended'],
      savings: 'Save ₹4,400',
      icon: '👴',
      popular: false,
      recommended: false
    },
    {
      id: '4',
      name: 'Critical Illness Shield',
      company: 'Max Bupa Health Insurance',
      category: 'Critical',
      rating: 4.6,
      reviews: 892,
      premium: '₹32,500',
      coverage: '₹25,00,000',
      features: ['Critical Illness Cover', 'Cancer Treatment', 'Organ Transplant', 'Heart Surgery Cover'],
      claimRatio: '94%',
      waitingPeriod: '90 days',
      tags: ['Critical Care'],
      savings: 'Save ₹6,800',
      icon: '❤️‍🩹',
      popular: false,
      recommended: false
    },
    {
      id: '5',
      name: 'MaternityPlus Care',
      company: 'Religare Health Insurance',
      category: 'Maternity',
      rating: 4.5,
      reviews: 645,
      premium: '₹16,900',
      coverage: '₹8,00,000',
      features: ['Maternity Benefits', 'Newborn Baby Cover', 'Fertility Treatment', 'Vaccination Cover'],
      claimRatio: '91%',
      waitingPeriod: '9 months',
      tags: ['Maternity'],
      savings: 'Save ₹3,500',
      icon: '🤱',
      popular: false,
      recommended: false
    },
    {
      id: '6',
      name: 'BasicCare Essential',
      company: 'Care Health Insurance',
      category: 'Individual',
      rating: 4.3,
      reviews: 1234,
      premium: '₹8,600',
      coverage: '₹2,00,000',
      features: ['Basic Hospitalization', 'Day Care Surgery', 'Emergency Ambulance', 'Health Checkups'],
      claimRatio: '88%',
      waitingPeriod: '1 year',
      tags: ['Budget Friendly'],
      savings: 'Save ₹1,800',
      icon: '🏥',
      popular: false,
      recommended: false
    },
    {
      id: '7',
      name: 'DiabetesCare Specialist',
      company: 'Aditya Birla Health Insurance',
      category: 'Individual',
      rating: 4.6,
      reviews: 987,
      premium: '₹22,900',
      coverage: '₹6,00,000',
      features: ['Diabetes Management', 'Insulin Coverage', 'Regular Monitoring', 'Specialist Consultations'],
      claimRatio: '90%',
      waitingPeriod: '2 years',
      tags: ['Disease Specific'],
      savings: 'Save ₹4,200',
      icon: '💉',
      popular: false,
      recommended: false
    },
    {
      id: '8',
      name: 'WellnessPlus Complete',
      company: 'Niva Bupa Health Insurance',
      category: 'Family',
      rating: 4.8,
      reviews: 1456,
      premium: '₹28,900',
      coverage: '₹15,00,000',
      features: ['Preventive Care', 'Health Coaching', 'Wellness Programs', 'Telemedicine Access'],
      claimRatio: '92%',
      waitingPeriod: '1 year',
      tags: ['Wellness Focus'],
      savings: 'Save ₹5,900',
      icon: '🌟',
      popular: true,
      recommended: false
    }
  ];

  const [filteredPolicies, setFilteredPolicies] = useState(allPolicies);

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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPolicies(allPolicies);
      return;
    }

    const filtered = allPolicies.filter(policy => 
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredPolicies(filtered);
  };

  const handleFilterComplete = () => {
    // Generate recommendations based on filter data
    const recommended = generateRecommendations();
    const others = allPolicies.filter(p => !recommended.some(r => r.id === p.id));
    
    setFilteredPolicies([...recommended, ...others]);
    setShowResults(true);
    setShowFilterWizard(false);
  };

  const generateRecommendations = () => {
    let recommended = [...allPolicies];
    
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
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    filterData.category === category.id
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
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        filterData.gender === gender
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
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        filterData.age === age
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
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    filterData.city === city
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
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    filterData.medicalHistory.includes(condition)
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
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    filterData.budget === budget
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

  const getBadgeColor = (tag: string) => {
    const colors = {
      'Bestseller': 'bg-green-50 text-green-700 border-green-200',
      'Top Rated': 'bg-blue-50 text-blue-700 border-blue-200',
      'AI Recommended': 'bg-purple-50 text-purple-700 border-purple-200',
      'Critical Care': 'bg-rose-50 text-rose-700 border-rose-200',
      'Maternity': 'bg-pink-50 text-pink-700 border-pink-200',
      'Budget Friendly': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Disease Specific': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Wellness Focus': 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const renderPolicyCard = (policy: any, isRecommended = false) => (
    <motion.div
      key={policy.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
        isRecommended 
          ? 'border-primary/30 shadow-md ring-2 ring-primary/10' 
          : 'border-gray-100 hover:border-primary/20'
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
            <h3 className="font-semibold text-gray-900">{policy.name}</h3>
            <p className="text-sm text-gray-600">{policy.company}</p>
          </div>
        </div>
        {policy.popular && (
          <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-xs font-medium">
            Popular
          </div>
        )}
      </div>

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

      {/* Features */}
      <div className="space-y-2 mb-4">
        {policy.features.slice(0, 3).map((feature: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" size={14} />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Premium & Coverage */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Premium</p>
          <p className="font-semibold text-gray-900">{policy.premium}/year</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Coverage</p>
          <p className="font-semibold text-gray-900">{policy.coverage}</p>
        </div>
      </div>

      {/* Savings & Action */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-green-600 font-medium">{policy.savings}</span>
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90"
          onClick={onNavigateToDetail}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {!showFilterWizard && !showResults && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Explore Health Insurance Plans
              </h1>
              <p className="text-gray-600">
                Find the perfect health insurance plan using our AI-powered search and smart filters
              </p>
            </div>

            {/* Search & Filter Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Search Policies</span>
                  </h3>
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by policy name, company, or features..."
                        className="h-11"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Smart Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Smart Filter</span>
                  </h3>
                  <Button
                    onClick={() => setShowFilterWizard(true)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-11"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Find My Perfect Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => renderPolicyCard(policy))}
            </div>
          </>
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
                        className={`w-3 h-3 rounded-full ${
                          index <= filterStep ? 'bg-primary' : 'bg-gray-200'
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Recommendations</h2>
                <p className="text-gray-600">Based on your preferences and requirements</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setFilteredPolicies(allPolicies);
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
                {filteredPolicies.filter(p => p.recommended).map((policy) => 
                  renderPolicyCard(policy, true)
                )}
              </div>
            </div>

            {/* Other Policies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Available Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.filter(p => !p.recommended).map((policy) => 
                  renderPolicyCard(policy, false)
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}