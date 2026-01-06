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
import type { Policy } from '../../data/myPoliciesData';

interface PolicyCardProps {
    policy: Policy;
    index: number;
}

export function PolicyCard({ policy, index }: PolicyCardProps) {
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
        <motion.div
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
    );
}
