import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Percent, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Company } from '../../data/companyData';

interface CompanyFinancialsProps {
    selectedCompany: Company;
}

export function CompanyFinancials({ selectedCompany }: CompanyFinancialsProps) {
    return (
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
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${selectedCompany.financialMetrics.profitAfterTax.trend === 'up'
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
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${selectedCompany.financialMetrics.totalPremium.trend === 'up'
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
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${selectedCompany.financialMetrics.claimsRatio.trend === 'down'
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
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${selectedCompany.financialMetrics.expenseRatio.trend === 'down'
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
    );
}
