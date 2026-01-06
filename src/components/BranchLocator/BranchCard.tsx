import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Navigation, Route } from 'lucide-react';
import { type Branch } from '../../data/branches';

interface BranchCardProps {
    branch: Branch;
    isSelected?: boolean;
    onSelect: (branch: Branch) => void;
    onDirections: (branch: Branch) => void;
    onCall: (phone: string) => void;
    index: number;
}

export function BranchCard({
    branch,
    isSelected = false,
    onSelect,
    onDirections,
    onCall,
    index
}: BranchCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(branch)}
            className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-soft ${isSelected ? 'border-primary bg-orange-50/50' : 'border-gray-200'
                }`}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                <div className={`px-2 py-1 rounded-lg text-xs font-medium ${branch.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {branch.isOpen ? 'Open' : 'Closed'}
                </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
                <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{branch.address}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-gray-600">{branch.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Navigation className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{branch.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{branch.hours}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDirections(branch);
                    }}
                    className="flex-1 bg-gradient-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-premium transition-all duration-300 flex items-center justify-center space-x-1"
                >
                    <Route className="w-4 h-4" />
                    <span>Directions</span>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCall(branch.phone);
                    }}
                    className="flex-1 border border-primary text-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-1"
                >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                </button>
            </div>
        </motion.div>
    );
}
