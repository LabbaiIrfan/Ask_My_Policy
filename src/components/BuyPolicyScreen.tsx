import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  User,
  Users,
  FileText,
  CreditCard,
  ChevronRight,
  Heart,
  Building2,
  Check,
  AlertCircle,
  Lock,
  Sparkles,
  X,
  Download,
  Upload,
  XCircle
} from 'lucide-react';

interface BuyPolicyScreenProps {
  onBack: () => void;
  policyData: any;
  selectedAddOns?: string[];
  selectedRiders?: string[];
  userData?: any;
}

const steps = [
  { id: 1, name: 'Coverage', icon: Shield },
  { id: 2, name: 'Personal Details', icon: User },
  { id: 3, name: 'Nominee', icon: Users },
  { id: 4, name: 'Documents', icon: FileText },
  { id: 5, name: 'Medical History', icon: Heart },
  { id: 6, name: 'Review & Pay', icon: CreditCard }
];

const medicalQuestions = [
  { id: 1, question: 'Do you smoke or use tobacco products?' },
  { id: 2, question: 'Have you been hospitalized in the last 2 years?' },
  { id: 3, question: 'Do you have any pre-existing medical conditions?' },
  { id: 4, question: 'Are you currently taking any medication?' },
  { id: 5, question: 'Do you have diabetes, hypertension, or heart disease?' },
  { id: 6, question: 'Have you undergone any surgery in the past 5 years?' }
];

interface DocumentUpload {
  name: string;
  file: File | null;
  status: 'pending' | 'uploaded' | 'error';
  preview?: string;
}

// Add typed form data so documents can include preview and TS won't complain
interface FormDataType {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    panNumber: string;
    aadharNumber: string;
  };
  nomineeDetails: {
    name: string;
    relationship: string;
    dateOfBirth: string;
    phone: string;
    email: string;
  };
  documents: {
    panCard: DocumentUpload;
    aadharCard: DocumentUpload;
    photo: DocumentUpload;
    addressProof: DocumentUpload;
  };
  medicalHistory: Record<number, boolean>;
  paymentMethod: string;
}

export function BuyPolicyScreen({
  onBack,
  policyData,
  selectedAddOns = [],
  selectedRiders = [],
  userData
}: BuyPolicyScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState<FormDataType>({
    personalDetails: {
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      dateOfBirth: userData?.dateOfBirth || '',
      gender: userData?.gender || '',
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
      pincode: userData?.pincode || '',
      panNumber: '',
      aadharNumber: ''
    },
    nomineeDetails: {
      name: '',
      relationship: '',
      dateOfBirth: '',
      phone: '',
      email: ''
    },
    documents: {
      panCard: { name: 'PAN Card', file: null, status: 'pending' },
      aadharCard: { name: 'Aadhar Card', file: null, status: 'pending' },
      photo: { name: 'Passport Size Photo', file: null, status: 'pending' },
      addressProof: { name: 'Address Proof', file: null, status: 'pending' }
    },
    medicalHistory: {} as Record<number, boolean>,
    paymentMethod: 'card'
  });

  const calculatePremium = () => {
    const basePremium = 18500;
    const addOnsPremium = selectedAddOns.length * 2500;
    const ridersPremium = selectedRiders.length * 800;
    const gst = (basePremium + addOnsPremium + ridersPremium) * 0.18;
    const total = basePremium + addOnsPremium + ridersPremium + gst;

    return {
      base: basePremium,
      addOns: addOnsPremium,
      riders: ridersPremium,
      gst,
      total
    };
  };

  const premium = calculatePremium();

  const updatePersonalDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const updateNomineeDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      nomineeDetails: {
        ...prev.nomineeDetails,
        [field]: value
      }
    }));
  };

  const handleDocumentUpload = (docType: keyof FormDataType['documents'], file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docType]: {
            ...prev.documents[docType],
            file,
            status: 'uploaded' as const,
            preview: reader.result as string
          }
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (docType: keyof typeof formData.documents) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: {
          ...prev.documents[docType],
          file: null,
          status: 'pending' as const,
          preview: undefined
        }
      }
    }));
  };

  const updateMedicalAnswer = (questionId: number, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [questionId]: value
      }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return formData.personalDetails.fullName &&
          formData.personalDetails.email &&
          formData.personalDetails.phone &&
          formData.personalDetails.dateOfBirth;
      case 3:
        return formData.nomineeDetails.name &&
          formData.nomineeDetails.relationship;
      case 4:
        return formData.documents.panCard.status === 'uploaded' &&
          formData.documents.aadharCard.status === 'uploaded';
      case 5:
        return Object.keys(formData.medicalHistory).length === medicalQuestions.length;
      case 6:
        return true;
      default:
        return true;
    }
  };

  const getValidationMessage = () => {
    switch (currentStep) {
      case 2:
        if (!formData.personalDetails.fullName) return 'Please enter your full name';
        if (!formData.personalDetails.email) return 'Please enter your email address';
        if (!formData.personalDetails.phone) return 'Please enter your phone number';
        if (!formData.personalDetails.dateOfBirth) return 'Please enter your date of birth';
        break;
      case 3:
        if (!formData.nomineeDetails.name) return 'Please enter nominee name';
        if (!formData.nomineeDetails.relationship) return 'Please select relationship with nominee';
        break;
      case 4:
        if (formData.documents.panCard.status !== 'uploaded') return 'Please upload PAN Card';
        if (formData.documents.aadharCard.status !== 'uploaded') return 'Please upload Aadhar Card';
        break;
      case 5:
        if (Object.keys(formData.medicalHistory).length !== medicalQuestions.length) {
          return 'Please answer all medical questions';
        }
        break;
    }
    return '';
  };

  const handleNext = () => {
    const validationMsg = getValidationMessage();
    if (validationMsg) {
      setValidationError(validationMsg);
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    if (currentStep < steps.length && canProceed()) {
      setValidationError('');
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePayment = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center shadow-premium border border-orange-100/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-[#FF6F00] to-[#FFA726] rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl text-gray-900 mb-3"
            >
              Policy Purchased Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Your {policyData.name} policy has been activated. Policy documents have been sent to your email.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6 mb-8 border border-orange-100/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Policy Number</span>
                <span className="text-gray-900">SHI{Date.now().toString().slice(-10)}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Coverage Amount</span>
                <span className="text-gray-900">{policyData.coverAmount}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Premium Paid</span>
                <span className="text-green-600">₹{premium.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valid Until</span>
                <span className="text-gray-900">
                  {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="flex-1 bg-gradient-to-r from-[#FF6F00] to-[#FFA726] text-white py-3 px-6 rounded-xl hover:shadow-premium transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={onBack}
              >
                <Download className="w-5 h-5" />
                <span>Download Policy</span>
              </button>
              <button
                className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300"
                onClick={onBack}
              >
                View Dashboard
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="glass-card border-b border-gray-200 sticky top-0 z-10 bg-white/95 backdrop-blur-lg">
        <div className="w-full bg-gray-200 h-1">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6F00] to-[#FFA726]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="text-center">
              <h1 className="text-gray-900">Complete Your Purchase</h1>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </p>
            </div>
            <div className="w-10" />
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: currentStep === step.id ? [1, 1.1, 1] : 1,
                      backgroundColor: currentStep > step.id ? '#10b981' : currentStep === step.id ? '#FF6F00' : '#e5e7eb'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > step.id
                        ? 'text-white shadow-soft'
                        : currentStep === step.id
                          ? 'text-white shadow-premium'
                          : 'text-gray-500'
                      }`}
                  >
                    {currentStep > step.id ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span
                    className={`mt-2 text-xs hidden sm:block transition-colors duration-300 ${currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: currentStep > step.id ? '#10b981' : '#e5e7eb',
                      scaleX: currentStep > step.id ? 1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-1 flex-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Coverage Summary</h2>
                      <p className="text-gray-600">Review your selected coverage and benefits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 1 of {steps.length}</div>
                      <div className="text-xs text-orange-600 font-medium">Let's get started</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start space-x-4 glass-card rounded-xl p-6 border border-orange-100/30">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#FF6F00] to-[#FFA726] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-premium">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{policyData.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Building2 className="w-4 h-4" />
                          <span>{policyData.company}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl text-gray-900">{policyData.coverAmount}</span>
                            <span className="text-gray-600 ml-2">Sum Insured</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-gray-900 mb-4">Selected Add-Ons ({selectedAddOns.length})</h3>
                      <div className="space-y-3">
                        {selectedAddOns.map((addOn, index) => (
                          <div key={index} className="flex items-center justify-between glass-card rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-gray-900">{addOn}</span>
                            </div>
                            <span className="text-gray-600">+ ₹2,500</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedRiders.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-gray-900 mb-4">Selected Riders ({selectedRiders.length})</h3>
                      <div className="space-y-3">
                        {selectedRiders.map((rider, index) => (
                          <div key={index} className="flex items-center justify-between glass-card rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-gray-900">{rider}</span>
                            </div>
                            <span className="text-gray-600">+ ₹800</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="glass-card rounded-xl p-6 bg-orange-50 border border-orange-100 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Important Information</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Policy will be active within 24 hours of payment</li>
                          <li>• 30-day free look period included</li>
                          <li>• Waiting period: 30 days for illness, no waiting for accidents</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-[#FF6F00] to-[#FFA726] hover:shadow-premium transition-all duration-300 flex items-center justify-center space-x-2 shadow-soft"
                  >
                    <span className="font-medium">Continue to Personal Details</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Personal Details</h2>
                      <p className="text-gray-600">Please provide your personal information</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 2 of {steps.length}</div>
                      <div className="text-xs text-orange-600 font-medium">Almost there!</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.personalDetails.fullName}
                          onChange={(e) => updatePersonalDetails('fullName', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          value={formData.personalDetails.dateOfBirth}
                          onChange={(e) => updatePersonalDetails('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Gender</label>
                        <select
                          value={formData.personalDetails.gender}
                          onChange={(e) => updatePersonalDetails('gender', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.personalDetails.phone}
                          onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.personalDetails.email}
                        onChange={(e) => updatePersonalDetails('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Address</label>
                      <textarea
                        value={formData.personalDetails.address}
                        onChange={(e) => updatePersonalDetails('address', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        rows={3}
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={formData.personalDetails.city}
                          onChange={(e) => updatePersonalDetails('city', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          value={formData.personalDetails.state}
                          onChange={(e) => updatePersonalDetails('state', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          value={formData.personalDetails.pincode}
                          onChange={(e) => updatePersonalDetails('pincode', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="400001"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">PAN Number</label>
                        <input
                          type="text"
                          value={formData.personalDetails.panNumber}
                          onChange={(e) => updatePersonalDetails('panNumber', e.target.value.toUpperCase())}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="ABCDE1234F"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Aadhar Number</label>
                        <input
                          type="text"
                          value={formData.personalDetails.aadharNumber}
                          onChange={(e) => updatePersonalDetails('aadharNumber', e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="1234 5678 9012"
                          maxLength={12}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Nominee Details</h2>
                      <p className="text-gray-600">Add nominee information for claim benefits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 3 of {steps.length}</div>
                      <div className="text-xs text-orange-600 font-medium">Halfway done!</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nominee Name *</label>
                      <input
                        type="text"
                        value={formData.nomineeDetails.name}
                        onChange={(e) => updateNomineeDetails('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        placeholder="Enter nominee's full name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Relationship *</label>
                        <select
                          value={formData.nomineeDetails.relationship}
                          onChange={(e) => updateNomineeDetails('relationship', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          required
                        >
                          <option value="">Select Relationship</option>
                          <option value="spouse">Spouse</option>
                          <option value="parent">Parent</option>
                          <option value="child">Child</option>
                          <option value="sibling">Sibling</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={formData.nomineeDetails.dateOfBirth}
                          onChange={(e) => updateNomineeDetails('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.nomineeDetails.phone}
                          onChange={(e) => updateNomineeDetails('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={formData.nomineeDetails.email}
                          onChange={(e) => updateNomineeDetails('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="nominee@example.com"
                        />
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 bg-blue-50 border border-blue-100">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-gray-900 mb-1">About Nominee</h4>
                          <p className="text-sm text-gray-600">
                            The nominee will receive the claim benefits in case of unfortunate events. You can change nominee details anytime by contacting customer support.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Upload Documents</h2>
                      <p className="text-gray-600">Please upload the required documents for KYC verification</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 4 of {steps.length}</div>
                      <div className="text-xs text-orange-600 font-medium">Almost done!</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {(Object.keys(formData.documents) as Array<keyof typeof formData.documents>).map((docKey) => {
                      const doc = formData.documents[docKey];
                      const isRequired = docKey === 'panCard' || docKey === 'aadharCard';

                      return (
                        <div key={docKey} className="glass-card rounded-xl p-6 border border-gray-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-green-50' : 'bg-gray-100'
                                }`}>
                                <FileText className={`w-5 h-5 ${doc.status === 'uploaded' ? 'text-green-600' : 'text-gray-600'
                                  }`} />
                              </div>
                              <div>
                                <h4 className="text-gray-900">
                                  {doc.name}
                                  {isRequired && <span className="text-red-500 ml-1">*</span>}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {doc.status === 'uploaded'
                                    ? doc.file?.name
                                    : 'PDF, JPG, PNG (Max 5MB)'}
                                </p>
                              </div>
                            </div>

                            {doc.status === 'uploaded' ? (
                              <button
                                onClick={() => removeDocument(docKey)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="w-5 h-5 text-red-500" />
                              </button>
                            ) : (
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleDocumentUpload(docKey, file);
                                  }}
                                />
                                <div className="px-4 py-2 bg-gradient-to-r from-[#FF6F00] to-[#FFA726] text-white rounded-lg hover:shadow-premium transition-all duration-300 flex items-center space-x-2">
                                  <Upload className="w-4 h-4" />
                                  <span>Upload</span>
                                </div>
                              </label>
                            )}
                          </div>

                          {doc.status === 'uploaded' && (
                            <div className="flex items-center space-x-2 text-green-600 text-sm">
                              <Check className="w-4 h-4" />
                              <span>Document uploaded successfully</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="glass-card rounded-xl p-6 bg-orange-50 border border-orange-100 mt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Document Guidelines</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Upload clear and legible copies of documents</li>
                          <li>• Ensure all corners of the document are visible</li>
                          <li>• PAN Card and Aadhar Card are mandatory for policy issuance</li>
                          <li>• Documents will be verified within 24 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Medical History</h2>
                      <p className="text-gray-600">Please answer the following health questions truthfully</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 5 of {steps.length}</div>
                      <div className="text-xs text-orange-600 font-medium">One more step!</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {medicalQuestions.map((q) => (
                      <div key={q.id} className="glass-card rounded-xl p-6 border border-gray-200">
                        <p className="text-gray-900 mb-4">{q.question}</p>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => updateMedicalAnswer(q.id, true)}
                            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${formData.medicalHistory[q.id] === true
                                ? 'bg-orange-500 text-white shadow-soft'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => updateMedicalAnswer(q.id, false)}
                            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${formData.medicalHistory[q.id] === false
                                ? 'bg-green-500 text-white shadow-soft'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card rounded-xl p-6 bg-orange-50 border border-orange-100 mt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Declaration</h4>
                        <p className="text-sm text-gray-600">
                          Providing false information may lead to claim rejection. All answers will be verified during claim processing. If you answered "Yes" to any question, you may need to undergo medical tests.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-gray-900 mb-2">Review & Payment</h2>
                      <p className="text-gray-600">Review your details and complete payment</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Step 6 of {steps.length}</div>
                      <div className="text-xs text-green-600 font-medium">Final step!</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="glass-card rounded-xl p-6 border border-gray-200">
                      <h3 className="text-gray-900 mb-4">Personal Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="text-gray-900">{formData.personalDetails.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="text-gray-900">{formData.personalDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="text-gray-900">{formData.personalDetails.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 border border-gray-200">
                      <h3 className="text-gray-900 mb-4">Nominee Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="text-gray-900">{formData.nomineeDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Relationship:</span>
                          <span className="text-gray-900 capitalize">{formData.nomineeDetails.relationship}</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 border border-gray-200">
                      <h3 className="text-gray-900 mb-4">Documents Uploaded</h3>
                      <div className="space-y-2">
                        {(Object.keys(formData.documents) as Array<keyof typeof formData.documents>)
                          .filter(key => formData.documents[key].status === 'uploaded')
                          .map((key) => (
                            <div key={key} className="flex items-center space-x-2 text-sm">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700">{formData.documents[key].name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                        { id: 'upi', name: 'UPI', icon: Sparkles },
                        { id: 'netbanking', name: 'Net Banking', icon: Building2 }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.paymentMethod === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-200'
                            }`}
                        >
                          <method.icon className={`w-6 h-6 mx-auto mb-2 ${formData.paymentMethod === method.id ? 'text-orange-600' : 'text-gray-600'
                            }`} />
                          <span className={`text-sm ${formData.paymentMethod === method.id ? 'text-orange-900' : 'text-gray-700'
                            }`}>
                            {method.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-blue-50 to-orange-50 border border-orange-200 mb-6">
                    <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <span>Declaration & Consent</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 bg-white rounded-lg p-3">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 flex-1 cursor-pointer">
                          I agree to the <span className="text-orange-600 font-medium">Terms & Conditions</span> and <span className="text-orange-600 font-medium">Privacy Policy</span>
                        </label>
                      </div>
                      <div className="flex items-start space-x-3 bg-white rounded-lg p-3">
                        <input
                          type="checkbox"
                          id="declaration"
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                        />
                        <label htmlFor="declaration" className="text-sm text-gray-700 flex-1 cursor-pointer">
                          I declare that all information provided is true and accurate
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6 bg-green-50 py-3 px-4 rounded-lg border border-green-200">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-green-700">Your payment information is encrypted and secure</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 mt-6">
              <AnimatePresence>
                {!canProceed() && currentStep < steps.length && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card rounded-xl p-4 bg-orange-50 border border-orange-200"
                  >
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-orange-900">
                          {getValidationMessage() || 'Please complete all required fields to continue'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card rounded-xl p-4 bg-red-50 border border-red-200"
                  >
                    <div className="flex items-start space-x-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-900 font-medium">{validationError}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="flex items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentStep > 1 ? (
                  <motion.button
                    onClick={handlePrevious}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-soft"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>
                ) : (
                  <div />
                )}
                {currentStep < steps.length ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    whileHover={canProceed() ? { scale: 1.02 } : {}}
                    whileTap={canProceed() ? { scale: 0.98 } : {}}
                    className={`px-8 py-3 rounded-xl text-white transition-all duration-300 flex items-center space-x-2 ${canProceed()
                        ? 'bg-gradient-to-r from-[#FF6F00] to-[#FFA726] hover:shadow-premium cursor-pointer shadow-soft'
                        : 'bg-gray-300 cursor-not-allowed opacity-60'
                      }`}
                  >
                    <span className="font-medium">Continue to {steps[currentStep]?.name}</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handlePayment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl text-white bg-gradient-to-r from-[#FF6F00] to-[#FFA726] hover:shadow-premium transition-all duration-300 flex items-center space-x-2 shadow-premium"
                  >
                    <Lock className="w-5 h-5" />
                    <span className="font-medium">Complete Payment - ₹{premium.total.toLocaleString()}</span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50 sticky top-24">
              <h3 className="text-gray-900 mb-6">Premium Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Base Premium</span>
                  <span className="text-gray-900">₹{premium.base.toLocaleString()}</span>
                </div>

                {premium.addOns > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Add-Ons</span>
                    <span className="text-gray-900">₹{premium.addOns.toLocaleString()}</span>
                  </div>
                )}

                {premium.riders > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Riders</span>
                    <span className="text-gray-900">₹{premium.riders.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-900">₹{premium.gst.toLocaleString()}</span>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-2xl text-orange-600">₹{premium.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 bg-green-50 border border-green-100">
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Instant Policy Issuance</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Cashless Hospitalization</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
