import { Cigarette, Wine, Zap } from 'lucide-react';
import { highRiskHobbies } from '../../data/profileSetupData';
import type { ProfileData } from '../../data/profileSetupData';

interface LifestyleStepProps {
    profileData: ProfileData;
    handleInputChange: (category: keyof ProfileData, field: string, value: any) => void;
    handleArrayToggle: (category: keyof ProfileData, field: string, value: string) => void;
}

export function LifestyleStep({ profileData, handleInputChange, handleArrayToggle }: LifestyleStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Cigarette className="w-4 h-4" />
                        <span>Smoking Habits</span>
                    </label>
                    <select
                        value={profileData.lifestyle.smokingHabits}
                        onChange={(e) => handleInputChange('lifestyle', 'smokingHabits', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Smoking Status</option>
                        <option value="never">Never smoked</option>
                        <option value="former">Former smoker (quit over 1 year ago)</option>
                        <option value="recent-former">Recent former smoker (quit within 1 year)</option>
                        <option value="occasional">Occasional smoker</option>
                        <option value="regular">Regular smoker</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Wine className="w-4 h-4" />
                        <span>Drinking Habits</span>
                    </label>
                    <select
                        value={profileData.lifestyle.drinkingHabits}
                        onChange={(e) => handleInputChange('lifestyle', 'drinkingHabits', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Drinking Habits</option>
                        <option value="none">Don't drink</option>
                        <option value="occasional">Occasional (1-2 drinks per week)</option>
                        <option value="moderate">Moderate (3-7 drinks per week)</option>
                        <option value="frequent">Frequent (8-14 drinks per week)</option>
                        <option value="heavy">Heavy (15+ drinks per week)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>High-Risk Hobbies/Activities</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {highRiskHobbies.map((hobby) => (
                        <button
                            key={hobby}
                            onClick={() => handleArrayToggle('lifestyle', 'highRiskHobbies', hobby)}
                            className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${profileData.lifestyle.highRiskHobbies.includes(hobby)
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {hobby}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
