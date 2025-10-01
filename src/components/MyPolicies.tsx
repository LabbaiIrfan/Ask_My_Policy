import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  Phone,
  Download,
  MoreVertical,
  Star,
  ArrowRight
} from 'lucide-react';

interface MyPoliciesProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

export function MyPolicies({}: MyPoliciesProps) {
  const [activeTab, setActiveTab] = useState('active');

  const activePolicies = [
    {
      id: '1',
      name: 'HealthGuard Family Pro',
      company: 'Star Health Insurance',
      icon: '🏥',
      policyNumber: 'SH-2024-001234',
      coverage: '₹15,00,000',
      premium: '₹18,500',
      renewalDate: '2024-12-15',
      daysToRenewal: 45,
      status: 'active',
      claimsUsed: 2,
      claimsLimit: 'Unlimited',
      features: ['Cashless Network', 'Pre-Post Hospitalization', 'Maternity'],
      rating: 4.8,
      popular: false
    },
    {
      id: '2',
      name: 'DriveSecure Comprehensive',
      company: 'Bajaj Allianz',
      icon: '🚗',
      policyNumber: 'BA-2024-567890',
      coverage: '₹8,00,000',
      premium: '₹12,800',
      renewalDate: '2024-11-30',
      daysToRenewal: 15,
      status: 'renewal_due',
      claimsUsed: 0,
      claimsLimit: 'No Claim Bonus: 50%',
      features: ['Zero Depreciation', 'Engine Protection', 'Roadside Assistance'],
      rating: 4.7,
      popular: true
    },
    {
      id: '3',
      name: 'SecureLife Term Plus',
      company: 'HDFC Life',
      icon: '🛡️',
      policyNumber: 'HL-2024-112233',
      coverage: '₹1,00,00,000',
      premium: '₹15,600',
      renewalDate: '2025-03-22',
      daysToRenewal: 120,
      status: 'active',
      claimsUsed: 0,
      claimsLimit: 'Term Life Coverage',
      features: ['Tax Benefits', 'Accidental Death Benefit', 'Terminal Illness'],
      rating: 4.9,
      popular: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'renewal_due': return 'bg-red-50 text-red-700 border-red-200';
      case 'expired': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'renewal_due': return 'Renewal Due';
      case 'expired': return 'Expired';
      default: return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Active Policies</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Clock className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Due for Renewal</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹46.9K</p>
                <p className="text-sm text-gray-600">Total Premium</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Shield className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹2.3Cr</p>
                <p className="text-sm text-gray-600">Total Coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setActiveTab('active')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <CheckCircle size={18} />
              <span>Active Policies</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'active'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                3
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('expired')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'expired'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Clock size={18} />
              <span>Expired</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'expired'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                0
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('claiming')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'claiming'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <FileText size={18} />
              <span>Claims</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'claiming'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                2
              </span>
            </motion.button>
          </div>
        </div>

        {/* Policy Grid */}
        {activeTab === 'active' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePolicies.map((policy, index) => (
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
                      <p className="text-xs text-gray-500">#{policy.policyNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {policy.popular && (
                      <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-xs font-medium">
                        Popular
                      </div>
                    )}
                    <button className="p-1 hover:bg-gray-100 rounded-md">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium text-gray-900">{policy.rating}</span>
                  </div>
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(policy.status)}`}>
                    {getStatusText(policy.status)}
                  </span>
                </div>

                {/* Renewal Alert */}
                {policy.status === 'renewal_due' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={16} className="text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-red-800 text-sm">Renewal Due</p>
                        <p className="text-xs text-red-700">
                          Expires in {policy.daysToRenewal} days
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">{policy.daysToRenewal}</div>
                        <div className="text-xs text-red-600">days</div>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Claims Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Claims Used</span>
                      <p className="text-xs text-gray-600">{policy.claimsLimit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">{policy.claimsUsed}</p>
                      <p className="text-xs text-gray-600">this year</p>
                    </div>
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
                  </div>
                </div>

                {/* Renewal Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>Renewal: {policy.renewalDate}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{policy.daysToRenewal} days</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {policy.status === 'renewal_due' ? (
                    <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                      <span>Renew Now</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <Phone size={16} />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <Download size={16} />
                    </button>
                    <button className="px-3 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center justify-center">
                      <FileText size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State for other tabs */}
        {activeTab !== 'active' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {activeTab === 'expired' ? 'No Expired Policies' : 'No Active Claims'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'expired' 
                ? 'All your policies are currently active'
                : 'You have no ongoing insurance claims'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}