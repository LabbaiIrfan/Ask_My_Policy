import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GitCompare, 
  X, 
  Star,
  Shield,
  Zap,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle,
  Info,
  Filter,
  BarChart3
} from 'lucide-react';

interface ComparisonScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

type FeatureMap = Record<string, string>;

interface Policy {
  id: string;
  name: string;
  company: string;
  icon: string;
  premium: string;
  coverage: string;
  rating: number;
  popular?: boolean;
  bestValue?: boolean;
  features: FeatureMap;
}

export function ComparisonScreen({ }: ComparisonScreenProps) {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([
    {
      id: '1',
      name: 'HealthGuard Premium',
      company: 'Star Health',
      icon: '🏥',
      premium: '₹18,500',
      coverage: '₹15,00,000',
      rating: 4.8,
      popular: true,
      bestValue: true,
      features: {
        'Cashless Hospitals': '8000+',
        'Pre-Post Hospitalization': '60 days',
        'Room Rent Limit': '1% of Sum Insured',
        'Maternity Cover': 'Yes',
        'Day Care Procedures': '200+',
        'Annual Health Checkup': 'Free',
        'Ambulance Cover': '₹5,000',
        'OPD Cover': 'Optional',
        'Mental Health': 'Yes',
        'Dental Treatment': 'Yes'
      }
    },
    {
      id: '2',
      name: 'MediSecure Plus',
      company: 'HDFC ERGO',
      icon: '🛡️',
      premium: '₹22,000',
      coverage: '₹15,00,000',
      rating: 4.6,
      popular: false,
      bestValue: false,
      features: {
        'Cashless Hospitals': '10000+',
        'Pre-Post Hospitalization': '90 days',
        'Room Rent Limit': 'No Limit',
        'Maternity Cover': 'Yes',
        'Day Care Procedures': '150+',
        'Annual Health Checkup': 'Free',
        'Ambulance Cover': '₹10,000',
        'OPD Cover': 'Yes',
        'Mental Health': 'No',
        'Dental Treatment': 'No'
      }
    },
    {
      id: '3',
      name: 'CareFirst Elite',
      company: 'ICICI Lombard',
      icon: '💚',
      premium: '₹16,800',
      coverage: '₹15,00,000',
      rating: 4.7,
      popular: false,
      bestValue: false,
      features: {
        'Cashless Hospitals': '6500+',
        'Pre-Post Hospitalization': '30 days',
        'Room Rent Limit': '2% of Sum Insured',
        'Maternity Cover': 'Yes',
        'Day Care Procedures': '180+',
        'Annual Health Checkup': 'Free',
        'Ambulance Cover': '₹3,000',
        'OPD Cover': 'No',
        'Mental Health': 'Yes',
        'Dental Treatment': 'Yes'
      }
    }
  ]);

  const compareFeatures: string[] = [
    'Cashless Hospitals',
    'Pre-Post Hospitalization',
    'Room Rent Limit',
    'Maternity Cover',
    'Day Care Procedures',
    'Annual Health Checkup',
    'Ambulance Cover',
    'OPD Cover',
    'Mental Health',
    'Dental Treatment'
  ];

  const removePolicy = (policyId: string) => {
    setSelectedPolicies(prev => prev.filter(p => p.id !== policyId));
  };

  const getBestValue = (feature: string): string | null => {
    const values = selectedPolicies.map(p => p.features[feature] ?? '');

    // Numeric comparisons for counts/durations
    if (feature === 'Cashless Hospitals' || feature === 'Pre-Post Hospitalization') {
      const nums = values.map(v => parseInt(v.replace(/\D/g, '')) || 0);
      const max = Math.max(...nums);
      const idx = nums.indexOf(max);
      return idx >= 0 ? values[idx] : null;
    }

    if (feature === 'Room Rent Limit') {
      return values.includes('No Limit') ? 'No Limit' : null;
    }

    if (['Maternity Cover', 'Annual Health Checkup', 'OPD Cover', 'Mental Health', 'Dental Treatment'].includes(feature)) {
      // If any policy has 'Yes', that's considered the best
      return values.includes('Yes') ? 'Yes' : null;
    }

    return null;
  };

  const getFeatureColor = (value: string | undefined, feature: string) => {
    const bestValue = getBestValue(feature);
    if (value && bestValue && value === bestValue) return 'text-green-700 bg-green-50 border-green-200';
    if (value === 'No') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getTotalScore = (policy: Policy) => {
    let score = 0;
    compareFeatures.forEach(feature => {
      const val = policy.features[feature];
      if (val && val === getBestValue(feature)) {
        score += 10;
      } else if (val !== 'No') {
        score += 5;
      }
    });
    return Math.min(score, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <GitCompare className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{selectedPolicies.length}</p>
                <p className="text-sm text-gray-600">Policies Selected</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{Math.min(...selectedPolicies.map(p => parseInt(p.premium.replace(/[₹,]/g, ''))))/1000}K
                </p>
                <p className="text-sm text-gray-600">Lowest Premium</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...selectedPolicies.map(p => p.rating))}
                </p>
                <p className="text-sm text-gray-600">Highest Rating</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...selectedPolicies.map(p => getTotalScore(p)))}%
                </p>
                <p className="text-sm text-gray-600">Best Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Selected Policies</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Plus size={18} />
              <span>Add Policy</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {selectedPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removePolicy(policy.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors group"
                >
                  <X size={16} className="text-gray-400 group-hover:text-red-600" />
                </button>

                {/* Policy Header */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
                    {policy.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{policy.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{policy.company}</p>
                  
                  {/* Badges */}
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    {policy.bestValue && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                        Best Value
                      </span>
                    )}
                    {policy.popular && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium text-gray-900">{policy.rating}</span>
                    <span className="text-sm text-gray-600">({getTotalScore(policy)}% match)</span>
                  </div>
                </div>

                {/* Coverage & Premium */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Shield className="text-green-600" size={14} />
                      <span className="text-xs text-green-600 font-medium">Coverage</span>
                    </div>
                    <p className="font-bold text-green-700">{policy.coverage}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <TrendingUp className="text-blue-600" size={14} />
                      <span className="text-xs text-blue-600 font-medium">Premium</span>
                    </div>
                    <p className="font-bold text-blue-700">{policy.premium}</p>
                  </div>
                </div>

                {/* Key Features Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Key Highlights</h4>
                  <div className="space-y-1">
                    {Object.entries(policy.features).slice(0, 3).map(([feature, value]) => (
                      <div key={feature} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{feature}</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getFeatureColor(value, feature)}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="text-gray-600" size={20} />
            <h2 className="font-bold text-gray-900">Detailed Comparison</h2>
          </div>
          
          {/* Desktop Comparison Table */}
          <div className="hidden lg:block bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900 min-w-[200px]">Features</th>
                    {selectedPolicies.map(policy => (
                      <th key={policy.id} className="text-center p-4 font-medium text-gray-900 min-w-[150px]">
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-lg">{policy.icon}</span>
                          <span className="text-sm">{policy.name}</span>
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
                      <td className="p-4 font-medium text-gray-900">{feature}</td>
                      {selectedPolicies.map(policy => (
                        <td key={policy.id} className="p-4 text-center">
                          <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${getFeatureColor(policy.features[feature], feature)}`}>
                            {policy.features[feature]}
                          </span>
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="lg:hidden space-y-4">
            {compareFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <h4 className="font-medium text-gray-900 mb-3">{feature}</h4>
                <div className="space-y-2">
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{policy.icon}</span>
                        <span className="text-sm text-gray-600">{policy.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getFeatureColor(policy.features[feature], feature)}`}>
                        {policy.features[feature]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2">AI Recommendation</h3>
                <p className="text-white/90 mb-4">
                  Based on your comparison, <strong>HealthGuard Premium</strong> offers the best overall value with comprehensive coverage at a competitive price. It provides excellent cashless network coverage and includes mental health benefits.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} />
                    <span>Best Value Score: 94/100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>Comprehensive Coverage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={16} />
                    <span>High Customer Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
            <span>Get Quotes for Selected Policies</span>
            <ArrowRight size={18} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors">
              Save Comparison
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Share Results
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Info size={16} />
              <span>Get Expert Advice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}