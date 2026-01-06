import { motion } from 'motion/react';
import { CheckCircle, Clock, FileText } from 'lucide-react';

interface MyPoliciesTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    counts: {
        active: number;
        expired: number;
        claiming: number;
    };
}

export function MyPoliciesTabs({ activeTab, onTabChange, counts }: MyPoliciesTabsProps) {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-3">
                <motion.button
                    onClick={() => onTabChange('active')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'active'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                >
                    <CheckCircle size={18} />
                    <span>Active Policies</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${activeTab === 'active'
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {counts.active}
                    </span>
                </motion.button>

                <motion.button
                    onClick={() => onTabChange('expired')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'expired'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                >
                    <Clock size={18} />
                    <span>Expired</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${activeTab === 'expired'
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {counts.expired}
                    </span>
                </motion.button>

                <motion.button
                    onClick={() => onTabChange('claiming')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'claiming'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                >
                    <FileText size={18} />
                    <span>Claims</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${activeTab === 'claiming'
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {counts.claiming}
                    </span>
                </motion.button>
            </div>
        </div>
    );
}
