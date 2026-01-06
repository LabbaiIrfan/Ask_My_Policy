import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface BranchMapProps {
    mapEmbedUrl: string;
}

export function BranchMap({ mapEmbedUrl }: BranchMapProps) {
    return (
        <div className="hidden lg:block lg:sticky lg:top-6">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl h-[calc(100vh-48px)] shadow-soft overflow-hidden"
            >
                <div className="p-4 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-900">Branch Map</h2>
                </div>

                <div className="relative h-full">
                    {mapEmbedUrl ? (
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={mapEmbedUrl}
                        ></iframe>
                    ) : (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Interactive Map</h3>
                                <p className="text-gray-600">Select a branch to view its location on the map.</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
