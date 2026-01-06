import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { BranchCard } from './BranchCard';
import { type Branch } from '../../data/branches';

interface BranchListProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredBranches: Branch[];
    selectedBranch: Branch | null;
    onSelect: (branch: Branch) => void;
    onDirections: (branch: Branch) => void;
    onCall: (phone: string) => void;
}

export function BranchList({
    searchQuery,
    setSearchQuery,
    filteredBranches,
    selectedBranch,
    onSelect,
    onDirections,
    onCall
}: BranchListProps) {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 mb-6"
            >
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search branches..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <p className="text-sm text-gray-600">{filteredBranches.length} branches found</p>
            </motion.div>

            <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                {filteredBranches.map((branch, index) => (
                    <BranchCard
                        key={branch.id}
                        branch={branch}
                        index={index}
                        isSelected={selectedBranch?.id === branch.id}
                        onSelect={onSelect}
                        onDirections={onDirections}
                        onCall={onCall}
                    />
                ))}
            </div>
        </div>
    );
}
