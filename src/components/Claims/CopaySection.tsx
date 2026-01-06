import { Calculator, CheckCircle } from 'lucide-react';

export function CopaySection() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                        <Calculator size={24} className="text-purple-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">Understanding Co-payment</h2>
                        <p className="text-gray-600">Learn how co-payment works and how it affects your claims</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">What is Co-payment?</h3>
                        <div className="space-y-4">
                            <div className="bg-purple-50 rounded-lg p-4">
                                <p className="text-purple-900 font-medium mb-2">Definition</p>
                                <p className="text-purple-800 text-sm">
                                    Co-payment is a fixed percentage of medical expenses that you need to pay from your own pocket,
                                    even when the claim is approved by your insurance company.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-purple-600 font-bold text-xs">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Percentage Based</p>
                                        <p className="text-sm text-gray-600">Usually ranges from 10% to 30% of claim amount</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-purple-600 font-bold text-xs">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Age Factor</p>
                                        <p className="text-sm text-gray-600">Higher co-pay for senior citizens (usually 60+ years)</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-purple-600 font-bold text-xs">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Treatment Type</p>
                                        <p className="text-sm text-gray-600">May vary for different treatments or pre-existing conditions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Co-payment Example</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <div className="text-center">
                                <div className="bg-purple-600 text-white rounded-lg p-4 mb-4">
                                    <p className="text-purple-100 text-sm">Total Medical Bill</p>
                                    <p className="font-bold">₹1,00,000</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-50 rounded-lg p-3 text-center">
                                    <p className="text-orange-700 text-sm font-medium">Co-payment (20%)</p>
                                    <p className="font-bold text-orange-800">₹20,000</p>
                                    <p className="text-xs text-orange-600">You pay</p>
                                </div>

                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                    <p className="text-green-700 text-sm font-medium">Insurance Covers</p>
                                    <p className="font-bold text-green-800">₹80,000</p>
                                    <p className="text-xs text-green-600">Company pays</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <h4 className="font-medium text-gray-900">Benefits of Co-payment</h4>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span className="text-sm text-gray-700">Lower premium costs</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span className="text-sm text-gray-700">Prevents unnecessary claims</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span className="text-sm text-gray-700">Shared responsibility model</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
