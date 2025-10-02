import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  DollarSign, 
  Activity, 
  Heart, 
  Shield, 
  ChevronRight, 
  ChevronLeft,
  Check,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Banknote,
  TrendingUp,
  Cigarette,
  Wine,
  Zap,
  Stethoscope,
  Pill,
  Target,
  Settings
} from 'lucide-react';
import { ButtonPrimary } from './ButtonPrimary';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

interface ProfileSetupProps {
  userData: any;
  onComplete: (profileData: any) => void;
  onSkip?: () => void;
}

interface ProfileData {
  personal: {
    age: string;
    gender: string;
    maritalStatus: string;
    dependents: string;
    location: string;
    occupation: string;
  };
  financial: {
    annualIncome: string;
    netWorth: string;
    existingDebt: string;
  };
  lifestyle: {
    smokingHabits: string;
    drinkingHabits: string;
    highRiskHobbies: string[];
  };
  health: {
    medicalHistory: string[];
    familyMedicalHistory: string[];
    currentMedications: string;
    currentConditions: string[];
  };
  policyPreferences: {
    desiredPolicyTypes: string[];
    coverageAmount: string;
    premiumBudget: string;
    preferredDeductible: string;
  };
}

export function ProfileSetup({ onComplete, onSkip }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    personal: {
      age: '',
      gender: '',
      maritalStatus: '',
      dependents: '',
      location: '',
      occupation: ''
    },
    financial: {
      annualIncome: '',
      netWorth: '',
      existingDebt: ''
    },
    lifestyle: {
      smokingHabits: '',
      drinkingHabits: '',
      highRiskHobbies: []
    },
    health: {
      medicalHistory: [],
      familyMedicalHistory: [],
      currentMedications: '',
      currentConditions: []
    },
    policyPreferences: {
      desiredPolicyTypes: [],
      coverageAmount: '',
      premiumBudget: '',
      preferredDeductible: ''
    }
  });

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
        // Get current user session
        const session = JSON.parse(localStorage.getItem('mock_session') || '{}');
        
        if (session.user) {
          // Update user in mock database
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
          
          // Update session
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
        // Still complete the setup even if storage fails
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

  const renderPersonalStep = () => (
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
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

  const renderFinancialStep = () => (
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
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

  const renderLifestyleStep = () => {
    const highRiskHobbies = [
      'Rock Climbing', 'Skydiving', 'Motorcycling', 'Scuba Diving', 
      'Mountaineering', 'Racing', 'Martial Arts', 'Extreme Sports'
    ];

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
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                  profileData.lifestyle.highRiskHobbies.includes(hobby)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {hobby}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHealthStep = () => {
    const commonConditions = [
      'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Depression', 
      'Anxiety', 'Arthritis', 'Cancer', 'Allergies', 'Thyroid Issues'
    ];

    const familyConditions = [
      'Heart Disease', 'Cancer', 'Diabetes', 'Stroke', 'Alzheimer\'s', 
      'Mental Health Issues', 'Kidney Disease', 'Liver Disease'
    ];

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
                className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                  profileData.health.currentConditions.includes(condition)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
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
                className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                  profileData.health.familyMedicalHistory.includes(condition)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
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
  };

  const renderPolicyPreferencesStep = () => {
    const policyTypes = [
      'Individual Health Insurance', 'Family Health Insurance', 'Critical Illness Insurance', 
      'Senior Citizen Health Insurance', 'Maternity Health Insurance', 'Disease-Specific Insurance'
    ];

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
                className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                  profileData.policyPreferences.desiredPolicyTypes.includes(type)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
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
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderPersonalStep();
      case 2: return renderFinancialStep();
      case 3: return renderLifestyleStep();
      case 4: return renderHealthStep();
      case 5: return renderPolicyPreferencesStep();
      default: return null;
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
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
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step.id <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
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