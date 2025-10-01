import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTagline(true), 1000);
    const timer2 = setTimeout(() => onComplete(), 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 gradient-orange-vertical flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 2.5, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative"
        >
          <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-lg">
            {/* Insurance Shield Icon */}
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path 
                d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.84C10.59 22.05 11.41 22.05 12.09 21.84C15.16 20.74 19 16.55 19 12V7L12 2Z" 
                fill="currentColor"
                opacity="0.2"
              />
              <path 
                d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.84C10.59 22.05 11.41 22.05 12.09 21.84C15.16 20.74 19 16.55 19 12V7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M9 12L11 14L15 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showTagline ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-white text-lg font-semibold tracking-wide drop-shadow-sm">
            Ask My Policy
          </h1>
        </motion.div>
      </div>
    </div>
  );
}