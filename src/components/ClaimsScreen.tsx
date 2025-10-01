import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Camera,
  Upload,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Activity,
  Shield
} from 'lucide-react';

interface ClaimsScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

export function ClaimsScreen({}: ClaimsScreenProps) {
  const [activeTab, setActiveTab] = useState('ongoing');

  const ongoingClaims = [
    {
      id: 'CLM001',
      policyName: 'HealthGuard Family Pro',
      claimType: 'Hospitalization',
      claimAmount: '₹85,000',
      dateOfClaim: '2024-10-15',
      status: 'under_review',
      hospital: 'Apollo Hospital, Mumbai',
      documents: ['Medical Bills', 'Discharge Summary', 'Prescription'],
      progress: 65,
      icon: '🏥',
      urgency: 'medium'
    },
    {
      id: 'CLM002',
      policyName: 'DriveSecure Comprehensive',
      claimType: 'Accident Damage',
      claimAmount: '₹45,000',
      dateOfClaim: '2024-10-20',
      status: 'approved',
      hospital: 'Authorized Garage',
      documents: ['FIR Copy', 'Damage Assessment', 'Repair Estimate'],
      progress: 90,
      icon: '🚗',
      urgency: 'low'
    }
  ];

  const claimHistory = [
    {
      id: 'CLM003',
      policyName: 'HealthGuard Family Pro',
      claimType: 'OPD Treatment',
      claimAmount: '₹12,500',
      settledAmount: '₹12,500',
      dateOfClaim: '2024-08-10',
      dateOfSettlement: '2024-08-25',
      status: 'settled',
      icon: '🏥',
      rating: 4.8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under_review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'settled': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review': return <Clock size={14} />;
      case 'approved': return <CheckCircle size={14} />;
      case 'rejected': return <XCircle size={14} />;
      case 'settled': return <CheckCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'under_review': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'settled': return 'Settled';
      default: return 'Pending';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Quick Actions</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Plus size={18} />
              <span>New Claim</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all text-left hover:border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Health Claim</h3>
                  <p className="text-sm text-gray-600">Medical expenses, hospitalization</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all text-left hover:border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Auto Claim</h3>
                  <p className="text-sm text-gray-600">Vehicle damage, accidents</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all text-left hover:border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Camera className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Scan Documents</h3>
                  <p className="text-sm text-gray-600">AI-powered document scanning</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Active Claims</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹1.3L</p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Activity className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
                <p className="text-sm text-gray-600">Avg Processing</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setActiveTab('ongoing')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ongoing'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Clock size={18} />
              <span>Active Claims</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'ongoing'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                2
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('history')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <CheckCircle size={18} />
              <span>History</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'history'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                1
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('new')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'new'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Plus size={18} />
              <span>File New</span>
            </motion.button>
          </div>
        </div>

        {/* Claims Grid */}
        {activeTab === 'ongoing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingClaims.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                {/* Claim Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
                      {claim.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">#{claim.id}</h3>
                      <p className="text-sm text-gray-600">{claim.policyName}</p>
                      <p className="text-xs text-gray-500">{claim.claimType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{claim.claimAmount}</p>
                    <p className="text-xs text-gray-600">Claim Amount</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-md border flex items-center space-x-1 ${getStatusColor(claim.status)}`}>
                    {getStatusIcon(claim.status)}
                    <span>{getStatusText(claim.status)}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm text-gray-600">{claim.progress}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Processing Progress</span>
                    <span className="text-sm text-gray-600">{claim.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${claim.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-2 rounded-full ${getProgressColor(claim.progress)}`}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">Filed: {claim.dateOfClaim}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">{claim.hospital}</span>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Documents Submitted</h4>
                  <div className="space-y-1">
                    {claim.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500" size={14} />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                    <span>Track Status</span>
                    <ArrowRight size={16} />
                  </button>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <Phone size={16} />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <FileText size={16} />
                    </button>
                    <button className="px-3 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center justify-center">
                      <Upload size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Claim History */}
        {activeTab === 'history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claimHistory.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Claim Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl">
                      {claim.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">#{claim.id}</h3>
                      <p className="text-sm text-gray-600">{claim.policyName}</p>
                      <p className="text-xs text-gray-500">{claim.claimType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{claim.settledAmount}</p>
                    <p className="text-xs text-gray-600">Settled</p>
                  </div>
                </div>

                {/* Status & Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-md border flex items-center space-x-1 ${getStatusColor(claim.status)}`}>
                    {getStatusIcon(claim.status)}
                    <span>{getStatusText(claim.status)}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm text-gray-600">{claim.rating}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="text-gray-500" size={14} />
                      <span className="text-xs text-gray-600 font-medium">Filed</span>
                    </div>
                    <p className="font-bold text-gray-700">{claim.dateOfClaim}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-1 mb-1">
                      <CheckCircle className="text-green-600" size={14} />
                      <span className="text-xs text-green-600 font-medium">Settled</span>
                    </div>
                    <p className="font-bold text-green-700">{claim.dateOfSettlement}</p>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="mb-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Claimed Amount</span>
                    <span className="font-medium text-gray-900">{claim.claimAmount}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Settled Amount</span>
                    <span className="font-bold text-green-600">{claim.settledAmount}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                    <FileText size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* File New Claim */}
        {activeTab === 'new' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">File New Claim</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                      <AlertCircle size={32} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Health Claim</h3>
                      <p className="text-sm text-gray-600">Medical expenses, hospitalization, surgeries</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">Avg 5-7 days processing</span>
                      </div>
                    </div>
                  </div>
                </button>
                
                <button className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-primary hover:shadow-lg transition-all text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <Shield size={32} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Auto Claim</h3>
                      <p className="text-sm text-gray-600">Vehicle damage, accidents, theft</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">Avg 7-10 days processing</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Smart Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Camera className="text-orange-600" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">AI Document Scanner</p>
                      <p className="text-sm text-gray-600">Scan bills & documents automatically</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Upload className="text-blue-600" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Upload Documents</p>
                      <p className="text-sm text-gray-600">Select from gallery or files</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'ongoing' && ongoingClaims.length === 0) || 
          (activeTab === 'history' && claimHistory.length === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {activeTab === 'ongoing' ? 'No Active Claims' : 'No Claim History'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'ongoing' 
                ? 'You have no ongoing insurance claims'
                : 'No previous claims found in your history'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}