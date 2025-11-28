import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Star,
  Shield,
  Heart,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

interface PolicyCatalogProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  onNavigateToDetail?: () => void;
  onBuyPolicy?: (policyData: any) => void;
}

export function PolicyCatalog({ onNavigateToDetail, onBuyPolicy }: PolicyCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All Plans', icon: Shield, count: 24 },
    { id: 'Individual', name: 'Individual', icon: Heart, count: 8 },
    { id: 'Family', name: 'Family', icon: Shield, count: 6 },
    { id: 'Senior', name: 'Senior Citizen', icon: Heart, count: 4 },
    { id: 'Critical', name: 'Critical Illness', icon: Shield, count: 3 },
    { id: 'Maternity', name: 'Maternity', icon: Heart, count: 3 }
  ];

  const policies = [
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
      popular: true
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
      popular: true
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
      popular: false
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
      popular: false
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
      popular: false
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
      popular: false
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
      popular: false
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
      popular: true
    }
  ];

  const filteredPolicies = policies.filter(policy => 
    activeCategory === 'All' || activeCategory === 'All Plans' || policy.category === activeCategory
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                <category.icon size={18} />
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              {/* Policy Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{policy.name}</h3>
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
                {policy.tags.map((tag) => (
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
                  <p className="font-bold text-green-700">{policy.coverage}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 mb-1">
                    <DollarSign className="text-blue-600" size={14} />
                    <span className="text-xs text-blue-600 font-medium">Premium</span>
                  </div>
                  <p className="font-bold text-blue-700">{policy.premium}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                <div className="space-y-1">
                  {policy.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={14} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {policy.features.length > 3 && (
                    <p className="text-sm text-gray-500 ml-6">
                      +{policy.features.length - 3} more benefits
                    </p>
                  )}
                </div>
              </div>

              {/* Savings */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="text-green-500" size={16} />
                  <span className="text-sm font-medium text-green-600">{policy.savings}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>Waiting: {policy.waitingPeriod}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => onBuyPolicy && onBuyPolicy(policy)}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={16} />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={onNavigateToDetail}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                  <button className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                    Compare
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Load More Policies
          </button>
        </div>
      </div>
    </div>
  );
}