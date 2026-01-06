import { Stethoscope, Users, Pill } from 'lucide-react';
import { Input } from '../ui/input';
import { commonConditions, familyConditions } from '../../data/profileSetupData';
import type { ProfileData } from '../../data/profileSetupData';

interface HealthStepProps {
    profileData: ProfileData;
    handleInputChange: (category: keyof ProfileData, field: string, value: any) => void;
    handleArrayToggle: (category: keyof ProfileData, field: string, value: string) => void;
}

export function HealthStep({ profileData, handleInputChange, handleArrayToggle }: HealthStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Current Health Conditions</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonConditions.map((condition) => (
                        <button
                            key={condition}
                            onClick={() => handleArrayToggle('health', 'currentConditions', condition)}
                            className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${profileData.health.currentConditions.includes(condition)
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Family Medical History</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {familyConditions.map((condition) => (
                        <button
                            key={condition}
                            onClick={() => handleArrayToggle('health', 'familyMedicalHistory', condition)}
                            className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${profileData.health.familyMedicalHistory.includes(condition)
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Pill className="w-4 h-4" />
                    <span>Current Medications</span>
                </label>
                <Input
                    value={profileData.health.currentMedications}
                    onChange={(e) => handleInputChange('health', 'currentMedications', e.target.value)}
                    placeholder="List your current medications (optional)"
                    className="h-11"
                />
            </div>
        </div>
    );
}
