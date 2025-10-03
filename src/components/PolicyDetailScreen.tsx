import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  Plus, 
  Info, 
  Star, 
  Building2,
  Heart,
  Zap,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Quote,
  User,
  ThumbsUp,
  Verified
} from 'lucide-react';

interface PolicyDetailScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
  onBack?: () => void;
}

const policyData = {
  name: 'HealthCare Premium Plus',
  company: 'Star Health Insurance',
  coverAmount: '₹10,00,000',
  premium: '₹18,500',
  originalPremium: '₹21,700',
  discount: 'Save ₹3,200',
  rating: 4.8,
  reviews: 2847,
  claimsSettled: 89,
  badges: ['Popular', 'Bestseller'],
  description: 'Premium health insurance plan offering comprehensive coverage with extensive benefits, cashless hospitalization, and superior claim settlement experience.',
  features: [
    'Cashless Hospitals - Network of 12,000+ hospitals',
    'Pre & Post Hospitalization - Up to 60 days coverage',
    'Maternity Cover - Comprehensive maternity benefits',
    'No Claim Bonus - Up to 100% premium discount'
  ]
};

const addOnCategories = [
  {
    id: 'topup',
    name: 'Top Up',
    icon: Shield,
    description: 'Additional coverage when your base sum insured is exhausted'
  },
  {
    id: 'critical',
    name: 'Critical Illness',
    icon: Heart,
    description: 'Lump sum benefit for specified critical illnesses'
  },
  {
    id: 'supertopup',
    name: 'Super Top Up',
    icon: Zap,
    description: 'Enhanced top-up with lower deductible options'
  }
];

const addOns = {
  topup: [
    {
      name: 'Health Guard Top Up',
      company: 'Bajaj Allianz',
      summary: 'Additional coverage when your base policy limit is exhausted. No waiting period for accidents.',
      coverAmount: 'Rs. 5 Lakh',
      price: 'Rs. 2,499'
    },
    {
      name: 'Care Supreme Top Up',
      company: 'Care Health',
      summary: 'Comprehensive top-up plan with worldwide coverage and emergency assistance.',
      coverAmount: 'Rs. 10 Lakh',
      price: 'Rs. 4,999'
    }
  ],
  critical: [
    {
      name: 'Critical Care Shield',
      company: 'HDFC ERGO',
      summary: 'Covers 37 critical illnesses with lump sum benefit. Includes partial benefits for early stages.',
      coverAmount: 'Rs. 4 Lakh',
      price: 'Rs. 1,999'
    },
    {
      name: 'Life Guard Critical',
      company: 'Star Health',
      summary: 'Protection against major critical illnesses with immediate payout and no claim hassles.',
      coverAmount: 'Rs. 6 Lakh',
      price: 'Rs. 2,799'
    }
  ],
  supertopup: [
    {
      name: 'Super Health Guard',
      company: 'Niva Bupa',
      summary: 'Lower deductible super top-up with enhanced benefits and global coverage options.',
      coverAmount: 'Rs. 15 Lakh',
      price: 'Rs. 6,999'
    },
    {
      name: 'Aditya Birla Super Shield',
      company: 'Aditya Birla',
      summary: 'Premium super top-up with no room rent restrictions and unlimited restoration benefit.',
      coverAmount: 'Rs. 20 Lakh',
      price: 'Rs. 8,499'
    }
  ]
};

const riders = [
  {
    name: 'Maternity Cover Rider',
    summary: 'Comprehensive maternity coverage including normal and cesarean delivery with newborn coverage.',
    price: 'Rs. 999'
  },
  {
    name: 'Personal Accident Rider',
    summary: 'Additional protection against accidental death and permanent disability with 24/7 coverage.',
    price: 'Rs. 599'
  },
  {
    name: 'Daily Cash Rider',
    summary: 'Daily allowance during hospitalization to cover incidental expenses and loss of income.',
    price: 'Rs. 799'
  },
  {
    name: 'OPD Treatment Rider',
    summary: 'Coverage for outpatient department expenses including consultation fees and diagnostic tests.',
    price: 'Rs. 1,299'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sana Shaikh',
    age: 34,
    city: 'Mumbai',
    rating: 5,
    verified: true,
    claimAmount: '₹2.8 Lakh',
    review: 'Excellent experience with Star Health! When my husband was diagnosed with kidney stones, the cashless claim process was incredibly smooth. The hospital coordinators handled everything, and we didn\'t have to pay a single rupee upfront. The policy covered all expenses including post-operative care.',
    helpful: 89,
    date: '2 months ago',
    hospitalStay: '7 days'
  },
  {
    id: 2,
    name: 'Amrut pathankar',
    age: 42,
    city: 'Delhi',
    rating: 5,
    verified: true,
    claimAmount: '₹4.2 Lakh',
    review: 'Had to undergo emergency cardiac surgery last year. Star Health\'s claim settlement was faster than expected - got approval within 4 hours of admission. The coverage was comprehensive, including ICU charges, medicines, and even ambulance costs. Highly recommend this policy!',
    helpful: 156,
    date: '4 months ago',
    hospitalStay: '12 days'
  },
  {
    id: 3,
    name: 'labbai Irfan',
    age: 29,
    city: 'Bangalore',
    rating: 4,
    verified: true,
    claimAmount: '₹1.5 Lakh',
    review: 'Great policy for maternity coverage! The waiting period was clearly explained, and when the time came, all my delivery expenses were covered including newborn care. The only minor issue was some paperwork delays, but overall very satisfied with the service.',
    helpful: 67,
    date: '6 months ago',
    hospitalStay: '4 days'
  },
  {
    id: 4,
    name: 'Zakir Shaikh',
    age: 38,
    city: 'Pune',
    rating: 5,
    verified: true,
    claimAmount: '₹3.1 Lakh',
    review: 'My father needed cataract surgery in both eyes. The pre-authorization was approved instantly through their app. The day-care procedure was completely cashless, and even the follow-up consultations were covered. Excellent customer service throughout!',
    helpful: 124,
    date: '3 months ago',
    hospitalStay: 'Day care'
  },
  {
    id: 5,
    name: 'Talha Shaikh',
    age: 31,
    city: 'Hyderabad',
    rating: 4,
    verified: true,
    claimAmount: '₹95,000',
    review: 'Used this policy for my thyroid surgery. The claim process was transparent and all communication was prompt. They even covered my pre and post hospitalization expenses which other insurers often reject. Very professional team and fair claim assessments.',
    helpful: 78,
    date: '8 months ago',
    hospitalStay: '3 days'
  }
];

export function PolicyDetailScreen({ onOpenMenu, onBack }: PolicyDetailScreenProps) {
  const [activeAddOnTab, setActiveAddOnTab] = useState('topup');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedRiders, setSelectedRiders] = useState<string[]>([]);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnName) 
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const toggleRider = (riderName: string) => {
    setSelectedRiders(prev => 
      prev.includes(riderName) 
        ? prev.filter(name => name !== riderName)
        : [...prev, riderName]
    );
  };

  const currentAddOns = addOns[activeAddOnTab as keyof typeof addOns] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden glass-card border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack || onOpenMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Policy Details</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-soft border border-orange-100/50"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 gradient-orange rounded-2xl flex items-center justify-center shadow-premium">
                    <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{policyData.name}</h1>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{policyData.company}</span>
                      <div className="flex items-center space-x-1 ml-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{policyData.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{policyData.description}</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass-card rounded-xl p-4 border border-orange-100/30">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{policyData.coverAmount}</div>
                    <div className="text-sm text-gray-600">Sum Insured</div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-4 border border-green-100/30">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-green-600 mb-1">{policyData.discount}</div>
                    <div className="text-sm text-gray-600">Discount</div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border border-blue-100/30">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-blue-600 mb-1">12,000+</div>
                    <div className="text-sm text-gray-600">Hospitals</div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border border-purple-100/30">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-purple-600 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Max NCB</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {policyData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-80 flex-shrink-0">
              <div className="glass-card rounded-2xl p-6 border border-orange-100/50 sticky top-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl lg:text-3xl font-bold text-gray-900">{policyData.premium}</span>
                    <span className="text-gray-600">/year</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-gray-500 line-through">{policyData.originalPremium}</span>
                    <span className="text-green-600 font-medium">{policyData.discount}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-orange text-white py-3 lg:py-4 px-6 rounded-xl font-semibold hover:shadow-premium transition-all duration-300 mb-4">
                  Buy Now
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Free cancellation within 30 days
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <Shield className="w-3 h-3" />
                    <span>100% Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-soft border border-orange-100/50"
        >
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Possible Add Ons</h2>
            <Info className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4 mb-6 lg:mb-8">
            {addOnCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveAddOnTab(category.id)}
                className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeAddOnTab === category.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <Info className="w-3 h-3 opacity-70" />
              </button>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-sm lg:text-base">
              {addOnCategories.find(cat => cat.id === activeAddOnTab)?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {currentAddOns.map((addOn, index) => (
                <motion.div
                  key={`${activeAddOnTab}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{addOn.name}</h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                        {addOn.company}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleAddOn(addOn.name)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        selectedAddOns.includes(addOn.name)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{addOn.summary}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{addOn.coverAmount}</div>
                      <div className="text-sm font-medium text-primary">{addOn.price}</div>
                    </div>
                    <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1">
                      <span>See Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
        >
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Understand Available Riders</h2>
            <Info className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {riders.map((rider, index) => (
              <motion.div
                key={rider.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{rider.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleRider(rider.name)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedRiders.includes(rider.name)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{rider.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-primary">{rider.price}</div>
                  <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1">
                    <span>See Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 mx-auto">
              <span>See all riders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft border border-orange-100/50"
        >
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Customer Testimonials</h2>
            <Quote className="w-5 h-5 text-gray-400" />
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">4.8</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-600">Based on 2,847 reviews</span>
            </div>
            <p className="text-gray-600 text-sm">
              Real experiences from verified policyholders who have used this plan
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{testimonial.age} years</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{testimonial.city}</span>
                          {testimonial.verified && (
                            <>
                              <span className="text-gray-500">•</span>
                              <div className="flex items-center space-x-1">
                                <Verified className="w-4 h-4 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">Verified</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Claim: {testimonial.claimAmount}</span>
                          <span>•</span>
                          <span>Stay: {testimonial.hospitalStay}</span>
                          <span>•</span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < testimonial.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.review}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({testimonial.helpful})</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                          Claim Approved
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 mx-auto">
              <span>Read all {testimonials.length} reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}