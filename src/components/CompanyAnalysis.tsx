import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  BarChart3, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Shield,
  Award,
  Users,
  DollarSign,
  CheckCircle,
  Star,
  Building2,
  PieChart,
  Activity,
  Percent,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Filter,
  Download,
  Share2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompanyAnalysisProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

const companies = [
  {
    id: 'bajaj',
    name: 'Bajaj Allianz',
    logo: '🏢',
    rating: 4.5,
    established: '2001',
    marketShare: '8.2%',
    claimSettlementRatio: 94.8,
    solvencyRatio: 2.31,
    networkHospitals: 10000,
    activePolicies: 1200000,
    overview: 'Bajaj Allianz is one of India\'s leading private general insurance companies, offering comprehensive health insurance solutions with a strong focus on innovation and customer satisfaction.',
    financialMetrics: {
      profitAfterTax: { value: 1245, change: 12.5, trend: 'up' },
      totalPremium: { value: 12450, change: 15.2, trend: 'up' },
      claimsRatio: { value: 72.5, change: -2.1, trend: 'down' },
      expenseRatio: { value: 26.8, change: -1.5, trend: 'down' }
    },
    strengths: [
      'Wide network of cashless hospitals',
      'Quick claim settlement process',
      'Innovative digital solutions',
      'Strong financial stability'
    ],
    recentNews: [
      { title: 'Launched AI-powered claim processing', date: '2 weeks ago', type: 'success' },
      { title: 'Partnership with 500+ new hospitals', date: '1 month ago', type: 'info' },
      { title: 'Award for Best Health Insurance Provider', date: '2 months ago', type: 'success' }
    ],
    performanceData: [
      { year: '2020', profit: 890, premium: 9800, claims: 75.2 },
      { year: '2021', profit: 1020, premium: 10500, claims: 74.8 },
      { year: '2022', profit: 1110, premium: 11200, claims: 73.5 },
      { year: '2023', profit: 1245, premium: 12450, claims: 72.5 }
    ]
  },
  {
    id: 'hdfc',
    name: 'HDFC ERGO',
    logo: '🏛️',
    rating: 4.6,
    established: '2002',
    marketShare: '9.5%',
    claimSettlementRatio: 96.2,
    solvencyRatio: 2.45,
    networkHospitals: 12000,
    activePolicies: 1500000,
    overview: 'HDFC ERGO Health Insurance is known for its customer-centric approach and comprehensive coverage options, backed by strong financial credentials and a wide service network.',
    financialMetrics: {
      profitAfterTax: { value: 1580, change: 18.3, trend: 'up' },
      totalPremium: { value: 15200, change: 16.8, trend: 'up' },
      claimsRatio: { value: 70.2, change: -3.2, trend: 'down' },
      expenseRatio: { value: 25.5, change: -2.0, trend: 'down' }
    },
    strengths: [
      'Highest claim settlement ratio',
      'Excellent customer service',
      'Comprehensive policy coverage',
      'Digital-first approach'
    ],
    recentNews: [
      { title: 'Expanded telemedicine services', date: '1 week ago', type: 'info' },
      { title: 'Record claim settlement ratio achieved', date: '3 weeks ago', type: 'success' },
      { title: 'New wellness program launched', date: '1 month ago', type: 'info' }
    ],
    performanceData: [
      { year: '2020', profit: 1150, premium: 11800, claims: 73.5 },
      { year: '2021', profit: 1280, premium: 13000, claims: 72.1 },
      { year: '2022', profit: 1420, premium: 14200, claims: 71.0 },
      { year: '2023', profit: 1580, premium: 15200, claims: 70.2 }
    ]
  },
  {
    id: 'star',
    name: 'Star Health Insurance',
    logo: '⭐',
    rating: 4.4,
    established: '2006',
    marketShare: '7.8%',
    claimSettlementRatio: 92.5,
    solvencyRatio: 2.18,
    networkHospitals: 9500,
    activePolicies: 950000,
    overview: 'Star Health Insurance is India\'s first standalone health insurance company, specializing exclusively in health insurance with a strong focus on preventive healthcare.',
    financialMetrics: {
      profitAfterTax: { value: 980, change: 10.8, trend: 'up' },
      totalPremium: { value: 10800, change: 12.5, trend: 'up' },
      claimsRatio: { value: 74.8, change: -1.8, trend: 'down' },
      expenseRatio: { value: 27.2, change: -0.8, trend: 'down' }
    },
    strengths: [
      'Specialized health insurance focus',
      'Comprehensive preventive care',
      'Wide policy portfolio',
      'Strong regional presence'
    ],
    recentNews: [
      { title: 'IPO successfully launched', date: '2 weeks ago', type: 'success' },
      { title: 'Introduced family floater plans', date: '3 weeks ago', type: 'info' },
      { title: 'Expanded to tier-3 cities', date: '1 month ago', type: 'info' }
    ],
    performanceData: [
      { year: '2020', profit: 750, premium: 8500, claims: 76.5 },
      { year: '2021', profit: 850, premium: 9200, claims: 75.8 },
      { year: '2022', profit: 920, premium: 10000, claims: 75.2 },
      { year: '2023', profit: 980, premium: 10800, claims: 74.8 }
    ]
  },
  {
    id: 'care',
    name: 'Care Health Insurance',
    logo: '💚',
    rating: 4.3,
    established: '2012',
    marketShare: '6.5%',
    claimSettlementRatio: 91.8,
    solvencyRatio: 2.05,
    networkHospitals: 8500,
    activePolicies: 850000,
    overview: 'Care Health Insurance provides innovative health insurance solutions with a focus on affordability and accessibility, making quality healthcare coverage available to all segments.',
    financialMetrics: {
      profitAfterTax: { value: 720, change: 14.2, trend: 'up' },
      totalPremium: { value: 8900, change: 13.8, trend: 'up' },
      claimsRatio: { value: 76.2, change: -2.5, trend: 'down' },
      expenseRatio: { value: 28.5, change: -1.2, trend: 'down' }
    },
    strengths: [
      'Affordable premium options',
      'Innovative product offerings',
      'Strong digital presence',
      'Customer-friendly policies'
    ],
    recentNews: [
      { title: 'Launched mobile health screening', date: '1 week ago', type: 'info' },
      { title: 'Partnership with fitness apps', date: '2 weeks ago', type: 'success' },
      { title: 'New senior citizen plans', date: '3 weeks ago', type: 'info' }
    ],
    performanceData: [
      { year: '2020', profit: 520, premium: 7000, claims: 78.5 },
      { year: '2021', profit: 610, premium: 7800, claims: 77.8 },
      { year: '2022', profit: 680, premium: 8400, claims: 77.0 },
      { year: '2023', profit: 720, premium: 8900, claims: 76.2 }
    ]
  },
  {
    id: 'niva',
    name: 'Niva Bupa',
    logo: '🔵',
    rating: 4.5,
    established: '2008',
    marketShare: '7.2%',
    claimSettlementRatio: 95.5,
    solvencyRatio: 2.38,
    networkHospitals: 11000,
    activePolicies: 1100000,
    overview: 'Niva Bupa Health Insurance offers comprehensive health insurance solutions with international standards, backed by Bupa\'s global healthcare expertise.',
    financialMetrics: {
      profitAfterTax: { value: 1120, change: 16.5, trend: 'up' },
      totalPremium: { value: 11500, change: 14.8, trend: 'up' },
      claimsRatio: { value: 71.8, change: -2.8, trend: 'down' },
      expenseRatio: { value: 26.2, change: -1.8, trend: 'down' }
    },
    strengths: [
      'International quality standards',
      'Excellent claim settlement',
      'Comprehensive wellness programs',
      'Premium service quality'
    ],
    recentNews: [
      { title: 'Enhanced global coverage options', date: '1 week ago', type: 'success' },
      { title: 'Digital health records integration', date: '2 weeks ago', type: 'info' },
      { title: 'Award for innovation in health tech', date: '1 month ago', type: 'success' }
    ],
    performanceData: [
      { year: '2020', profit: 820, premium: 9000, claims: 74.2 },
      { year: '2021', profit: 940, premium: 9800, claims: 73.5 },
      { year: '2022', profit: 1050, premium: 10800, claims: 72.5 },
      { year: '2023', profit: 1120, premium: 11500, claims: 71.8 }
    ]
  }
];

export function CompanyAnalysis({ onOpenMenu}: CompanyAnalysisProps) {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'performance'>('overview');
  const [compareMode, setCompareMode] = useState(false);

  const handleCompanyChange = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) setSelectedCompany(company);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      <div className="lg:hidden glass-card border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Company Analysis</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-gray-900 mb-2 flex items-center space-x-3">
                <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span>Insurance Company Analysis</span>
              </h1>
              <p className="text-gray-600">
                Comprehensive financial analysis and performance metrics of leading health insurers
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={18} className="text-gray-600" />
                <span className="text-sm text-gray-700">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 size={18} className="text-gray-600" />
                <span className="text-sm text-gray-700">Share</span>
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Select Insurance Company
              </label>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  compareMode 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter size={16} />
                <span className="text-sm">Compare Mode</span>
              </button>
            </div>
            <div className="relative">
              <select
                value={selectedCompany.id}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white appearance-none cursor-pointer text-gray-900 font-medium"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.logo} {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden shadow-lg mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
                  {selectedCompany.logo}
                </div>
                <div>
                  <h2 className="text-white mb-2">{selectedCompany.name}</h2>
                  <div className="flex items-center space-x-4 text-orange-100">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="fill-white text-white" />
                      <span className="text-sm font-medium">{selectedCompany.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span className="text-sm">Est. {selectedCompany.established}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <PieChart size={16} />
                      <span className="text-sm">Market Share: {selectedCompany.marketShare}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Award size={18} />
                  <span className="text-sm font-medium">IRDAI Approved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 p-8 bg-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {selectedCompany.claimSettlementRatio}%
              </div>
              <div className="text-xs text-gray-600">Claim Settlement</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield size={24} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {selectedCompany.solvencyRatio}
              </div>
              <div className="text-xs text-gray-600">Solvency Ratio</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building2 size={24} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {(selectedCompany.networkHospitals / 1000).toFixed(0)}K+
              </div>
              <div className="text-xs text-gray-600">Network Hospitals</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {(selectedCompany.activePolicies / 1000000).toFixed(1)}M+
              </div>
              <div className="text-xs text-gray-600">Active Policies</div>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'financial'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            Financial Metrics
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'performance'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            Performance History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 font-semibold">Company Overview</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedCompany.overview}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <CheckCircle size={18} className="text-green-600" />
                      <span>Key Strengths</span>
                    </h4>
                    <div className="space-y-3">
                      {selectedCompany.strengths.map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                        >
                          <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Activity size={18} className="text-orange-600" />
                      <span>Recent Updates</span>
                    </h4>
                    <div className="space-y-3">
                      {selectedCompany.recentNews.map((news, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg ${
                            news.type === 'success' ? 'bg-blue-50' : 'bg-orange-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-900 font-medium">{news.title}</p>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {news.date}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'financial' && (
            <motion.div
              key="financial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Profit After Tax</h4>
                        <p className="text-xs text-gray-600">In Crores (₹)</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      selectedCompany.financialMetrics.profitAfterTax.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCompany.financialMetrics.profitAfterTax.trend === 'up' ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      <span className="text-sm font-medium">
                        {selectedCompany.financialMetrics.profitAfterTax.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{selectedCompany.financialMetrics.profitAfterTax.value} Cr
                  </div>
                  <div className="text-sm text-gray-600">
                    Year-over-year growth showing strong financial performance
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Total Premium</h4>
                        <p className="text-xs text-gray-600">In Crores (₹)</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      selectedCompany.financialMetrics.totalPremium.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCompany.financialMetrics.totalPremium.trend === 'up' ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      <span className="text-sm font-medium">
                        {selectedCompany.financialMetrics.totalPremium.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{selectedCompany.financialMetrics.totalPremium.value} Cr
                  </div>
                  <div className="text-sm text-gray-600">
                    Consistent premium collection indicating market confidence
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Percent size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Claims Ratio</h4>
                        <p className="text-xs text-gray-600">Percentage (%)</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      selectedCompany.financialMetrics.claimsRatio.trend === 'down'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCompany.financialMetrics.claimsRatio.trend === 'down' ? (
                        <ArrowDownRight size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(selectedCompany.financialMetrics.claimsRatio.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCompany.financialMetrics.claimsRatio.value}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Lower ratio indicates better claim management efficiency
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Expense Ratio</h4>
                        <p className="text-xs text-gray-600">Percentage (%)</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      selectedCompany.financialMetrics.expenseRatio.trend === 'down'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCompany.financialMetrics.expenseRatio.trend === 'down' ? (
                        <ArrowDownRight size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(selectedCompany.financialMetrics.expenseRatio.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCompany.financialMetrics.expenseRatio.value}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Optimized operational expenses for better profitability
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Profit After Tax Trend</h3>
                      <p className="text-xs text-gray-600">4-Year Performance (in Crores ₹)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp size={18} />
                      <span className="text-sm font-medium">Growing</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ width: '100%', height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedCompany.performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#666"
                        style={{ fontSize: '14px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis 
                        stroke="#666"
                        style={{ fontSize: '12px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          fontFamily: 'Poppins'
                        }}
                        formatter={(value: number) => [`₹${value} Cr`, 'Profit']}
                        labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Bar 
                        dataKey="profit" 
                        fill="url(#profitGradient)" 
                        radius={[8, 8, 0, 0]}
                        maxBarSize={80}
                      />
                      <defs>
                        <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                          <stop offset="100%" stopColor="#34d399" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Total Premium Collection</h3>
                      <p className="text-xs text-gray-600">4-Year Performance (in Crores ₹)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <TrendingUp size={18} />
                      <span className="text-sm font-medium">Increasing</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ width: '100%', height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedCompany.performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#666"
                        style={{ fontSize: '14px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis 
                        stroke="#666"
                        style={{ fontSize: '12px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          fontFamily: 'Poppins'
                        }}
                        formatter={(value: number) => [`₹${value} Cr`, 'Premium']}
                        labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Bar 
                        dataKey="premium" 
                        fill="url(#premiumGradient)" 
                        radius={[8, 8, 0, 0]}
                        maxBarSize={80}
                      />
                      <defs>
                        <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                          <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Percent size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Claims Ratio Trend</h3>
                      <p className="text-xs text-gray-600">4-Year Performance (Lower is Better)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingDown size={18} />
                      <span className="text-sm font-medium">Improving</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ width: '100%', height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedCompany.performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#666"
                        style={{ fontSize: '14px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis 
                        stroke="#666"
                        style={{ fontSize: '12px', fontFamily: 'Poppins' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickFormatter={(value) => `${value}%`}
                        domain={[65, 80]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          fontFamily: 'Poppins'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Claims Ratio']}
                        labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Bar 
                        dataKey="claims" 
                        fill="url(#claimsGradient)" 
                        radius={[8, 8, 0, 0]}
                        maxBarSize={80}
                      />
                      <defs>
                        <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF6F00" stopOpacity={1} />
                          <stop offset="100%" stopColor="#FFA726" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 shadow-soft bg-gradient-to-br from-green-50 to-blue-50">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle size={24} className="text-green-600" />
                  <h3 className="text-gray-900 font-semibold">Performance Summary</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Based on the 4-year analysis, {selectedCompany.name} demonstrates consistent growth across all key metrics. 
                  The company has shown a steady improvement in profitability with profit after tax growing from ₹
                  {selectedCompany.performanceData[0].profit} Cr to ₹{selectedCompany.performanceData[3].profit} Cr. 
                  The decreasing claims ratio from {selectedCompany.performanceData[0].claims}% to {selectedCompany.performanceData[3].claims}% 
                  indicates improved operational efficiency and better risk assessment.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
