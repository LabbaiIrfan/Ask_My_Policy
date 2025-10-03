import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, MapPin, Phone, Save, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ProfilePersonalInfoProps {
  userData: any;
  onUpdateProfile: (data: any) => void;
}

export function ProfilePersonalInfo({ userData, onUpdateProfile }: ProfilePersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    dateOfBirth: userData.personalInfo?.dateOfBirth || '',
    gender: userData.personalInfo?.gender || '',
    maritalStatus: userData.personalInfo?.maritalStatus || '',
    occupation: userData.personalInfo?.occupation || '',
    phone: userData.personalInfo?.phone || '',
    address: userData.personalInfo?.address || '',
    city: userData.personalInfo?.city || '',
    state: userData.personalInfo?.state || '',
    zipCode: userData.personalInfo?.zipCode || '',
    emergencyContact: userData.personalInfo?.emergencyContact || ''
  });

  const handleSave = () => {
    onUpdateProfile({
      fullName: formData.fullName,
      personalInfo: {
        ...userData.personalInfo,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        occupation: formData.occupation,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        emergencyContact: formData.emergencyContact
      }
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <p className="text-sm text-gray-500">Manage your basic personal details</p>
          </div>
        </div>
        
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            disabled={!isEditing}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            disabled={!isEditing}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
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
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            disabled={!isEditing}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Occupation</label>
          <Input
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            disabled={!isEditing}
            placeholder="e.g., Software Engineer"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="+1 (555) 123-4567"
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Street address"
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">City</label>
          <Input
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            disabled={!isEditing}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">State</label>
          <Input
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            disabled={!isEditing}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ZIP Code</label>
          <Input
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            disabled={!isEditing}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
          <Input
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            disabled={!isEditing}
            placeholder="Name and phone number"
            className="h-11"
          />
        </div>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
        >
          <p className="text-sm text-orange-800">
            <strong>Note:</strong> This information helps us provide more accurate insurance recommendations and faster claim processing.
          </p>
        </motion.div>
      )}
    </div>
  );
}