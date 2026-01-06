import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  User,
  DollarSign,
  Activity,
  Heart,
  Shield,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import { ButtonPrimary } from '../Shared/ButtonPrimary';
import { Progress } from '../ui/progress';
import { supabase } from '../../utils/supabase/auth';
import { initialProfileData } from '../../data/profileSetupData';
import type { ProfileData } from '../../data/profileSetupData';

import { PersonalStep } from './PersonalStep';
import { FinancialStep } from './FinancialStep';
import { LifestyleStep } from './LifestyleStep';
import { HealthStep } from './HealthStep';
import { PolicyPreferencesStep } from './PolicyPreferencesStep';

// Animation Variants
const stepVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 }
  }
};

interface ProfileSetupProps {
  userData: any;
  onComplete: (profileData: any) => void;
  onSkip?: () => void;
}

export function ProfileSetup({ onComplete, onSkip }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      subtitle: 'Tell us about yourself',
      icon: User,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Financial Profile',
      subtitle: 'Your financial situation',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Lifestyle Factors',
      subtitle: 'Your lifestyle and habits',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Health Information',
      subtitle: 'Medical history and conditions',
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 5,
      title: 'Policy Preferences',
      subtitle: 'Your insurance preferences',
      icon: Shield,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleInputChange = (category: keyof ProfileData, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (category: keyof ProfileData, field: string, value: string) => {
    setProfileData(prev => {
      const currentArray: string[] = ((prev as any)[category]?.[field]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [category]: {
          ...(prev[category] as any),
          [field]: newArray
        }
      } as ProfileData;
    });
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // ✅ Save to Supabase
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase.from('profiles')
            .upsert({
              id: user.id,
              personal: profileData.personal,
              financial: profileData.financial,
              lifestyle: profileData.lifestyle,
              health: profileData.health,
              policy_preferences: profileData.policyPreferences,
              profile_completed: true,
              updated_at: new Date().toISOString()
            });

          if (error) {
            console.error('Supabase profile save error:', error.message);
          }
        }

        // ✅ Keep localStorage fallback
        const session = JSON.parse(localStorage.getItem('mock_session') || '{}');
        if (session.user) {
          const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
          const updatedUsers = existingUsers.map((user: any) => {
            if (user.id === session.user.id) {
              return {
                ...user,
                profileCompleted: true,
                profileData: profileData,
                updatedAt: new Date().toISOString()
              };
            }
            return user;
          });

          localStorage.setItem('mock_users', JSON.stringify(updatedUsers));
          const updatedSession = {
            ...session,
            user: {
              ...session.user,
              profileCompleted: true,
              profileData: profileData
            }
          };
          localStorage.setItem('mock_session', JSON.stringify(updatedSession));
        }

        onComplete(profileData);
      } catch (error) {
        console.error('Profile setup error:', error);
        onComplete(profileData);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalStep profileData={profileData} handleInputChange={handleInputChange} />;
      case 2:
        return <FinancialStep profileData={profileData} handleInputChange={handleInputChange} />;
      case 3:
        return <LifestyleStep profileData={profileData} handleInputChange={handleInputChange} handleArrayToggle={handleArrayToggle} />;
      case 4:
        return <HealthStep profileData={profileData} handleInputChange={handleInputChange} handleArrayToggle={handleArrayToggle} />;
      case 5:
        return <PolicyPreferencesStep profileData={profileData} handleInputChange={handleInputChange} handleArrayToggle={handleArrayToggle} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us provide personalized insurance recommendations</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center space-x-4 mb-8">
            <div className={`w-12 h-12 bg-gradient-to-r ${currentStepData?.color} rounded-xl flex items-center justify-center`}>
              {currentStepData?.icon && <currentStepData.icon className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentStepData?.title}</h2>
              <p className="text-gray-600">{currentStepData?.subtitle}</p>
            </div>
          </div>

          {/* Content with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <ButtonPrimary
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </ButtonPrimary>

            <div className="flex items-center space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-colors ${step.id <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>

            <ButtonPrimary
              onClick={nextStep}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center space-x-2"
            >
              <span>{currentStep === totalSteps ? 'Complete Profile' : 'Next'}</span>
              {currentStep === totalSteps ? (
                <Check className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </ButtonPrimary>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-500">
            Your information is secure and will only be used to provide personalized recommendations
          </p>
          {onSkip && (
            <ButtonPrimary
              onClick={onSkip}
              className="text-sm text-orange-600 hover:text-orange-500 underline"
            >
              Skip for now (complete later in Profile section)
            </ButtonPrimary>
          )}
        </div>
      </div>
    </div>
  );
}