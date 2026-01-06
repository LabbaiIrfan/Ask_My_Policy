import { motion, AnimatePresence } from 'motion/react';
import { Info, Plus, ChevronRight } from 'lucide-react';
import type { AddOnCategory, AddOn } from '../../data/policyDetailData';

interface AddOnsSectionProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    selectedAddOns: string[];
    onToggleAddOn: (name: string) => void;
    addOnCategories: AddOnCategory[];
    currentAddOns: AddOn[];
}

export function AddOnsSection({
    activeTab,
    onTabChange,
    selectedAddOns,
    onToggleAddOn,
    addOnCategories,
    currentAddOns
}: AddOnsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-sm border border-orange-100/50"
        >
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Possible Add Ons</h2>
                <Info className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-4 mb-6 lg:mb-8">
                {addOnCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <button
                            key={category.id}
                            onClick={() => onTabChange(category.id)}
                            className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === category.id
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500 hover:text-orange-500'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{category.name}</span>
                            <Info className="w-3 h-3 opacity-70" />
                        </button>
                    );
                })}
            </div>

            <div className="mb-4">
                <p className="text-gray-600 text-sm lg:text-base">
                    {addOnCategories.find(cat => cat.id === activeTab)?.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <AnimatePresence mode="popLayout">
                    {currentAddOns.map((addOn, index) => (
                        <motion.div
                            key={`${activeTab}-${index}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{addOn.name}</h3>
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                                        {addOn.company}
                                    </span>
                                </div>
                                <button
                                    onClick={() => onToggleAddOn(addOn.name)}
                                    className={`p-2 rounded-lg transition-all duration-300 ${selectedAddOns.includes(addOn.name)
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white'
                                        }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{addOn.summary}</p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold text-gray-900">{addOn.coverAmount}</div>
                                    <div className="text-sm font-medium text-orange-600">{addOn.price}</div>
                                </div>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1">
                                    <span>See Details</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
