import { motion } from 'motion/react';
import { Star, Calendar, PieChart, Award, CheckCircle, Shield, Building2, Users } from 'lucide-react';
import type { Company } from '../../data/companyData';

interface CompanyHeroProps {
    selectedCompany: Company;
}

export function CompanyHero({ selectedCompany }: CompanyHeroProps) {
    return (
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
    );
}
