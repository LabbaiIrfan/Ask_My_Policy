import { BarChart3, Download, Share2, Filter, ChevronDown } from 'lucide-react';
import type { Company } from '../../data/companyData';

interface CompanyHeaderProps {
    selectedCompany: Company;
    companies: Company[];
    onCompanyChange: (id: string) => void;
    compareMode: boolean;
    setCompareMode: (mode: boolean) => void;
}

export function CompanyHeader({
    selectedCompany,
    companies,
    onCompanyChange,
    compareMode,
    setCompareMode
}: CompanyHeaderProps) {
    return (
        <div className="mb-8">
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
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${compareMode
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
                        onChange={(e) => onCompanyChange(e.target.value)}
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
        </div>
    );
}
