import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Search, Filter } from 'lucide-react';
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
    const [selectedInsurer, setSelectedInsurer] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileView, setMobileView] = useState<'insurers' | 'policies'>('insurers');

    const insurers = useMemo(() =>
        Array.from(new Set(allPolicies.map(p => p.company))),
        [allPolicies]);

    const filteredInsurers = useMemo(() => {
        if (!searchQuery) return insurers;
        return insurers.filter(insurer =>
            insurer.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [insurers, searchQuery]);

    const displayedPolicies = useMemo(() => {
        if (!selectedInsurer) return [];
        return allPolicies.filter(p => p.company === selectedInsurer);
    }, [allPolicies, selectedInsurer]);

    const handleInsurerSelect = (insurer: string) => {
        setSelectedInsurer(insurer);
        setMobileView('policies');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white z-10">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Compare Policies</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Select up to 3 policies to analyze</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-1 overflow-hidden relative md:flex-row">

                            {/* Left Panel: Insurers & Search (Mobile: Step 1, Desktop: Sidebar) */}
                            <div className={`
                                absolute inset-0 md:relative md:w-80 lg:w-96 bg-gray-50 border-r border-gray-100 flex flex-col h-full transition-transform duration-300 ease-in-out z-20 md:z-auto md:translate-x-0
                                ${mobileView === 'insurers' ? 'translate-x-0' : '-translate-x-full'}
                            `}>
                                <div className="p-4 border-b border-gray-100 bg-white/50 backdrop-blur sticky top-0">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search insurers..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1 p-3 space-y-2 custom-scrollbar">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 flex items-center">
                                        <Filter size={12} className="mr-1.5" />
                                        Available Insurers
                                    </h3>
                                    {filteredInsurers.length > 0 ? (
                                        filteredInsurers.map(insurer => (
                                            <button
                                                key={insurer}
                                                onClick={() => handleInsurerSelect(insurer)}
                                                className={`w-full flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 group
                                                    ${selectedInsurer === insurer
                                                        ? 'bg-white text-gray-900 shadow-md ring-1 ring-orange-100 border-l-4 border-orange-500'
                                                        : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-transform group-hover:scale-110 
                                                    ${selectedInsurer === insurer ? 'bg-orange-50' : 'bg-gray-100 group-hover:bg-white'}`}>
                                                    {getInsurerIcon(insurer)}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <span className="font-semibold text-sm block">{insurer}</span>
                                                    <span className="text-xs text-gray-400 md:hidden">Tap to view plans</span>
                                                </div>
                                                <ArrowRight size={16} className={`text-gray-300 md:hidden ${selectedInsurer === insurer ? 'text-orange-500' : ''}`} />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <p className="text-sm">No insurers found</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Panel: Policy Selection (Mobile: Step 2, Desktop: Main Content) */}
                            <div className={`
                                absolute inset-0 md:relative flex-1 bg-white flex flex-col overflow-hidden transition-transform duration-300 ease-in-out md:translate-x-0
                                ${mobileView === 'policies' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                            `}>
                                {selectedInsurer ? (
                                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                        {/* Mobile Back Button */}
                                        <div className="md:hidden mb-4">
                                            <button
                                                onClick={() => setMobileView('insurers')}
                                                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 px-3 py-2 rounded-lg"
                                            >
                                                <ArrowRight size={16} className="rotate-180 mr-2" />
                                                Back to Insurers
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-4 mb-6 sticky top-0 bg-white/95 backdrop-blur z-10 py-2 border-b border-dashed border-gray-100">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                                                {getInsurerIcon(selectedInsurer)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{selectedInsurer}</h3>
                                                <p className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md inline-block mt-1">
                                                    {displayedPolicies.length} Plans Available
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {displayedPolicies.map((policy, idx) => {
                                                const isSelected = tempSelectedPolicies.includes(policy.name);
                                                return (
                                                    <motion.label
                                                        key={policy.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className={`relative flex items-center p-4 md:p-5 rounded-2xl cursor-pointer border-2 transition-all duration-200 group
                                                            ${isSelected
                                                                ? 'border-orange-500 bg-orange-50/30'
                                                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => onToggle(policy.name)}
                                                            className="sr-only"
                                                        />

                                                        {/* Checkbox Visual */}
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-200
                                                            ${isSelected
                                                                ? 'bg-orange-500 shadow-lg shadow-orange-500/30 scale-110'
                                                                : 'bg-gray-200 group-hover:bg-gray-300'}`}>
                                                            {isSelected && <CheckCircle size={14} className="text-white" strokeWidth={3} />}
                                                        </div>

                                                        <div className="flex-1">
                                                            <h4 className={`font-bold text-base md:text-lg transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                                {policy.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">{policy.company}</p>
                                                        </div>

                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="absolute top-0 right-0 p-2"
                                                            >
                                                                <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
                                                                    Selected
                                                                </span>
                                                            </motion.div>
                                                        )}
                                                    </motion.label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 ring-8 ring-gray-50">
                                            <ShieldCheck size={48} className="text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Select an Insurer</h3>
                                        <p className="text-gray-500 max-w-sm">
                                            Choose an insurance provider from the sidebar to browse and select their available health plans.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                            <div className="text-sm font-medium text-gray-500 flex items-center">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                                <span>{tempSelectedPolicies.length} policies selected (Max 3)</span>
                            </div>
                            <button
                                onClick={onConfirm}
                                disabled={tempSelectedPolicies.length === 0}
                                className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 flex justify-center items-center space-x-2"
                            >
                                <span>Compare Now</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
