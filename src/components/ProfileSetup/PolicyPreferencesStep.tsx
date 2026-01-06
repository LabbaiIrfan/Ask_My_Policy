import { Shield, Target, DollarSign, Settings } from 'lucide-react';
import { policyTypes } from '../../data/profileSetupData';
import type { ProfileData } from '../../data/profileSetupData';

interface PolicyPreferencesStepProps {
    profileData: ProfileData;
    handleInputChange: (category: keyof ProfileData, field: string, value: any) => void;
    handleArrayToggle: (category: keyof ProfileData, field: string, value: string) => void;
}

export function PolicyPreferencesStep({ profileData, handleInputChange, handleArrayToggle }: PolicyPreferencesStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Desired Policy Types</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {policyTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleArrayToggle('policyPreferences', 'desiredPolicyTypes', type)}
                            className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${profileData.policyPreferences.desiredPolicyTypes.includes(type)
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Desired Coverage Amount</span>
                    </label>
                    <select
                        value={profileData.policyPreferences.coverageAmount}
                        onChange={(e) => handleInputChange('policyPreferences', 'coverageAmount', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Coverage Amount</option>
                        <option value="under-100k">Under $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1,000,000</option>
                        <option value="1m-2m">$1,000,000 - $2,000,000</option>
                        <option value="over-2m">Over $2,000,000</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Monthly Premium Budget</span>
                    </label>
                    <select
                        value={profileData.policyPreferences.premiumBudget}
                        onChange={(e) => handleInputChange('policyPreferences', 'premiumBudget', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Budget Range</option>
                        <option value="under-50">Under $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200-400">$200 - $400</option>
                        <option value="400-800">$400 - $800</option>
                        <option value="over-800">Over $800</option>
                    </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Preferred Deductible</span>
                    </label>
                    <select
                        value={profileData.policyPreferences.preferredDeductible}
                        onChange={(e) => handleInputChange('policyPreferences', 'preferredDeductible', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Deductible Preference</option>
                        <option value="low">Low deductible, higher premium</option>
                        <option value="medium">Medium deductible, balanced premium</option>
                        <option value="high">High deductible, lower premium</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
