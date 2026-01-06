import { Banknote, TrendingUp } from 'lucide-react';
import type { ProfileData } from '../../data/profileSetupData';

interface FinancialStepProps {
    profileData: ProfileData;
    handleInputChange: (category: keyof ProfileData, field: string, value: any) => void;
}

export function FinancialStep({ profileData, handleInputChange }: FinancialStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Banknote className="w-4 h-4" />
                        <span>Annual Income</span>
                    </label>
                    <select
                        value={profileData.financial.annualIncome}
                        onChange={(e) => handleInputChange('financial', 'annualIncome', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Income Range</option>
                        <option value="under-25k">Under $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-75k">$50,000 - $75,000</option>
                        <option value="75k-100k">$75,000 - $100,000</option>
                        <option value="100k-150k">$100,000 - $150,000</option>
                        <option value="150k-250k">$150,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="over-500k">Over $500,000</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Net Worth</span>
                    </label>
                    <select
                        value={profileData.financial.netWorth}
                        onChange={(e) => handleInputChange('financial', 'netWorth', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Net Worth Range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1,000,000</option>
                        <option value="over-1m">Over $1,000,000</option>
                    </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Existing Debt</label>
                    <select
                        value={profileData.financial.existingDebt}
                        onChange={(e) => handleInputChange('financial', 'existingDebt', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Debt Level</option>
                        <option value="none">No significant debt</option>
                        <option value="low">Low (Under $10,000)</option>
                        <option value="moderate">Moderate ($10,000 - $50,000)</option>
                        <option value="high">High ($50,000 - $150,000)</option>
                        <option value="very-high">Very High (Over $150,000)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
