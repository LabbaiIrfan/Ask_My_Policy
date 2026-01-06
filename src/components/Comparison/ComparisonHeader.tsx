import { Plus } from 'lucide-react';

interface ComparisonHeaderProps {
    onOpenModal: () => void;
    hasPolicies: boolean;
}

export function ComparisonHeader({ onOpenModal, hasPolicies }: ComparisonHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Policy Comparison</h1>
            <button
                onClick={onOpenModal}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-sm hover:shadow-md"
            >
                <Plus size={18} />
                <span>{hasPolicies ? 'Add / Edit Policies' : 'Select Policies'}</span>
            </button>
        </div>
    );
}
