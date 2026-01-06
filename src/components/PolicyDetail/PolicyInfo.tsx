import { Shield, Building2, Star, CheckCircle } from 'lucide-react';
import type { PolicyData } from '../../data/policyDetailData';

interface PolicyInfoProps {
    policyData: PolicyData;
}

export function PolicyInfo({ policyData }: PolicyInfoProps) {
    return (
        <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
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
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100/30 shadow-sm">
                    <div className="text-center">
                        <div className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{policyData.coverAmount}</div>
                        <div className="text-sm text-gray-600">Sum Insured</div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100/30 shadow-sm">
                    <div className="text-center">
                        <div className="text-lg lg:text-xl font-bold text-green-600 mb-1">{policyData.discount}</div>
                        <div className="text-sm text-gray-600">Discount</div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100/30 shadow-sm">
                    <div className="text-center">
                        <div className="text-lg lg:text-xl font-bold text-blue-600 mb-1">12,000+</div>
                        <div className="text-sm text-gray-600">Hospitals</div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100/30 shadow-sm">
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
    );
}
