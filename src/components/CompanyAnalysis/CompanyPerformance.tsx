import { motion } from 'motion/react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Company } from '../../data/companyData';

interface CompanyPerformanceProps {
    selectedCompany: Company;
}

export function CompanyPerformance({ selectedCompany }: CompanyPerformanceProps) {
    return (
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
        </motion.div>
    );
}
