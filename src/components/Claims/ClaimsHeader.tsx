import { motion } from 'motion/react';
import { CreditCard, FileText, Calculator, Users } from 'lucide-react';

interface ClaimsHeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export function ClaimsHeader({ activeSection, setActiveSection }: ClaimsHeaderProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.button
                onClick={() => setActiveSection('cashless')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 transition-all text-left ${activeSection === 'cashless'
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
            >
                <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeSection === 'cashless' ? 'bg-white/20' : 'bg-green-50'
                        }`}>
                        <CreditCard size={24} className={activeSection === 'cashless' ? 'text-white' : 'text-green-600'} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold mb-1">Cashless</h3>
                        <p className={`text-sm ${activeSection === 'cashless' ? 'text-white/80' : 'text-gray-600'}`}>
                            Find network hospitals
                        </p>
                    </div>
                </div>
            </motion.button>

            <motion.button
                onClick={() => setActiveSection('reimburse')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 transition-all text-left ${activeSection === 'reimburse'
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
            >
                <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeSection === 'reimburse' ? 'bg-white/20' : 'bg-blue-50'
                        }`}>
                        <FileText size={24} className={activeSection === 'reimburse' ? 'text-white' : 'text-blue-600'} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold mb-1">Reimburse</h3>
                        <p className={`text-sm ${activeSection === 'reimburse' ? 'text-white/80' : 'text-gray-600'}`}>
                            Claim procedure steps
                        </p>
                    </div>
                </div>
            </motion.button>

            <motion.button
                onClick={() => setActiveSection('copay')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 transition-all text-left ${activeSection === 'copay'
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
            >
                <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeSection === 'copay' ? 'bg-white/20' : 'bg-purple-50'
                        }`}>
                        <Calculator size={24} className={activeSection === 'copay' ? 'text-white' : 'text-purple-600'} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold mb-1">Co-pay</h3>
                        <p className={`text-sm ${activeSection === 'copay' ? 'text-white/80' : 'text-gray-600'}`}>
                            Understanding co-payment
                        </p>
                    </div>
                </div>
            </motion.button>

            <motion.button
                onClick={() => setActiveSection('expert')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 transition-all text-left ${activeSection === 'expert'
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
            >
                <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeSection === 'expert' ? 'bg-white/20' : 'bg-orange-50'
                        }`}>
                        <Users size={24} className={activeSection === 'expert' ? 'text-white' : 'text-orange-600'} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold mb-1">Connect to Expert</h3>
                        <p className={`text-sm ${activeSection === 'expert' ? 'text-white/80' : 'text-gray-600'}`}>
                            Get professional help
                        </p>
                    </div>
                </div>
            </motion.button>
        </div>
    );
}
