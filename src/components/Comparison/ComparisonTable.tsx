import { useState, useRef,} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ArrowRight, ChevronRight, } from 'lucide-react';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // --- Helper Logic for Values & Colors ---
    const getBestValue = (feature: string, policies: ComparisonData): string | boolean | null => {
        if (feature === 'Pre/Post Hospitalization') {
            const postHospDays = Object.values(policies).map(p => p.postHospitalizationDays);
            const maxDays = Math.max(...postHospDays);
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
        if (best && value === best) return 'text-green-700 bg-green-50/80 border-green-200 md:bg-green-50/50';
        if (value === 'No' || value === 'Not Covered') return 'text-red-700 bg-red-50/80 border-red-200';
        return 'text-gray-700 bg-gray-50 border-gray-200';
    };

    const FeatureExplanation = ({ feature }: { feature: string }) => {
        const featureInfo = featureDefinitions[feature as keyof typeof featureDefinitions];
        if (!featureInfo) return null;
        const FeatureIcon = featureInfo.icon;
        const isActive = activeTooltip === feature;

        return (
            <div className="relative inline-flex items-center ml-2">
                <button
                    onClick={() => setActiveTooltip(isActive ? null : feature)}
                    className="w-5 h-5 bg-orange-50 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors focus:outline-none"
                    aria-label={`Info about ${feature}`}
                >
                    <HelpCircle size={12} className="text-orange-500" />
                </button>
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                            className="absolute bottom-full left-0 mb-2 z-50 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-xl w-72 md:w-80"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FeatureIcon size={16} className="text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-gray-900 mb-1">{feature}</h4>
                                        <button
                                            onClick={() => setActiveTooltip(null)}
                                            className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1 p-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">{featureInfo.description}</p>
                                    <div className="bg-orange-50/50 rounded-lg p-2.5 border border-orange-100">
                                        <p className="text-xs text-orange-800 font-medium flex items-center gap-2">
                                            <span className="text-lg">💡</span> {featureInfo.tip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            {/* --- MOBILE VIEW: Snap Cards --- */}
            <div className="lg:hidden mb-8">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory px-4 pb-6 space-x-4 no-scrollbar -mx-4"
                >
                    {selectedPolicyNames.map((policyName, ) => {
                        const policyDetails = allPolicies.find(p => p.name === policyName);
                        const policyFeatures = comparisonData[policyName];
                        if (!policyDetails || !policyFeatures) return null;

                        return (
                            <div
                                key={policyDetails.id}
                                className="snap-center w-[85vw] sm:w-[60vw] flex-shrink-0"
                            >
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col relative">

                                    {/* Card Header */}
                                    <div className="p-5 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 relative">
                                        <button
                                            onClick={() => onRemovePolicy(policyName)}
                                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-3">
                                                {policyDetails.icon}
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{policyDetails.name}</h3>
                                            <p className="text-sm text-gray-500">{policyDetails.company}</p>
                                        </div>
                                    </div>

                                    {/* Card Features List */}
                                    <div className="p-5 space-y-4 flex-grow bg-white">
                                        {compareFeatures.map((feature) => {
                                            const val = featureDefinitions[feature as keyof typeof featureDefinitions].formatter(policyFeatures);
                                            const FeatureIcon = featureDefinitions[feature as keyof typeof featureDefinitions].icon;

                                            // Render list items for mobile
                                            const isList = feature === 'Room Rent Limit' && val.includes('(');

                                            return (
                                                <div key={feature} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <FeatureIcon size={14} className="text-orange-500" />
                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{feature}</span>
                                                    </div>

                                                    {isList ? (
                                                        <ul className="text-sm font-medium text-gray-800 space-y-1 pl-6">
                                                            {val.split('(').map(part => part.replace(/[()]/g, '').trim()).filter(Boolean).map((item, i) => (
                                                                <li key={i} className="list-disc">{item}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div className={`p-2 rounded-lg text-sm font-medium inline-block ${getFeatureColor(val, feature)}`}>
                                                            {val}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                                        <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm flex items-center justify-center space-x-2">
                                            <span>Get Quote</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center space-x-2">
                    {selectedPolicyNames.map((_, idx) => (
                        <div key={idx} className="w-2 h-2 rounded-full bg-gray-300 first:bg-orange-500" />
                    ))}
                </div>
            </div>


            {/* --- DESKTOP VIEW: Sticky Header Table --- */}
            <div className="hidden lg:block bg-white rounded-3xl border border-gray-200/60 shadow-xl shadow-gray-100/50 overflow-hidden">
                <div className="overflow-x-auto max-h-[800px] custom-scrollbar">
                    <table className="w-full border-collapse">
                        <thead className="bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-sm">
                            <tr>
                                <th className="text-left p-6 font-semibold text-gray-900 w-[240px] min-w-[240px] sticky left-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 border-r">
                                    <span className="text-lg">Features</span>
                                </th>
                                {selectedPolicyNames.map(name => {
                                    const policy = allPolicies.find(p => p.name === name);
                                    return (
                                        <th key={name} className="p-6 border-b border-gray-100 relative group min-w-[300px]">
                                            <button
                                                onClick={() => onRemovePolicy(name)}
                                                className="absolute top-2 right-2 p-1.5 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="flex flex-col items-center space-y-3">
                                                <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                                                    {policy?.icon}
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-bold text-gray-900">{policy?.name}</h3>
                                                    <p className="text-sm text-gray-500">{policy?.company}</p>
                                                </div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {compareFeatures.map((feature,) => (
                                <tr
                                    key={feature}
                                    className="group hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-none"
                                >
                                    <td className="p-6 w-[240px] min-w-[240px] sticky left-0 bg-white group-hover:bg-gray-50/50 transition-colors z-20 border-r border-gray-100">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-700 text-sm">{feature}</span>
                                            <FeatureExplanation feature={feature} />
                                        </div>
                                    </td>
                                    {selectedPolicyNames.map(policyName => {
                                        const policyFeatures = comparisonData[policyName];
                                        if (!policyFeatures) return <td key={policyName}></td>;
                                        const val = featureDefinitions[feature as keyof typeof featureDefinitions].formatter(policyFeatures);
                                        const isList = feature === 'Room Rent Limit' && val.includes('(');

                                        return (
                                            <td key={policyName} className="p-6 text-center align-middle relative">
                                                {/* Hover Highlight Overlay */}
                                                <div className="absolute inset-x-0 inset-y-2 group-hover:bg-gray-50 -z-10 rounded-xl mx-2 transition-colors" />

                                                {isList ? (
                                                    <div className="text-left text-sm text-gray-700 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                                        <ul className="space-y-1.5">
                                                            {val.split('(').map(part => part.replace(/[()]/g, '').trim()).filter(Boolean).map((item, i) => (
                                                                <li key={i} className="flex items-start text-xs md:text-sm">
                                                                    <div className="min-w-[4px] h-[4px] bg-orange-400 rounded-full mt-2 mr-2" />
                                                                    <span className="leading-snug">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <span className={`px-4 py-2.5 rounded-xl text-sm font-semibold border ${getFeatureColor(val, feature)} shadow-sm`}>
                                                            {val}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t border-gray-200">
                            <tr>
                                <td className="p-6 sticky left-0 bg-gray-50 z-20 border-r border-gray-200"></td>
                                {selectedPolicyNames.map(name => (
                                    <td key={name} className="p-6">
                                        <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center group">
                                            <span>Get Quote</span>
                                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-8 flex justify-end lg:hidden">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                    Check Detailed Breakdown
                </button>
            </div>

        </motion.div>
    );
}
