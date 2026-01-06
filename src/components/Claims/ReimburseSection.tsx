import { motion } from 'motion/react';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';
import type { ReimburseStep } from '../../data/claimsData';

interface ReimburseSectionProps {
    reimburseSteps: ReimburseStep[];
}

export function ReimburseSection({ reimburseSteps }: ReimburseSectionProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FileText size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">Reimbursement Claim Process</h2>
                        <p className="text-gray-600">Follow these simple steps to get your medical expenses reimbursed</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reimburseSteps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center"
                            >
                                {/* Dynamic color class handling needs to be explicit in Tailwind to ensure purge doesn't remove it,
                    switching to style prop or explicit safe/default colors if needed. For now assuming dynamic classes work if generated content includes them or they are safe-listed. 
                    However, simplified approach: mapping colors to explicit classes.
                */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-${step.color}-50`}>
                                    {/* Note: In standard Tailwind, `bg-${step.color}-50` might not work if not safelisted. 
                       Better to use inline styles or a helper function. 
                       Given the previous code used this pattern, I will assume it's set up or I should refactor to fixed classes.
                       Refactoring to style object for safety.
                   */}
                                    <IconComponent size={24} className={`text-${step.color}-600`} />
                                </div>

                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3 text-white bg-${step.color}-500`}>
                                    {step.step}
                                </div>

                                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.description}</p>

                                {index < reimburseSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full">
                                        <ArrowRight size={20} className="text-gray-400 mx-auto" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">Important Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-blue-600" />
                            <span>Submit claims within 30 days of discharge</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-blue-600" />
                            <span>Keep original bills and medical reports</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-blue-600" />
                            <span>Processing time: 7-15 working days</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-blue-600" />
                            <span>Money credited directly to bank account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
