import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  CheckCircle2, 
  Gift, 
  Percent, 
  Bed, 
  Clock, 
  RefreshCw, 
  Award, 
  Home,
  Menu,
  ArrowRight,
  X,
} from 'lucide-react';

interface GlossaryScreenProps {
  onOpenMenu: () => void;
  onToggleSidebar: () => void;
}

const terms = [
  {
    id: 'icr',
    term: 'Incurred Claim Ratio (ICR)',
    icon: TrendingUp,
    category: 'Financial Metrics',
    definition: 'A key metric that indicates the financial health and efficiency of an insurance company.',
    explanation: 'It is the ratio of the total value of claims settled by the insurer to the total premium collected in a financial year. A healthy ICR, typically between 70% and 90%, suggests that the company is effectively settling claims and has a sustainable business model. An ICR above 100% means the company is paying out more in claims than it\'s earning in premiums, which is not a good sign for long-term stability.',
    example: 'If an insurer collects ₹100 crores in premiums and pays ₹80 crores in claims, the ICR is 80% - a healthy ratio.',
    importance: 'High'
  },
  {
    id: 'solvency',
    term: 'Solvency Ratio',
    icon: Shield,
    category: 'Financial Metrics',
    definition: 'A measure of a company\'s ability to meet its long-term financial obligations.',
    explanation: 'For an insurance company, it specifically measures if it has enough assets to cover its liabilities, including potential claims from policyholders. A higher solvency ratio indicates that the insurer is financially strong and less likely to default on its commitments. The Insurance Regulatory and Development Authority of India (IRDAI) mandates a minimum solvency ratio to ensure the financial stability of insurance providers.',
    example: 'If an insurer has assets worth ₹150 crores against liabilities of ₹100 crores, the solvency ratio is 1.5 or 150%.',
    importance: 'High'
  },
  {
    id: 'regulatory',
    term: 'Regulatory Compliance Check',
    icon: CheckCircle2,
    category: 'Regulatory',
    definition: 'The process of an insurance company adhering to all laws, regulations, and guidelines.',
    explanation: 'This refers to the process of an insurance company adhering to all the laws, regulations, and guidelines set by government and regulatory bodies like the IRDAI. This is crucial for maintaining public trust, preventing legal penalties, and ensuring fair and ethical business practices.',
    example: 'Regular audits, transparent claim processes, and adherence to IRDAI guidelines for policy features.',
    importance: 'High'
  },
  {
    id: 'ncb',
    term: 'No Claim Bonus (NCB)',
    icon: Gift,
    category: 'Policy Benefits',
    definition: 'A reward given to policyholders for not making any claims during a policy year.',
    explanation: 'This is a reward, usually in the form of a discount on the premium, given to a policyholder for not making any claims during a policy year. NCB is common in motor insurance and can accumulate over consecutive claim-free years, significantly reducing the renewal premium. The bonus is typically transferable to a new vehicle or to a new insurance provider.',
    example: 'A 20% discount on next year\'s premium for not filing any claims this year.',
    importance: 'Medium'
  },
  {
    id: 'sublimit',
    term: 'Sublimit',
    icon: Percent,
    category: 'Policy Limitations',
    definition: 'A cap or restriction on the amount of coverage for a specific type of expense within a policy.',
    explanation: 'A sublimit is a cap or a restriction on the amount of coverage for a specific type of expense within a policy. For example, a health insurance policy may have a total sum insured of ₹10 lakh, but a sublimit of ₹50,000 for a particular treatment like a cataract surgery. Even if the total claim is within the overall sum insured, the insurer will only pay up to the sublimit for that specific procedure.',
    example: '₹10 lakh policy with ₹50,000 sublimit for eye treatments means only ₹50,000 is covered for eye-related procedures.',
    importance: 'High'
  },
  {
    id: 'copay',
    term: 'Co-pay',
    icon: Percent,
    category: 'Cost Sharing',
    definition: 'The portion of the medical bill that the policyholder must pay out of their own pocket.',
    explanation: 'This is the portion of the medical bill that the policyholder is required to pay out of their own pocket for a covered service. It is a form of cost-sharing between the insurer and the insured. For example, a policy with a 10% co-pay on a ₹1 lakh hospital bill means the policyholder pays ₹10,000, and the insurer covers the remaining ₹90,000.',
    example: 'With 10% co-pay on a ₹1 lakh bill: You pay ₹10,000, insurer pays ₹90,000.',
    importance: 'High'
  },
  {
    id: 'roomrent',
    term: 'Room Rent Limit',
    icon: Bed,
    category: 'Policy Limitations',
    definition: 'The maximum daily amount an insurer will cover for a hospital room during a patient\'s stay.',
    explanation: 'This is the maximum daily amount an insurer will cover for a hospital room during a patient\'s stay. This limit can be a fixed amount or a percentage of the total sum insured. If the policyholder chooses a room that costs more than this limit, the insurer may apply a proportionate deduction not only on the room rent but also on other associated medical expenses, leading to a higher out-of-pocket cost for the policyholder.',
    example: 'Room rent limit of ₹5,000/day. If you choose a ₹10,000/day room, you may face proportionate deductions on all medical expenses.',
    importance: 'High'
  },
  {
    id: 'waiting',
    term: 'Waiting Period',
    icon: Clock,
    category: 'Policy Terms',
    definition: 'A pre-defined period that must pass after purchasing a policy before certain benefits become active.',
    explanation: 'This is a pre-defined period of time that must pass after purchasing a policy before certain benefits become active. Common waiting periods include: Initial Waiting Period (30 days for illnesses), Specific Disease Waiting Period (1-2 years for pre-existing conditions), and Maternity Waiting Period (9 months to 4 years for maternity benefits).',
    example: '30-day initial waiting period means no illness claims in first 30 days; 2-year waiting for diabetes coverage.',
    importance: 'Medium'
  },
  {
    id: 'restoration',
    term: 'Restoration Period',
    icon: RefreshCw,
    category: 'Policy Benefits',
    definition: 'A feature that automatically reinstates the full sum insured once it has been exhausted.',
    explanation: 'Also known as the "restoration benefit," this is a feature in a health insurance policy that automatically reinstates the full sum insured once it has been exhausted during a policy year. This is a valuable feature, especially in a family floater plan where a single major claim could use up the entire sum insured for the family. The restored amount can be used for subsequent, unrelated hospitalizations within the same policy year.',
    example: '₹5 lakh policy exhausted in first claim gets restored to full ₹5 lakh for subsequent unrelated claims in same year.',
    importance: 'Medium'
  },
  {
    id: 'loyalty',
    term: 'Loyalty Bonus',
    icon: Award,
    category: 'Policy Benefits',
    definition: 'Additional rewards for policyholders who stay with the same insurer for a long duration.',
    explanation: 'This is an additional reward or benefit that an insurance company provides to policyholders who stay with them for a long duration. These bonuses can be in the form of extra coverage or a financial addition to the policy\'s value, and are designed to encourage long-term customer loyalty and retention.',
    example: '10% increase in sum insured after 3 consecutive years, or additional ₹1 lakh coverage for 5+ years of loyalty.',
    importance: 'Low'
  },
  {
    id: 'domiciliary',
    term: 'Domiciliary Hospitalization',
    icon: Home,
    category: 'Coverage Types',
    definition: 'Medical treatment received at home that is covered by health insurance.',
    explanation: 'This is a provision in a health insurance policy that covers medical treatment received at home. This benefit is typically applicable when the patient\'s condition is severe enough to require hospitalization but they are unable to be admitted to a hospital due to a lack of beds, or a doctor advises treatment at home due to the patient\'s condition or for other medical reasons.',
    example: 'Home treatment for pneumonia when hospital beds are unavailable, or post-surgery care at home as advised by doctor.',
    importance: 'Medium'
  }
];

export function GlossaryScreen({ onOpenMenu }: GlossaryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(terms.map(term => term.category)))];
  
  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImportanceColor = (importance: string) => {
    if (importance === 'High') return 'text-red-600 bg-red-50';
    if (importance === 'Medium') return 'text-yellow-600 bg-yellow-50';
    if (importance === 'Low') return 'text-green-600 bg-green-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden glass-card border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Insurance Glossary</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-orange rounded-2xl mb-6 shadow-premium">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1>Insurance Glossary</h1>
          <p className="max-w-3xl mx-auto">
            Understanding insurance terminology made simple. Explore key terms and concepts 
            to make informed decisions about your health insurance coverage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-8 shadow-soft"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search terms, definitions, or explanations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              />
            </div>

            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {searchTerm && (
            <div className="mt-4">
              Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6 hover:shadow-premium transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedTerm(term.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <term.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {term.term}
                      </h3>
                      <span className="text-xs text-gray-500">{term.category}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getImportanceColor(term.importance)}`}>
                    {term.importance}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {term.definition}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Click to learn more</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTerms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3>No terms found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedTerm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-premium"
            >
              {(() => {
                const term = terms.find(t => t.id === selectedTerm);
                if (!term) return null;
                
                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center">
                          <term.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2>{term.term}</h2>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-gray-500">{term.category}</span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getImportanceColor(term.importance)}`}>
                              {term.importance} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTerm(null)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <X className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3>Definition</h3>
                        <p className="text-gray-700">{term.definition}</p>
                      </div>

                      <div>
                        <h3>Detailed Explanation</h3>
                        <p className="text-gray-700 leading-relaxed">{term.explanation}</p>
                      </div>

                      <div>
                        <h3>Example</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-blue-800">{term.example}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setSelectedTerm(null)}
                          className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors"
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}