import { motion } from 'motion/react';
import { Quote, Star, User, Verified, ThumbsUp, ArrowRight } from 'lucide-react';
import type { Testimonial } from '../../data/policyDetailData';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    averageRating: number;
    totalReviews: number;
}

export function TestimonialsSection({ testimonials, averageRating, totalReviews }: TestimonialsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-orange-100/50"
        >
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Customer Testimonials</h2>
                <Quote className="w-5 h-5 text-gray-400" />
            </div>

            <div className="mb-6">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
                        <span className="text-gray-600">out of 5</span>
                    </div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-600">Based on {totalReviews.toLocaleString()} reviews</span>
                </div>
                <p className="text-gray-600 text-sm">
                    Real experiences from verified policyholders who have used this plan
                </p>
            </div>

            <div className="space-y-6 mb-6">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:border-orange-200 transition-all duration-300 shadow-sm"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-sm text-gray-600">{testimonial.age} years</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-sm text-gray-600">{testimonial.city}</span>
                                            {testimonial.verified && (
                                                <>
                                                    <span className="text-gray-500">•</span>
                                                    <div className="flex items-center space-x-1">
                                                        <Verified className="w-4 h-4 text-green-500" />
                                                        <span className="text-xs text-green-600 font-medium">Verified</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>Claim: {testimonial.claimAmount}</span>
                                            <span>•</span>
                                            <span>Stay: {testimonial.hospitalStay}</span>
                                            <span>•</span>
                                            <span>{testimonial.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1 flex-shrink-0">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.review}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-orange-500 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                            <span>Helpful ({testimonial.helpful})</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                                            Claim Approved
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1 mx-auto">
                    <span>Read all {testimonials.length} reviews</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
