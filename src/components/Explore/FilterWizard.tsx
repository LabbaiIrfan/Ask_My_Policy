import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Shield,
    Users,
    MapPin,
    Stethoscope,
    DollarSign,
    Heart,
    ArrowRight,
    ArrowLeft,
    X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface FilterData {
    category: string;
    gender: string;
    age: string;
    city: string;
    medicalHistory: string[];
    budget: string;
    requiredCoverage: string;
}

interface FilterWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
    filterData: FilterData;
    setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
}

export function FilterWizard({ isOpen, onClose, onComplete, filterData, setFilterData }: FilterWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const filterSteps = [
        {
            title: 'Select Category',
            description: 'What type of health insurance are you looking for?',
            icon: Shield
        },
        {
            title: 'Personal Details',
            description: 'Tell us about yourself',
            icon: Users
        },
        {
            title: 'Location',
            description: 'Which city are you based in?',
            icon: MapPin
        },
        {
            title: 'Medical History',
            description: 'Any existing health conditions?',
            icon: Stethoscope
        },
        {
            title: 'Budget',
            description: 'What\'s your preferred premium range?',
            icon: DollarSign
        },
        {
            title: 'Coverage Needs',
            description: 'Any specific medical procedures you need covered?',
            icon: Heart
        }
    ];

    const categories = [
        { id: 'Individual', name: 'Individual Health', icon: '👤', description: 'Coverage for yourself' },
        { id: 'Family', name: 'Family Health', icon: '👨‍👩‍👧‍👦', description: 'Coverage for your family' },
        { id: 'Senior', name: 'Senior Citizen', icon: '👴', description: 'Specialized for seniors' },
        { id: 'Critical', name: 'Critical Illness', icon: '❤️‍🩹', description: 'Critical disease coverage' },
        { id: 'Maternity', name: 'Maternity', icon: '🤱', description: 'Pregnancy & childbirth' }
    ];

    const genders = ['Male', 'Female', 'Other'];
    const ageRanges = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Other'];
    const medicalConditions = [
        'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'Cancer History',
        'Kidney Disease', 'Liver Disease', 'Mental Health', 'Obesity', 'None'
    ];
    const budgetRanges = [
        'Under ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹30,000',
        '₹30,000 - ₹50,000', 'Above ₹50,000'
    ];

    const nextStep = () => {
        if (currentStep < filterSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
            setCurrentStep(0); // Reset for next time
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleArrayToggle = (field: keyof FilterData, value: string) => {
        if (field === 'medicalHistory') {
            const current = filterData[field] as string[];
            if (value === 'None') {
                setFilterData(prev => ({ ...prev, [field]: ['None'] }));
            } else {
                const updated = current.includes(value)
                    ? current.filter(item => item !== value && item !== 'None')
                    : [...current.filter(item => item !== 'None'), value];
                setFilterData(prev => ({ ...prev, [field]: updated }));
            }
        }
    };

    const renderFilterStep = () => {
        const step = filterSteps[currentStep];
        const StepIcon = step.icon;

        switch (currentStep) {
            case 0: // Category
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setFilterData(prev => ({ ...prev, category: category.id }))}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${filterData.category === category.id
                                        ? 'border-primary bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-3xl">{category.icon}</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                            <p className="text-sm text-gray-600">{category.description}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                );

            case 1: // Personal Details
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {genders.map((gender) => (
                                        <button
                                            key={gender}
                                            onClick={() => setFilterData(prev => ({ ...prev, gender }))}
                                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.gender === gender
                                                ? 'border-primary bg-orange-50 text-primary'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Age Range</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {ageRanges.map((age) => (
                                        <button
                                            key={age}
                                            onClick={() => setFilterData(prev => ({ ...prev, age }))}
                                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.age === age
                                                ? 'border-primary bg-orange-50 text-primary'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2: // Location
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {cities.map((city) => (
                                <button
                                    key={city}
                                    onClick={() => setFilterData(prev => ({ ...prev, city }))}
                                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.city === city
                                        ? 'border-primary bg-orange-50 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 3: // Medical History
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {medicalConditions.map((condition) => (
                                <button
                                    key={condition}
                                    onClick={() => handleArrayToggle('medicalHistory', condition)}
                                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${filterData.medicalHistory.includes(condition)
                                        ? 'border-primary bg-orange-50 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {condition}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 4: // Budget
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {budgetRanges.map((budget) => (
                                <button
                                    key={budget}
                                    onClick={() => setFilterData(prev => ({ ...prev, budget }))}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${filterData.budget === budget
                                        ? 'border-primary bg-orange-50 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {budget}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 5: // Coverage Needs
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <StepIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div>
                            <Input
                                value={filterData.requiredCoverage}
                                onChange={(e) => setFilterData(prev => ({ ...prev, requiredCoverage: e.target.value }))}
                                placeholder="e.g., plastic surgery, cataract, diabetes management, cardiac surgery..."
                                className="h-12 text-base"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Specify any particular medical procedures or treatments you need covered
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Find Your Perfect Plan</h2>
                                <p className="text-sm text-gray-600">Step {currentStep + 1} of {filterSteps.length}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                {filterSteps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / filterSteps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Step Content */}
                        {renderFilterStep()}

                        {/* Navigation */}
                        <div className="flex justify-between mt-8">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Previous</span>
                            </Button>
                            <Button
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                            >
                                <span>{currentStep === filterSteps.length - 1 ? 'Get Recommendations' : 'Next'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
