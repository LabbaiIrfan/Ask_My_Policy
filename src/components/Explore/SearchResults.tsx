import { motion } from 'motion/react';
import { PolicyCard } from './PolicyCard';
import { type Policy } from '../../data/policies';
import { BarChart2, X, ArrowRight } from 'lucide-react';

interface SearchResultsProps {
    resultsHeader: string;
    resultsSubheader: string;
    filteredPolicies: Policy[];
    selectedPolicies: string[];
    expandedPolicyId: string | null;
    onToggleDetails: (id: string) => void;
    onToggleSelection: (name: string) => void;
    onBuyPolicy?: (policy: Policy) => void;
    onCompare: () => void;
    onClearSelection: () => void;
}

export function SearchResults({
    resultsHeader,
    resultsSubheader,
    filteredPolicies,
    selectedPolicies,
    expandedPolicyId,
    onToggleDetails,
    onToggleSelection,
    onBuyPolicy,
    onCompare,
    onClearSelection
}: SearchResultsProps) {

    const recommendedPolicies = filteredPolicies.filter(p => p.recommended);
    const otherPolicies = filteredPolicies.filter(p => !p.recommended);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 mt-12 text-left"
        >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{resultsHeader}</h2>
                    <p className="text-gray-600">{resultsSubheader}</p>
                </div>
            </div>

            {/* Recommended Policies */}
            {recommendedPolicies.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 items-start">
                        {recommendedPolicies.map((policy, index) => (
                            <PolicyCard
                                key={policy.id}
                                policy={policy}
                                index={index}
                                isRecommended={true}
                                isSelected={selectedPolicies.includes(policy.name)}
                                expandedPolicyId={expandedPolicyId}
                                onToggleDetails={onToggleDetails}
                                onToggleSelection={onToggleSelection}
                                onBuyPolicy={onBuyPolicy}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Other Policies */}
            <div>
                {recommendedPolicies.length > 0 && otherPolicies.length > 0 && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Plans</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {otherPolicies.map((policy, index) => (
                        <PolicyCard
                            key={policy.id}
                            policy={policy}
                            index={index}
                            isRecommended={false}
                            isSelected={selectedPolicies.includes(policy.name)}
                            expandedPolicyId={expandedPolicyId}
                            onToggleDetails={onToggleDetails}
                            onToggleSelection={onToggleSelection}
                            onBuyPolicy={onBuyPolicy}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
