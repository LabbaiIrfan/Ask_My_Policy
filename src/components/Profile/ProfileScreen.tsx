import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Award, ChevronRight } from 'lucide-react';
import { ProfilePersonalInfo } from './ProfilePersonalInfo';

interface ProfileScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
  userName: string;
}

export function ProfileScreen({ userName }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState({
    fullName: userName,
    email: 'user@example.com',
    profileCompleted: 45,
    personalInfo: {},
    insuranceHistory: {},
    preferences: {}
  });

  const handleUpdateProfile = (newData: any) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      description: 'Basic personal information',
      component: ProfilePersonalInfo
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  {userData.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.fullName}</h1>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Profile Completion</p>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${userData.profileCompleted}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{userData.profileCompleted}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 pb-24 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Profile Sections</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      <div className="text-left">
                        <p className="font-medium">{tab.label}</p>
                        <p className="text-xs text-gray-500">{tab.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'rotate-90 text-orange-600' : 'text-gray-400'
                      }`} />
                  </button>
                ))}
              </nav>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">AI Recommendations</span>
                </div>
                <p className="text-xs text-orange-700">
                  Complete your profile to get personalized insurance recommendations powered by AI.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {ActiveComponent && (
                <ActiveComponent
                  userData={userData}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}