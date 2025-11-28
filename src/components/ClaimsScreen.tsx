import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  FileText, 
  Calculator, 
  Users,
  MapPin,
  Building2,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Clock,
  DollarSign,
  Navigation,
  Calendar
} from 'lucide-react';

interface ClaimsScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar?: () => void;
}

export function ClaimsScreen(_props: ClaimsScreenProps) {
  const [activeSection, setActiveSection] = useState('cashless');
  const [selectedCity, setSelectedCity] = useState('');
  const [showHospitals, setShowHospitals] = useState(false);

  const cities = [
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi', state: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
    { id: 'pune', name: 'Pune', state: 'Maharashtra' },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' }
  ];

  const hospitalsByCity: { [key: string]: any[] } = {
    mumbai: [
      {
        name: 'Apollo Hospital, Navi Mumbai',
        address: 'Plot No 13, Sector 23, Sanpada, Navi Mumbai',
        specialty: 'Multi-Specialty',
        rating: 4.8,
        distance: '2.5 km',
        features: ['24/7 Emergency', 'ICU', 'Cardiac Care', 'Oncology']
      },
      {
        name: 'Fortis Hospital, Mulund',
        address: 'Mulund Goregaon Link Road, Mulund West, Mumbai',
        specialty: 'Multi-Specialty',
        rating: 4.7,
        distance: '3.2 km',
        features: ['Trauma Center', 'Neurology', 'Orthopedics', 'Maternity']
      },
      {
        name: 'Lilavati Hospital',
        address: 'A-791, Bandra Reclamation, Bandra West, Mumbai',
        specialty: 'Super Specialty',
        rating: 4.9,
        distance: '4.1 km',
        features: ['Heart Surgery', 'Cancer Care', 'Kidney Transplant', 'Pediatrics']
      }
    ],
    delhi: [
      {
        name: 'Max Super Speciality Hospital',
        address: 'Saket, New Delhi',
        specialty: 'Super Specialty',
        rating: 4.8,
        distance: '1.8 km',
        features: ['Cardiac Surgery', 'Neurology', 'Oncology', 'Emergency']
      },
      {
        name: 'Fortis Escorts Heart Institute',
        address: 'Okhla Road, New Delhi',
        specialty: 'Cardiac Care',
        rating: 4.9,
        distance: '2.3 km',
        features: ['Heart Surgery', 'Cardiac ICU', 'Interventional Cardiology']
      },
      {
        name: 'Apollo Hospital, New Delhi',
        address: 'Sarita Vihar, New Delhi',
        specialty: 'Multi-Specialty',
        rating: 4.7,
        distance: '3.5 km',
        features: ['Multi-Organ Transplant', 'Cancer Care', 'Neurosurgery']
      }
    ]
  };

  const reimburseSteps = [
    {
      step: 1,
      title: 'Treatment & Payment',
      description: 'Get treatment at any hospital and pay bills upfront',
      icon: FileText,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Collect Documents',
      description: 'Gather all original bills, discharge summary, and reports',
      icon: CheckCircle,
      color: 'green'
    },
    {
      step: 3,
      title: 'Submit Claim',
      description: 'Fill claim form and submit within 30 days of discharge',
      icon: DollarSign,
      color: 'orange'
    },
    {
      step: 4,
      title: 'Receive Reimbursement',
      description: 'Get money back in your bank account within 7-15 days',
      icon: CreditCard,
      color: 'purple'
    }
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowHospitals(true);
  };

  // getColorClasses removed (not used) - keep visual helper here if needed in future

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.button
            onClick={() => setActiveSection('cashless')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              activeSection === 'cashless'
                ? 'border-primary bg-primary text-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activeSection === 'cashless' ? 'bg-white/20' : 'bg-green-50'
              }`}>
                <CreditCard size={24} className={activeSection === 'cashless' ? 'text-white' : 'text-green-600'} />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-1">Cashless</h3>
                <p className={`text-sm ${activeSection === 'cashless' ? 'text-white/80' : 'text-gray-600'}`}>
                  Find network hospitals
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setActiveSection('reimburse')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              activeSection === 'reimburse'
                ? 'border-primary bg-primary text-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activeSection === 'reimburse' ? 'bg-white/20' : 'bg-blue-50'
              }`}>
                <FileText size={24} className={activeSection === 'reimburse' ? 'text-white' : 'text-blue-600'} />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-1">Reimburse</h3>
                <p className={`text-sm ${activeSection === 'reimburse' ? 'text-white/80' : 'text-gray-600'}`}>
                  Claim procedure steps
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setActiveSection('copay')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              activeSection === 'copay'
                ? 'border-primary bg-primary text-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activeSection === 'copay' ? 'bg-white/20' : 'bg-purple-50'
              }`}>
                <Calculator size={24} className={activeSection === 'copay' ? 'text-white' : 'text-purple-600'} />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-1">Co-pay</h3>
                <p className={`text-sm ${activeSection === 'copay' ? 'text-white/80' : 'text-gray-600'}`}>
                  Understanding co-payment
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setActiveSection('expert')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              activeSection === 'expert'
                ? 'border-primary bg-primary text-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activeSection === 'expert' ? 'bg-white/20' : 'bg-orange-50'
              }`}>
                <Users size={24} className={activeSection === 'expert' ? 'text-white' : 'text-orange-600'} />
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-1">Connect to Expert</h3>
                <p className={`text-sm ${activeSection === 'expert' ? 'text-white/80' : 'text-gray-600'}`}>
                  Get professional help
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Content Sections */}
        
        {/* Cashless Section - City & Hospital Selection */}
        {activeSection === 'cashless' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Find Cashless Hospitals</h2>
                  <p className="text-gray-600">Select your city to find network hospitals for cashless treatment</p>
                </div>
              </div>

              {!showHospitals ? (
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Select Your City</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map((city, index) => (
                      <motion.button
                        key={city.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCitySelect(city.id)}
                        className="p-4 bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/50 rounded-lg transition-all text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin size={20} className="text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{city.name}</p>
                            <p className="text-sm text-gray-600">{city.state}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Popular Hospitals in {cities.find(c => c.id === selectedCity)?.name}
                    </h3>
                    <button
                      onClick={() => setShowHospitals(false)}
                      className="text-primary hover:text-primary/80 font-medium text-sm"
                    >
                      Change City
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {hospitalsByCity[selectedCity]?.map((hospital, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              <Building2 size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{hospital.name}</h4>
                              <p className="text-sm text-gray-600">{hospital.specialty}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{hospital.rating}</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-start space-x-2">
                            <MapPin size={16} className="text-gray-400 mt-0.5" />
                            <p className="text-sm text-gray-600">{hospital.address}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Navigation size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{hospital.distance} away</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {hospital.features.map((feature: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reimburse Section - Steps */}
        {activeSection === 'reimburse' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Reimbursement Claim Process</h2>
                  <p className="text-gray-600">Follow these simple steps to get your medical expenses reimbursed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reimburseSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 bg-${step.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent size={24} className={`text-${step.color}-600`} />
                      </div>
                      
                      <div className={`w-8 h-8 bg-${step.color}-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3`}>
                        {step.step}
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      
                      {index < reimburseSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full">
                          <ArrowRight size={20} className="text-gray-400 mx-auto" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">Important Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Submit claims within 30 days of discharge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Keep original bills and medical reports</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Processing time: 7-15 working days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>Money credited directly to bank account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Co-pay Section */}
        {activeSection === 'copay' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Calculator size={24} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Understanding Co-payment</h2>
                  <p className="text-gray-600">Learn how co-payment works and how it affects your claims</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">What is Co-payment?</h3>
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-purple-900 font-medium mb-2">Definition</p>
                      <p className="text-purple-800 text-sm">
                        Co-payment is a fixed percentage of medical expenses that you need to pay from your own pocket, 
                        even when the claim is approved by your insurance company.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 font-bold text-xs">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Percentage Based</p>
                          <p className="text-sm text-gray-600">Usually ranges from 10% to 30% of claim amount</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 font-bold text-xs">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Age Factor</p>
                          <p className="text-sm text-gray-600">Higher co-pay for senior citizens (usually 60+ years)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 font-bold text-xs">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Treatment Type</p>
                          <p className="text-sm text-gray-600">May vary for different treatments or pre-existing conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Co-payment Example</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="text-center">
                      <div className="bg-purple-600 text-white rounded-lg p-4 mb-4">
                        <p className="text-purple-100 text-sm">Total Medical Bill</p>
                        <p className="font-bold">₹1,00,000</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-orange-700 text-sm font-medium">Co-payment (20%)</p>
                        <p className="font-bold text-orange-800">₹20,000</p>
                        <p className="text-xs text-orange-600">You pay</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-green-700 text-sm font-medium">Insurance Covers</p>
                        <p className="font-bold text-green-800">₹80,000</p>
                        <p className="text-xs text-green-600">Company pays</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium text-gray-900">Benefits of Co-payment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">Lower premium costs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">Prevents unnecessary claims</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">Shared responsibility model</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expert Section */}
        {activeSection === 'expert' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h2 className="font-bold text-white mb-2">Connect with Claim Experts</h2>
                <p className="text-orange-100">Get professional assistance for your health insurance claims</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                >
                  <Phone size={32} className="text-white mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Call Expert</h3>
                  <p className="text-orange-100 text-sm mb-3">Immediate phone support</p>
                  <p className="text-white font-medium">1800-XXX-XXXX</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                >
                  <MessageCircle size={32} className="text-white mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Live Chat</h3>
                  <p className="text-orange-100 text-sm mb-3">Chat with claim specialist</p>
                  <p className="text-white font-medium">Available 24/7</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                >
                  <Calendar size={32} className="text-white mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Schedule Call</h3>
                  <p className="text-orange-100 text-sm mb-3">Book expert consultation</p>
                  <p className="text-white font-medium">Choose your time</p>
                </motion.button>
              </div>
            </div>

            {/* Expert Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">What Our Experts Help With</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">Claim form filling assistance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">Document verification guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">Claim status tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">Appeal process support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">Policy coverage clarification</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Expert Availability</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Monday - Friday</p>
                      <p className="text-sm text-gray-600">9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Saturday - Sunday</p>
                      <p className="text-sm text-gray-600">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium text-sm">Emergency claims: 24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}