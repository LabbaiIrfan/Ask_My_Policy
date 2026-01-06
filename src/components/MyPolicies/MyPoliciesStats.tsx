import { Shield, Clock, CheckCircle, DollarSign } from 'lucide-react';

interface MyPoliciesStatsProps {
    activeCount: number;
    renewalCount: number;
    totalPremium: string;
    totalCoverage: string;
}

export function MyPoliciesStats({
    activeCount,
    renewalCount,
    totalPremium,
    totalCoverage
}: MyPoliciesStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                        <p className="text-sm text-gray-600">Active Policies</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                        <Clock className="text-red-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{renewalCount}</p>
                        <p className="text-sm text-gray-600">Due for Renewal</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <DollarSign className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{totalPremium}</p>
                        <p className="text-sm text-gray-600">Total Premium</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                        <Shield className="text-orange-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{totalCoverage}</p>
                        <p className="text-sm text-gray-600">Total Coverage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
