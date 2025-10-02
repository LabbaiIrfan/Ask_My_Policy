import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Star,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  ArrowRight,
  Heart,
  Shield,
  Lightbulb,
  Award,
  Info
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  company: string;
  type: string;
  match: number;
  coverage: string;
  premium: string;
  savings: string;
  aiReason: string;
  benefits: string[];
  rating: number;
  icon?: string;
  priority?: 'high' | 'medium' | 'low';
  originalPremium?: string;
  popular?: boolean;
}

interface AIRecommendationsProps {
  userData?: any;
}

export function AIRecommendations({ userData }: AIRecommendationsProps) {
  const [selectedTab, setSelectedTab] = useState('personalized');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  
  const getPersonalizedMessage = () => {
    if (!userData?.profileCompleted) {
      return {
        title: "Complete Your Profile for Better Recommendations",
        message: "Help our AI understand your needs better by completing your profile. This will unlock personalized recommendations tailored specifically for you.",
        action: "Complete Profile",
        color: "orange"
      };
    }
    
    const profileData = userData?.profileData;
    const age = profileData?.personal?.age;
    const occupation = profileData?.personal?.occupation;
    const policyTypes = profileData?.policyPreferences?.desiredPolicyTypes || [];
    const budget = profileData?.policyPreferences?.premiumBudget;
    
    let personalizedText = `Based on your profile`;
    if (age) personalizedText += ` (age ${age})`;
    if (occupation) personalizedText += ` as a ${occupation}`;
    if (policyTypes.length > 0) personalizedText += `, your interest in ${policyTypes.slice(0, 2).join(' and ')}`;
    if (budget) personalizedText += `, and your ${budget} budget`;
    personalizedText += `, here are your AI-curated recommendations.`;
    
    return {
      title: `Personalized for ${userData?.fullName || 'You'}`,
      message: personalizedText,
      action: "View All Matches",
      color: "blue"
    };
  };

  const personalizedMsg = getPersonalizedMessage();

  const fetchRecommendations = async () => {
    if (!userData?.profileCompleted) return;

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate mock recommendations based on profile data
      const mockRecommendations = generateMockRecommendations(userData.profileData);
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
    }
  };

  const generateMockRecommendations = (profileData: any) => {
    const recommendations = [];
    
    if (!profileData) {
      // Return default health recommendations if no profile data
      return [
        {
          id: 'health_basic',
          title: 'BasicCare Essential',
          company: 'Care Health Insurance',
          type: 'Individual Health',
          match: 75,
          coverage: '₹2,00,000',
          premium: '₹8,600/year',
          savings: '₹1,800/year',
          aiReason: 'Essential health coverage perfect for getting started.',
          benefits: ['Basic hospitalization', 'Day care surgery', 'Emergency ambulance', 'Annual health checkup'],
          rating: 4.3
        }
      ];
    }

    // Individual Health Insurance
    recommendations.push({
      id: 'health_individual',
      title: 'HealthCare Premium Plus',
      company: 'Star Health Insurance',
      type: 'Individual Health',
      match: calculateHealthMatch(profileData),
      coverage: '₹10,00,000',
      premium: '₹18,500/year',
      savings: '₹3,200/year',
      aiReason: generateIndividualHealthReason(profileData),
      benefits: ['Cashless hospitals', 'Pre & post hospitalization', 'Maternity cover', 'Critical illness'],
      rating: 4.8
    });

    // Family Health Insurance (if dependents)
    if (profileData.personal?.dependents && parseInt(profileData.personal.dependents) > 0) {
      recommendations.push({
        id: 'health_family',
        title: 'Family Health Shield',
        company: 'HDFC ERGO Health Insurance',
        type: 'Family Health',
        match: calculateFamilyMatch(profileData),
        coverage: '₹15,00,000',
        premium: '₹24,000/year',
        savings: '₹5,100/year',
        aiReason: generateFamilyHealthReason(profileData),
        benefits: ['Family floater', 'Maternity benefits', 'OPD coverage', 'Annual health checkup'],
        rating: 4.9
      });
    }

    // Senior Health Insurance (if age > 60)
    if (profileData.personal?.age && parseInt(profileData.personal.age) > 60) {
      recommendations.push({
        id: 'health_senior',
        title: 'SeniorCare Complete',
        company: 'National Insurance Company',
        type: 'Senior Health',
        match: calculateSeniorMatch(profileData),
        coverage: '₹3,00,000',
        premium: '₹28,800/year',
        savings: '₹4,400/year',
        aiReason: generateSeniorHealthReason(profileData),
        benefits: ['Pre-existing disease cover', 'Domiciliary treatment', 'Alternative treatment', 'Health checkups'],
        rating: 4.7
      });
    }

    // Critical Illness (if family history of critical illness)
    if (profileData.health?.familyMedicalHistory?.includes('Critical Illness') || 
        profileData.health?.familyMedicalHistory?.includes('Cancer') ||
        profileData.health?.familyMedicalHistory?.includes('Heart Disease')) {
      recommendations.push({
        id: 'health_critical',
        title: 'Critical Illness Shield',
        company: 'Max Bupa Health Insurance',
        type: 'Critical Illness',
        match: calculateCriticalMatch(profileData),
        coverage: '₹25,00,000',
        premium: '₹32,500/year',
        savings: '₹6,800/year',
        aiReason: generateCriticalHealthReason(profileData),
        benefits: ['Critical illness cover', 'Cancer treatment', 'Organ transplant', 'Heart surgery cover'],
        rating: 4.6
      });
    }

    // Maternity Coverage (if planning family)
    if (profileData.personal?.maritalStatus === 'married' && 
        profileData.personal?.age && parseInt(profileData.personal.age) < 40) {
      recommendations.push({
        id: 'health_maternity',
        title: 'MaternityPlus Care',
        company: 'Religare Health Insurance',
        type: 'Maternity Health',
        match: calculateMaternityMatch(profileData),
        coverage: '₹8,00,000',
        premium: '₹16,900/year',
        savings: '₹3,500/year',
        aiReason: generateMaternityHealthReason(profileData),
        benefits: ['Maternity benefits', 'Newborn baby cover', 'Fertility treatment', 'Vaccination cover'],
        rating: 4.5
      });
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const calculateHealthMatch = (profileData: any) => {
    let match = 70;
    
    if (profileData.lifestyle?.smokingHabits === 'never') match += 10;
    if (profileData.personal?.age && parseInt(profileData.personal.age) < 35) match += 10;
    if (profileData.health?.currentConditions?.length === 0) match += 10;
    if (profileData.lifestyle?.drinkingHabits === 'never') match += 5;
    
    return Math.min(match, 95);
  };

  const calculateFamilyMatch = (profileData: any) => {
    let match = 75;
    
    if (profileData.personal?.dependents && parseInt(profileData.personal.dependents) > 1) match += 15;
    if (profileData.personal?.maritalStatus === 'married') match += 10;
    if (profileData.financial?.annualIncome && !profileData.financial.annualIncome.includes('under')) match += 5;
    
    return Math.min(match, 98);
  };

  const calculateSeniorMatch = (profileData: any) => {
    let match = 80;
    
    if (profileData.personal?.age && parseInt(profileData.personal.age) > 65) match += 10;
    if (profileData.health?.currentConditions?.length > 0) match += 5;
    if (profileData.lifestyle?.smokingHabits === 'never') match += 5;
    
    return Math.min(match, 92);
  };

  const calculateCriticalMatch = (profileData: any) => {
    let match = 70;
    
    if (profileData.health?.familyMedicalHistory?.includes('Critical Illness')) match += 15;
    if (profileData.health?.familyMedicalHistory?.includes('Cancer')) match += 10;
    if (profileData.health?.familyMedicalHistory?.includes('Heart Disease')) match += 10;
    if (profileData.personal?.age && parseInt(profileData.personal.age) > 40) match += 5;
    
    return Math.min(match, 95);
  };

  const calculateMaternityMatch = (profileData: any) => {
    let match = 75;
    
    if (profileData.personal?.maritalStatus === 'married') match += 10;
    if (profileData.personal?.age && parseInt(profileData.personal.age) < 35) match += 10;
    if (profileData.personal?.dependents === '0') match += 5;
    
    return Math.min(match, 93);
  };

  const generateIndividualHealthReason = (profileData: any) => {
    const age = profileData.personal?.age;
    const smoking = profileData.lifestyle?.smokingHabits;
    const conditions = profileData.health?.currentConditions?.length || 0;
    
    let reason = "Perfect fit based on your ";
    if (age) reason += `age group (${age}), `;
    if (smoking === 'never') reason += "non-smoking status, ";
    if (conditions === 0) reason += "excellent health profile, ";
    reason += "and coverage preferences.";
    
    return reason;
  };

  const generateFamilyHealthReason = (profileData: any) => {
    const dependents = profileData.personal?.dependents;
    const maritalStatus = profileData.personal?.maritalStatus;
    
    let reason = "Ideal family coverage considering your ";
    if (dependents && parseInt(dependents) > 0) reason += `${dependents} dependents, `;
    if (maritalStatus) reason += `${maritalStatus} status, `;
    reason += "and family health needs.";
    
    return reason;
  };

  const generateSeniorHealthReason = (profileData: any) => {
    const age = profileData.personal?.age;
    
    let reason = "Specially designed for senior citizens ";
    if (age) reason += `aged ${age}, `;
    reason += "with comprehensive coverage for age-related health issues.";
    
    return reason;
  };

  const generateCriticalHealthReason = (profileData: any) => {
    let reason = "Recommended based on your family medical history ";
    if (profileData.health?.familyMedicalHistory?.includes('Critical Illness')) {
      reason += "of critical illness ";
    }
    reason += "to provide financial protection against serious diseases.";
    
    return reason;
  };

  const generateMaternityHealthReason = (profileData: any) => {
    const age = profileData.personal?.age;
    
    let reason = "Perfect for family planning ";
    if (age) reason += `at age ${age}, `;
    reason += "with comprehensive maternity and newborn care benefits.";
    
    return reason;
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userData?.profileCompleted]);

  // Use fetched recommendations or fallback to default ones
  const personalizedRecommendations: Recommendation[] = recommendations.length > 0 ?
    recommendations.map((rec, index) => ({
      ...rec,
      icon: rec.type === 'Health Insurance' ? '🏥' : rec.type === 'Life Insurance' ? '🛡️' : '🚗',
      priority: index === 0 ? 'high' : 'medium',
  originalPremium: (rec.premium || '').replace(/\$(\d+)/, (_match: string, p1: string) => `${parseInt(p1) + 50}`),
      popular: index === 0
    })) : [
    {
      id: '1',
      type: 'Health Insurance',
      title: 'HealthGuard Premium',
      company: 'Star Health',
      icon: '🏥',
      priority: 'high',
      match: 95,
      coverage: '₹10 Lakhs',
      premium: '₹18,999',
      originalPremium: '₹22,500',
      savings: '₹3,501',
      aiReason: 'Perfect fit for your age group and health profile. Excellent maternity coverage and mental health benefits align with your preferences.',
      benefits: ['Cashless treatment at 8000+ hospitals', 'No room rent limit', 'Mental health coverage'],
      rating: 4.8,
      popular: true
    },
    {
      id: '2',
      type: 'Life Insurance',
      title: 'SecureLife Family Plan',
      company: 'HDFC ERGO',
      icon: '🛡️',
      priority: 'medium',
      match: 88,
      coverage: '₹8 Lakhs',
      premium: '₹16,750',
      originalPremium: '₹19,999',
      savings: '₹3,249',
      aiReason: 'Great value for money with comprehensive family coverage. Strong claim settlement ratio and good network coverage.',
      benefits: ['Family floater plan', 'Zero waiting period for accidents', 'Free annual health checkups'],
      rating: 4.6,
      popular: false
    },
    {
      id: '3',
      type: 'Auto Insurance',
      title: 'CareSafe Auto',
      company: 'Bajaj Allianz',
      icon: '🚗',
      priority: 'medium',
      match: 82,
      coverage: '₹5 Lakhs',
      premium: '₹8,500',
      originalPremium: '₹10,200',
      savings: '₹1,700',
      aiReason: 'Ideal for your vehicle type and driving history. Enhanced personal accident cover and roadside assistance included.',
      benefits: ['24/7 roadside assistance', 'Zero depreciation add-on', 'Quick claim processing'],
      rating: 4.7,
      popular: false
    }
  ];

  const aiInsights = [
    {
      title: 'Coverage Gap Detected',
      description: 'Your current health insurance may not cover mental health treatments. Consider upgrading to HealthGuard Premium.',
      urgency: 'high',
      icon: AlertCircle,
      action: 'Review Coverage',
      impact: 'High',
      category: 'Protection Gap'
    },
    {
      title: 'Premium Optimization',
      description: 'You could save ₹15,000 annually by switching to our recommended policies while maintaining the same coverage.',
      urgency: 'medium',
      icon: DollarSign,
      action: 'View Savings',
      impact: 'Medium',
      category: 'Cost Optimization'
    },
    {
      title: 'Renewal Reminder',
      description: 'Your car insurance expires in 30 days. Renew now to avoid policy lapse and maintain no-claim bonus.',
      urgency: 'high',
      icon: Clock,
      action: 'Renew Now',
      impact: 'High',
      category: 'Action Required'
    },
    {
      title: 'Family Addition Suggestion',
      description: 'Consider adding your spouse to your health policy. Family floater plans often offer better value than individual policies.',
      urgency: 'low',
      icon: Heart,
      action: 'Explore Options',
      impact: 'Low',
      category: 'Enhancement'
    }
  ];

  // priority color helper removed (unused)

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'bg-green-50 text-green-700 border-green-200';
    if (match >= 80) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-orange-50 text-orange-700 border-orange-200';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const totalSavings = personalizedRecommendations.reduce((sum, rec) =>
    sum + parseInt((rec.savings || '').replace(/[₹,]/g, '')), 0
  );

  const avgMatch = Math.round(
    personalizedRecommendations.reduce((sum, rec) => sum + rec.match, 0) / personalizedRecommendations.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* AI Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Brain className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{personalizedRecommendations.length}</p>
                <p className="text-sm text-gray-600">AI Matches</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹{(totalSavings/1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600">Total Savings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Target className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgMatch}%</p>
                <p className="text-sm text-gray-600">Avg Match</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Award className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">A+</p>
                <p className="text-sm text-gray-600">Protection Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setSelectedTab('personalized')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === 'personalized'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Sparkles size={18} />
              <span>For You</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedTab === 'personalized'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {personalizedRecommendations.length}
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setSelectedTab('insights')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === 'insights'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Lightbulb size={18} />
              <span>AI Insights</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedTab === 'insights'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {aiInsights.length}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Personalized Recommendations */}
        {selectedTab === 'personalized' && (
          <div className="space-y-6">
            {/* Personalized AI Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-r ${
                personalizedMsg.color === 'orange' 
                  ? 'from-orange-500 to-orange-600' 
                  : 'from-purple-600 to-blue-600'
              } rounded-xl p-6 text-white mb-8`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Target size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white">{personalizedMsg.title}</h2>
                    <p className="text-white/80">{personalizedMsg.message}</p>
                  </div>
                </div>
                {personalizedMsg.color === 'orange' && (
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors">
                    {personalizedMsg.action}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">₹{(totalSavings/1000).toFixed(0)}K</p>
                  <p className="text-white/80 text-sm">Potential Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{avgMatch}%</p>
                  <p className="text-white/80 text-sm">Average Match</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">A+</p>
                  <p className="text-white/80 text-sm">Protection Score</p>
                </div>
              </div>
            </motion.div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizedRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
                  {/* Policy Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
                        {rec.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {rec.popular && (
                        <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-xs font-medium">
                          Popular
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Match Score */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="font-medium text-gray-900">{rec.rating}</span>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-lg border ${getMatchColor(rec.match)}`}>
                      {rec.match}% Match
                    </span>
                  </div>

                  {/* AI Explanation */}
                  <div className="bg-purple-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <Zap className="text-purple-600 mt-0.5" size={16} />
                      <div>
                        <p className="font-medium text-purple-800 text-sm mb-1">AI Analysis</p>
                        <p className="text-sm text-purple-700">{rec.aiReason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coverage & Premium */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center space-x-1 mb-1">
                        <Shield className="text-green-600" size={14} />
                        <span className="text-xs text-green-600 font-medium">Coverage</span>
                      </div>
                      <p className="font-bold text-green-700">{rec.coverage}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center space-x-1 mb-1">
                        <TrendingUp className="text-blue-600" size={14} />
                        <span className="text-xs text-blue-600 font-medium">Premium</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <p className="font-bold text-blue-700">{rec.premium}</p>
                        <span className="text-xs text-gray-500 line-through">{rec.originalPremium}</span>
                      </div>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  <div className="bg-green-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">You Save</span>
                      <span className="font-bold text-green-700">{rec.savings}</span>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Benefits</h4>
                    <div className="space-y-1">
                      {rec.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="text-green-500" size={14} />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                      <span>Get Quote</span>
                      <ArrowRight size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Learn More
                      </button>
                      <button className="px-3 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights */}
        {selectedTab === 'insights' && (
          <div className="space-y-6">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 border-l-4 ${getUrgencyColor(insight.urgency)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                    <insight.icon size={24} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{insight.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} Impact
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                            {insight.category}
                          </span>
                        </div>
                      </div>
                      {insight.urgency === 'high' && (
                        <AlertCircle size={20} className="text-red-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <div className="flex items-center space-x-3">
                      <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
                        <span>{insight.action}</span>
                        <ArrowRight size={16} />
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                        <Info size={16} />
                        <span>Learn More</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}