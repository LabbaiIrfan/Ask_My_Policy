import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { type PolicyInfo, getInsurerIcon } from '../../data/comparisonData';

interface PolicySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    allPolicies: PolicyInfo[];
    tempSelectedPolicies: string[];
    onToggle: (policyName: string) => void;
    onConfirm: () => void;
}

export function PolicySelectionModal({
    isOpen,
    onClose,
    allPolicies,
    tempSelectedPolicies,
    onToggle,
    onConfirm
}: PolicySelectionModalProps) {
    const insurers = Array.from(new Set(allPolicies.map(p => p.company)));
    const [selectedInsurer, setSelectedInsurer] = useState<string | null>(null);

    // Filter policies based on selection
    const displayedPolicies = selectedInsurer
        ? allPolicies.filter(p => p.company === selectedInsurer)
        : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">Select Policies to Compare</h3>
                                <p className="text-sm text-gray-500 mt-1">First select an insurer, then choose their policies.</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar: Insurers List */}
                            <div className="w-1/3 border-r bg-gray-50 overflow-y-auto p-4 space-y-2">
                                <h4 className="font-semibold text-gray-700 mb-3 px-2">Insurers</h4>
                                {insurers.map(insurer => (
                                    <button
                                        key={insurer}
                                        onClick={() => setSelectedInsurer(insurer)}
                                        className={`w-full text-left p-3 rounded-lg transition-all text-sm font-medium flex items-center space-x-3
                                          ${selectedInsurer === insurer
                                                ? 'bg-white text-orange-600 shadow-sm border border-orange-200 ring-1 ring-orange-100'
                                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                                    >
                                        <span className="text-xl">{getInsurerIcon(insurer)}</span>
                                        <span className="line-clamp-2">{insurer}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Main Area: Policies List */}
                            <div className="w-2/3 p-6 overflow-y-auto bg-white">
                                {selectedInsurer ? (
                                    <>
                                        <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                            <span className="mr-2 text-2xl">{getInsurerIcon(selectedInsurer)}</span>
                                            {selectedInsurer} Policies
                                        </h4>
                                        <div className="space-y-3">
                                            {displayedPolicies.length > 0 ? (
                                                displayedPolicies.map(policy => {
                                                    const isChecked = tempSelectedPolicies.includes(policy.name);
                                                    return (
                                                        <label key={policy.id} className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer border transition-all ${isChecked ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                                                            <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isChecked ? 'bg-orange-500 text-white' : 'bg-gray-100 text-transparent border border-gray-300'}`}>
                                                                <CheckCircle size={14} />
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => onToggle(policy.name)}
                                                                className="sr-only"
                                                            />
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-gray-900">{policy.name}</p>
                                                            </div>
                                                        </label>
                                                    )
                                                })
                                            ) : (
                                                <p className="text-gray-500 italic">No policies found for this insurer.</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <ShieldCheck size={64} className="mb-4 text-gray-300" />
                                        <p className="text-lg">Select an insurer from the left to view policies</p>
                                        <p className="text-sm mt-2 max-w-xs text-center">We have a wide range of insurers and plans to choose from.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t bg-white flex justify-between items-center z-10">
                            <div className="text-sm font-medium text-gray-600">
                                {tempSelectedPolicies.length} policies selected
                            </div>
                            <button
                                onClick={onConfirm}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:shadow-none flex items-center space-x-2"
                                disabled={tempSelectedPolicies.length === 0}
                            >
                                <span>Compare Selected</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
