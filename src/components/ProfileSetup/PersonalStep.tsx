import { Calendar, Users, MapPin, Briefcase } from 'lucide-react';
import { Input } from '../ui/input';
import type { ProfileData } from '../../data/profileSetupData';

interface PersonalStepProps {
    profileData: ProfileData;
    handleInputChange: (category: keyof ProfileData, field: string, value: any) => void;
}

export function PersonalStep({ profileData, handleInputChange }: PersonalStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Age</span>
                    </label>
                    <Input
                        type="number"
                        value={profileData.personal.age}
                        onChange={(e) => handleInputChange('personal', 'age', e.target.value)}
                        placeholder="25"
                        className="h-11"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <select
                        value={profileData.personal.gender}
                        onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Marital Status</label>
                    <select
                        value={profileData.personal.maritalStatus}
                        onChange={(e) => handleInputChange('personal', 'maritalStatus', e.target.value)}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="domestic-partnership">Domestic Partnership</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Number of Dependents</span>
                    </label>
                    <Input
                        type="number"
                        value={profileData.personal.dependents}
                        onChange={(e) => handleInputChange('personal', 'dependents', e.target.value)}
                        placeholder="0"
                        className="h-11"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location (City, State)</span>
                    </label>
                    <Input
                        value={profileData.personal.location}
                        onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                        placeholder="San Francisco, CA"
                        className="h-11"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Occupation</span>
                    </label>
                    <Input
                        value={profileData.personal.occupation}
                        onChange={(e) => handleInputChange('personal', 'occupation', e.target.value)}
                        placeholder="Software Engineer"
                        className="h-11"
                    />
                </div>
            </div>
        </div>
    );
}
