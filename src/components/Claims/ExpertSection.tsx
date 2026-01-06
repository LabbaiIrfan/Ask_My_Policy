import { motion } from 'motion/react';
import { Users, Phone, MessageCircle, Calendar, CheckCircle, Clock } from 'lucide-react';

export function ExpertSection() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8 text-white">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users size={32} className="text-white" />
                    </div>
                    <h2 className="font-bold text-white mb-2">Connect with Claim Experts</h2>
                    <p className="text-orange-100">Get professional assistance for your health insurance claims</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                    >
                        <Phone size={32} className="text-white mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-2">Call Expert</h3>
                        <p className="text-orange-100 text-sm mb-3">Immediate phone support</p>
                        <p className="text-white font-medium">1800-XXX-XXXX</p>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                    >
                        <MessageCircle size={32} className="text-white mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-2">Live Chat</h3>
                        <p className="text-orange-100 text-sm mb-3">Chat with claim specialist</p>
                        <p className="text-white font-medium">Available 24/7</p>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 hover:bg-white/30 rounded-xl p-6 transition-all text-center"
                    >
                        <Calendar size={32} className="text-white mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-2">Schedule Call</h3>
                        <p className="text-orange-100 text-sm mb-3">Book expert consultation</p>
                        <p className="text-white font-medium">Choose your time</p>
                    </motion.button>
                </div>
            </div>

            {/* Expert Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">What Our Experts Help With</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="text-gray-700">Claim form filling assistance</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="text-gray-700">Document verification guidance</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="text-gray-700">Claim status tracking</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="text-gray-700">Appeal process support</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="text-gray-700">Policy coverage clarification</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Expert Availability</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Clock size={20} className="text-blue-500" />
                            <div>
                                <p className="font-medium text-gray-900">Monday - Friday</p>
                                <p className="text-sm text-gray-600">9:00 AM - 8:00 PM</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Clock size={20} className="text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Saturday - Sunday</p>
                                <p className="text-sm text-gray-600">10:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 mt-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-700 font-medium text-sm">Emergency claims: 24/7 support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
