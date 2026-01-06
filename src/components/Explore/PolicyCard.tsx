import { motion } from 'motion/react';
import {
    CheckCircle,
    Sparkles,
    Star,
    Shield,
    DollarSign,
    Building,
    Bed,
    Truck,
    Activity,
    Calendar,
    TrendingUp,
    Clock,
    ArrowRight
} from 'lucide-react';
import { type Policy } from '../../data/policies';

interface PolicyCardProps {
    policy: Policy;
    isSelected: boolean;
    isRecommended?: boolean;
    expandedPolicyId: string | null;
    onToggleDetails: (id: string) => void;
    onToggleSelection: (name: string) => void;
    onBuyPolicy?: (policy: Policy) => void;
    index?: number;
}

export function PolicyCard({
    policy,
    isSelected,
    isRecommended = false,
    expandedPolicyId,
    onToggleDetails,
    onToggleSelection,
    onBuyPolicy,
    index = 0
}: PolicyCardProps) {

    const getBadgeColor = (tag: string) => {
        const colors: Record<string, string> = {
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
        return colors[tag] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

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
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                            Recommended for You
                        </span>
                    </div>
                    {policy.coverage_analysis && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-gray-700">
                            <strong>Analysis:</strong> {policy.coverage_analysis}
                        </div>
                    )}
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
                        onClick={() => onToggleDetails(policy.id)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${expandedPolicyId === policy.id
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {expandedPolicyId === policy.id ? 'Less Info' : 'More Info'}
                    </button>
                    <button
                        onClick={() => onToggleSelection(policy.name)}
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
}
