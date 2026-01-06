import { motion } from 'motion/react';
import { Info, Plus, ChevronRight, ArrowRight } from 'lucide-react';
import type { Rider } from '../../data/policyDetailData';

interface RidersSectionProps {
    selectedRiders: string[];
    onToggleRider: (name: string) => void;
    riders: Rider[];
}

export function RidersSection({ selectedRiders, onToggleRider, riders }: RidersSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-orange-100/50"
        >
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Understand Available Riders</h2>
                <Info className="w-5 h-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                {riders.map((rider, index) => (
                    <motion.div
                        key={rider.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{rider.name}</h3>
                            </div>
                            <button
                                onClick={() => onToggleRider(rider.name)}
                                className={`p-2 rounded-lg transition-all duration-300 ${selectedRiders.includes(rider.name)
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white'
                                    }`}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{rider.summary}</p>

                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-orange-600">{rider.price}</div>
                            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1">
                                <span>See Details</span>
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1 mx-auto">
                    <span>See all riders</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
