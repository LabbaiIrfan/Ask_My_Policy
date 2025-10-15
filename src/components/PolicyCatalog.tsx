import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star,
  Shield,
  Heart,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

interface PolicyCatalogProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
  onNavigateToDetail?: () => void;
}

// Data from AskMyPolicy.compare.json
const jsonData = [
  {
    "_id": { "$oid": "68d7076f361ad5e000cebea6" },
    "policyName": "ReAssure 3.0",
    "insurer": "Aditya Birla Health Insurance Company Limited",
    "code": "ABHI",
    "policyType": "Individual/Floater",
    "coverage": {
      "preHospitalization": { "durationDays": 60 },
      "postHospitalization": { "durationDays": 180 },
      "sumInsuredRestoration": { "isAvailable": true, "conditions": ["Unlimited reinstatements in a policy year."] }
    },
    "addOns_OptionalBenefits": [
      { "name": "Cancer Hospitalisation Booster", "isAvailable": true },
      { "name": "Personal Accident Cover", "isAvailable": true },
      { "name": "Reduction in PED waiting period", "isAvailable": true }
    ],
    "waitingPeriods": { "preExistingDiseaseMonths": 36 },
    "specialCoverages": [
      { "diseaseName": "Maternity", "isCovered": true }
    ]
  },
  {
    "_id": { "$oid": "68d70c40361ad5e000cebea7" },
    "policyName": "Activ One",
    "insurer": "Aditya Birla Health Insurance Company Limited",
    "code": "ABHI",
    "policyType": "Individual/Floater",
    "coverage": {
      "preHospitalization": { "durationDays": 90 },
      "postHospitalization": { "durationDays": 180 },
      "sumInsuredRestoration": { "isAvailable": true, "conditions": ["Unlimited reinstatements in a policy year (Super Reload)."] }
    },
    "addOns_OptionalBenefits": [
      { "name": "Cancer Booster", "isAvailable": true },
      { "name": "Personal Accident Cover", "isAvailable": true },
      { "name": "Critical Illness Cover", "isAvailable": true }
    ],
    "waitingPeriods": { "preExistingDiseaseMonths": 48 },
    "specialCoverages": [
      { "diseaseName": "Mental Illness Hospitalization", "isCovered": true }
    ]
  },
  {
    "_id": { "$oid": "68d70407361ad5e000cebea5" },
    "policyName": "Care Advantage",
    "insurer": "Care Health Insurance Limited",
    "code": "CHIL",
    "policyType": "Individual/Floater",
    "coverage": {
      "preHospitalization": { "durationDays": 60 },
      "postHospitalization": { "durationDays": 180 },
      "sumInsuredRestoration": { "isAvailable": true, "conditions": ["100% of the Base Sum Insured is reinstated."] }
    },
    "addOns_OptionalBenefits": [
      { "name": "Smart Select", "isAvailable": true },
      { "name": "Annual Health Check-up", "isAvailable": true },
      { "name": "No Claim Bonus Super", "isAvailable": true }
    ],
    "waitingPeriods": { "preExistingDiseaseMonths": 48 },
    "specialCoverages": [
      { "diseaseName": "Maternity", "isCovered": true, "coverageType": "Optional Add-on" }
    ]
  },
  {
    "_id": { "$oid": "68d71096361ad5e000cebea8" },
    "policyName": "Aapke Liye-Uttar Pradesh",
    "insurer": "Bajaj Allianz General Insurance Co. Ltd.",
    "code": "BAJHL",
    "policyType": "Individual/Floater",
    "coverage": {
      "preHospitalization": { "durationDays": 30 },
      "postHospitalization": { "durationDays": 60 },
      "sumInsuredRestoration": { "isAvailable": false }
    },
    "addOns_OptionalBenefits": [
      { "name": "Sum Insured Reinstatement", "isAvailable": true },
      { "name": "Super Cumulative Bonus", "isAvailable": true },
      { "name": "Accidental Death Cover", "isAvailable": true }
    ],
    "waitingPeriods": { "preExistingDiseaseMonths": 36 },
    "specialCoverages": [
      { "diseaseName": "AYUSH Treatment", "isCovered": true }
    ]
  },
  {
    "_id": { "$oid": "68d711ea361ad5e000cebea9" },
    "policyName": "Super Star",
    "insurer": "Star Health and Allied Insurance Company Limited",
    "code": "SHAHL",
    "policyType": "Individual/Floater",
    "coverage": {
      "preHospitalization": { "durationDays": 90 },
      "postHospitalization": { "durationDays": 180 },
      "sumInsuredRestoration": { "isAvailable": true, "conditions": ["Unlimited reinstatements in a policy year."] }
    },
    "addOns_OptionalBenefits": [
      { "name": "Maternity Expenses", "isAvailable": true },
      { "name": "Personal Accident Cover", "isAvailable": true },
      { "name": "Quick Shield", "isAvailable": true }
    ],
    "waitingPeriods": { "preExistingDiseaseMonths": 36 },
    "specialCoverages": [
      { "diseaseName": "Home Care Treatment", "isCovered": true }
    ]
  }
];


export function PolicyCatalog({ onNavigateToDetail }: PolicyCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const policies = jsonData.map(policy => {
    // Determine Category
    let category = 'Family'; // Default for Individual/Floater
    if (policy.policyType === 'Individual') {
        category = 'Individual';
    }
    // Specific categories override the default
    if (policy.specialCoverages.some(c => c.diseaseName?.toLowerCase().includes('maternity')) || policy.addOns_OptionalBenefits.some(a => a.name.toLowerCase().includes('maternity'))) {
      category = 'Maternity';
    } else if (policy.policyName.toLowerCase().includes('critical illness') || policy.addOns_OptionalBenefits.some(a => a.name.toLowerCase().includes('critical illness'))) {
      category = 'Critical';
    } else if (policy.policyName.toLowerCase().includes('senior')) {
      category = 'Senior';
    }

    // Determine Features
    const features = [
      `Pre-hospitalization: ${policy.coverage.preHospitalization.durationDays} days`,
      `Post-hospitalization: ${policy.coverage.postHospitalization.durationDays} days`,
      'All Day Care Treatments',
    ];
    if (policy.coverage.sumInsuredRestoration.isAvailable) {
      features.push('Sum Insured Restoration');
    }

    return {
      id: policy._id.$oid,
      name: policy.policyName,
      company: policy.insurer,
      category: category,
      rating: parseFloat((Math.random() * (4.9 - 4.3) + 4.3).toFixed(1)),
      reviews: Math.floor(Math.random() * 2500) + 500,
      premium: `₹${(Math.floor(Math.random() * 250) + 80) * 100}`,
      coverage: `₹${[5, 10, 15, 25, 50, 100][Math.floor(Math.random() * 6)]},00,000`,
      features: features,
      claimRatio: `${Math.floor(Math.random() * 10) + 88}%`,
      waitingPeriod: `${Math.round(policy.waitingPeriods.preExistingDiseaseMonths / 12)} years`,
      tags: [policy.code, 'Popular Choice'],
      icon: category === 'Maternity' ? '🤱' : category === 'Critical' ? '❤️‍🩹' : category === 'Senior' ? '👴' : '👨‍👩‍👧‍👦',
      popular: Math.random() < 0.5,
      // Raw data for advanced filtering if needed
      raw: policy,
    };
  });
  
  const categories = [
    { id: 'All', name: 'All Plans', icon: Shield, count: policies.length },
    { id: 'Individual', name: 'Individual', icon: Heart, count: policies.filter(p => p.category === 'Individual').length },
    { id: 'Family', name: 'Family', icon: Shield, count: policies.filter(p => p.category === 'Family').length },
    { id: 'Senior', name: 'Senior Citizen', icon: Heart, count: policies.filter(p => JSON.stringify(p.raw).toLowerCase().includes('senior')).length },
    { id: 'Critical', name: 'Critical Illness', icon: Shield, count: policies.filter(p => JSON.stringify(p.raw).toLowerCase().includes('critical illness')).length },
    { id: 'Maternity', name: 'Maternity', icon: Heart, count: policies.filter(p => JSON.stringify(p.raw).toLowerCase().includes('maternity')).length }
  ];

  const filteredPolicies = policies.filter(policy => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Senior') {
      return JSON.stringify(policy.raw).toLowerCase().includes('senior');
    }
    if (activeCategory === 'Critical') {
      return JSON.stringify(policy.raw).toLowerCase().includes('critical illness');
    }
    if (activeCategory === 'Maternity') {
      return JSON.stringify(policy.raw).toLowerCase().includes('maternity');
    }
    return policy.category === activeCategory;
  });

  const getBadgeColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Bestseller': 'bg-green-50 text-green-700 border-green-200',
      'Top Rated': 'bg-blue-50 text-blue-700 border-blue-200',
      'Popular Choice': 'bg-purple-50 text-purple-700 border-purple-200',
      'ABHI': 'bg-rose-50 text-rose-700 border-rose-200',
      'CHIL': 'bg-pink-50 text-pink-700 border-pink-200',
      'BAJHL': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'SHAHL': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
    return colors[tag] || 'bg-gray-50 text-gray-700 border-gray-200';
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
                  <span className="text-sm text-gray-500">({policy.reviews} reviews)</span>
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

              {/* Waiting Period */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>PED Waiting: {policy.waitingPeriod}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                  <span>Get Quote</span>
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