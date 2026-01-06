import { motion } from 'motion/react';
import { Sparkles, Check, Lightbulb } from 'lucide-react';

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
            className="mb-12"
        >
            <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-1 shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3" />

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-[22px] p-6 md:p-8 border border-white/10 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-6 md:space-y-0">
                        {/* Icon / Brand */}
                        <div className="flex-shrink-0 flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <div className="text-left md:text-center">
                                <div className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-0.5">Expert</div>
                                <div className="text-white font-bold text-2xl md:text-xl leading-none font-poppins">Insight</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Looking for the clear winner?</h3>
                                <p className="text-gray-400 text-sm md:text-base">
                                    Our AI has analyzed the fine print to help you make an informed decision.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {aiAnalysis.split('\n').filter(line => line.trim() !== '').map((point, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + i * 0.1 }}
                                        className="flex items-start space-x-4 group"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                                            <Check size={14} className="text-green-400" strokeWidth={3} />
                                        </div>
                                        <p className="text-gray-300 md:text-lg leading-relaxed font-light">
                                            {point.replace(/^- /, '')}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-xs text-gray-500 font-medium uppercase tracking-wider">
                                <Lightbulb size={14} className="mr-2 text-yellow-500" />
                                <span>Powered by Ask My Policy Intelligence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
