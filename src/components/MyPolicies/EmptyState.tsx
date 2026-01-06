import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

interface EmptyStateProps {
    activeTab: string;
}

export function EmptyState({ activeTab }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
        >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {activeTab === 'expired' ? 'No Expired Policies' : 'No Active Claims'}
            </h3>
            <p className="text-gray-500">
                {activeTab === 'expired'
                    ? 'All your policies are currently active'
                    : 'You have no ongoing insurance claims'
                }
            </p>
        </motion.div>
    );
}
