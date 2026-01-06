import { motion } from 'motion/react';
import { Zap, CheckCircle } from 'lucide-react';

interface AiRecommendationProps {
    aiAnalysis: string | null;
}

export function AiRecommendation({ aiAnalysis }: AiRecommendationProps) {
    if (!aiAnalysis) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
        >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white mb-3 text-lg">AI Recommendation</h3>
                        <div className="space-y-2">
                            {aiAnalysis.split('\n').filter(line => line.trim() !== '').map((point, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <CheckCircle size={18} className="text-green-300 mt-0.5 flex-shrink-0" />
                                    <p className="text-white/90">
                                        {point.replace(/^- /, '')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
