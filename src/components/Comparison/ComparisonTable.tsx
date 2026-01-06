import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ArrowRight } from 'lucide-react';
import { type PolicyInfo, type ComparisonData, featureDefinitions } from '../../data/comparisonData';

interface ComparisonTableProps {
    selectedPolicyNames: string[];
    allPolicies: PolicyInfo[];
    comparisonData: ComparisonData;
    onRemovePolicy: (policyName: string) => void;
}

export function ComparisonTable({
    selectedPolicyNames,
    allPolicies,
    comparisonData,
    onRemovePolicy
}: ComparisonTableProps) {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const compareFeatures = Object.keys(featureDefinitions);

    // --- Helper Logic for Values & Colors ---
    const getBestValue = (feature: string, policies: ComparisonData): string | boolean | null => {
        // Basic logic moved from original component
        if (feature === 'Pre/Post Hospitalization') {
            const postHospDays = Object.values(policies).map(p => p.postHospitalizationDays);
            const maxDays = Math.max(...postHospDays);
            // Find one that matches max
            const bestPolicyKey = Object.keys(policies).find(key => policies[key].postHospitalizationDays === maxDays);
            if (bestPolicyKey) {
                return `${policies[bestPolicyKey].preHospitalizationDays} / ${maxDays} days`;
            }
            return null;
        }
        if (feature === 'PED Waiting Period') {
            const pedMonths = Object.values(policies).map(p => p.waitingPeriodPEDMonths);
            const minMonths = Math.min(...pedMonths);
            return `${minMonths} months`;
        }
        // Simple "Yes" is best for bools mapped to 'Yes'
        const values = Object.values(policies).map(p => {
            const key = Object.keys(featureDefinitions).find(k => k === feature);
            return key ? featureDefinitions[key as keyof typeof featureDefinitions].formatter(p) : null;
        });

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
                                        onClick={() => onRemovePolicy(policyName)}
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
                            <th className="text-left p-4 font-medium text-gray-900 w-[200px] min-w-[200px] max-w-[200px]">Features</th>
                            {selectedPolicyNames.map(name => (
                                <th key={name} className="text-center p-4 font-medium text-gray-900 w-[250px] min-w-[250px] max-w-[250px]">
                                    <div className="flex flex-col items-center space-y-1">
                                        <span className="text-lg">{allPolicies.find(p => p.name === name)?.icon}</span>
                                        <span className="text-sm line-clamp-2" title={name}>{name}</span>
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
                                <td className="p-4 font-medium text-gray-900 w-[200px] min-w-[200px] max-w-[200px]">
                                    <div className="flex items-center">
                                        <span>{feature}</span>
                                        <FeatureExplanation feature={feature} />
                                    </div>
                                </td>
                                {selectedPolicyNames.map(policyName => {
                                    const policyFeatures = comparisonData[policyName];
                                    if (!policyFeatures) return <td key={policyName} className="w-[250px] min-w-[250px] max-w-[250px]"></td>;
                                    const val = featureDefinitions[feature as keyof typeof featureDefinitions].formatter(policyFeatures);

                                    // Determine if we should treat this as a list or plain text
                                    const isList = feature === 'Room Rent Limit' && val.includes('(');

                                    return (
                                        <td key={policyName} className="p-4 text-center align-top w-[250px] min-w-[250px] max-w-[250px]">
                                            {isList ? (
                                                <div className="text-left text-sm font-medium text-gray-700 max-h-[150px] overflow-y-auto custom-scrollbar" title={val}>
                                                    <ul className="list-disc list-inside">
                                                        {val.split('(').map(part => part.replace(/[()]/g, '').trim()).filter(Boolean).map((item, i) => (
                                                            <li key={i} className="whitespace-normal leading-snug mb-1">{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center" title={val.toString()}>
                                                    <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${getFeatureColor(val, feature)} block w-full line-clamp-4 whitespace-normal`}>
                                                        {val}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors flex items-center justify-center space-x-2 text-lg shadow-md hover:shadow-lg">
                    <span>Get Quotes for Selected Policies</span>
                    <ArrowRight size={20} />
                </button>
            </div>

        </motion.div>
    );
}
