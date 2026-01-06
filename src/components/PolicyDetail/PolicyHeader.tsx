import { ArrowLeft } from 'lucide-react';

interface PolicyHeaderProps {
    onBack?: () => void;
    onOpenMenu: () => void;
}

export function PolicyHeader({ onBack, onOpenMenu }: PolicyHeaderProps) {
    return (
        <div className="lg:hidden glass-card border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack || onOpenMenu}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="font-semibold text-gray-900">Policy Details</h1>
                <div className="w-10" />
            </div>
        </div>
    );
}
