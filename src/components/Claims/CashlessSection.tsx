import { motion } from 'motion/react';
import { CreditCard, MapPin, Building2, Star, Navigation } from 'lucide-react';
import type { City, Hospital } from '../../data/claimsData';

interface CashlessSectionProps {
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    showHospitals: boolean;
    setShowHospitals: (show: boolean) => void;
    cities: City[];
    hospitalsByCity: { [key: string]: Hospital[] };
}

export function CashlessSection({
    selectedCity,
    setSelectedCity,
    showHospitals,
    setShowHospitals,
    cities,
    hospitalsByCity
}: CashlessSectionProps) {
    const handleCitySelect = (cityId: string) => {
        setSelectedCity(cityId);
        setShowHospitals(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <CreditCard size={24} className="text-green-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">Find Cashless Hospitals</h2>
                        <p className="text-gray-600">Select your city to find network hospitals for cashless treatment</p>
                    </div>
                </div>

                {!showHospitals ? (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Select Your City</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cities.map((city, index) => (
                                <motion.button
                                    key={city.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleCitySelect(city.id)}
                                    className="p-4 bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/50 rounded-lg transition-all text-left"
                                >
                                    <div className="flex items-center space-x-3">
                                        <MapPin size={20} className="text-gray-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">{city.name}</p>
                                            <p className="text-sm text-gray-600">{city.state}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">
                                Popular Hospitals in {cities.find(c => c.id === selectedCity)?.name}
                            </h3>
                            <button
                                onClick={() => setShowHospitals(false)}
                                className="text-primary hover:text-primary/80 font-medium text-sm"
                            >
                                Change City
                            </button>
                        </div>

                        <div className="space-y-4">
                            {hospitalsByCity[selectedCity]?.map((hospital, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <Building2 size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{hospital.name}</h4>
                                                <p className="text-sm text-gray-600">{hospital.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star size={16} className="text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-900">{hospital.rating}</span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex items-start space-x-2">
                                            <MapPin size={16} className="text-gray-400 mt-0.5" />
                                            <p className="text-sm text-gray-600">{hospital.address}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Navigation size={16} className="text-gray-400" />
                                            <span className="text-sm text-gray-600">{hospital.distance} away</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {hospital.features.map((feature, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
