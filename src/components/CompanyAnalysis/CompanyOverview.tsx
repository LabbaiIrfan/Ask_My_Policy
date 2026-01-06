import { motion } from 'motion/react';
import { Info, CheckCircle, Activity } from 'lucide-react';
import type { Company } from '../../data/companyData';

interface CompanyOverviewProps {
    selectedCompany: Company;
}

export function CompanyOverview({ selectedCompany }: CompanyOverviewProps) {
    return (
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
                                    className={`p-3 rounded-lg ${news.type === 'success' ? 'bg-blue-50' : 'bg-orange-50'
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
    );
}
