import { Shield } from 'lucide-react';
import type { PolicyData } from '../../data/policyDetailData';

interface PremiumSummaryProps {
    policyData: PolicyData;
    onBuyNow: () => void;
}

export function PremiumSummary({ policyData, onBuyNow }: PremiumSummaryProps) {
    return (
        <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-orange-100/50 sticky top-6 shadow-sm">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-2xl lg:text-3xl font-bold text-gray-900">{policyData.premium}</span>
                        <span className="text-gray-600">/year</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 line-through">{policyData.originalPremium}</span>
                        <span className="text-green-600 font-medium">{policyData.discount}</span>
                    </div>
                </div>

                <button
                    onClick={onBuyNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 mb-4"
                >
                    Buy Now
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        Free cancellation within 30 days
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <Shield className="w-3 h-3" />
                        <span>100% Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
