import { motion } from 'motion/react';
import { Shield, CheckCircle } from 'lucide-react';

export function LoginBanner() {
    const benefits = [
        'AI-powered insurance recommendations',
        'Compare policies from 50+ providers',
        'Smart claims management',
        'Personalized coverage insights',
        '24/7 expert support'
    ];

    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Ask My Policy Pro</h1>
                            <p className="text-orange-100">Smart Insurance Solutions</p>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Your Perfect Insurance Match Awaits
                    </h2>
                    <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                        Join thousands of smart consumers who trust our AI to find the best insurance coverage at unbeatable prices.
                    </p>
                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                className="flex items-center space-x-3"
                            >
                                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                                <span className="text-orange-100">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
