import { useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Manage the progress bar visual
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment logic to roughly match the 3.5s total time
        return prev + 2; 
      });
    }, 60);

    // 2. Trigger completion
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Animation Variants for cleaner code organization
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 0.8 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      },
    },
  };

  return (
    <div className="fixed inset-0 gradient-orange-vertical flex flex-col items-center justify-center z-50 overflow-hidden font-sans">
      
      {/* --- Ambient Background Elements --- */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
          rotate: [0, 90, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-300/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* --- Main Content --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 flex flex-col items-center space-y-10"
      >
        {/* Logo Section */}
        <div className="relative">
          {/* Ripple Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-white/20 rounded-3xl -z-10"
          />

          <motion.div 
            variants={itemVariants}
            className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-900/20"
          >
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              {/* 1. Base Fill (Fades in softly) */}
              <motion.path 
                d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.84C10.59 22.05 11.41 22.05 12.09 21.84C15.16 20.74 19 16.55 19 12V7L12 2Z" 
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 1, duration: 1 }}
              />
              
              {/* 2. Shield Outline (Draws itself) */}
              <motion.path 
                d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.84C10.59 22.05 11.41 22.05 12.09 21.84C15.16 20.74 19 16.55 19 12V7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                variants={pathVariants}
              />
              
              {/* 3. Checkmark (Draws itself after delay) */}
              <motion.path 
                d="M9 12L11 14L15 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                variants={pathVariants}
                custom={1} // You can use this for custom delays if needed
              />
            </svg>
          </motion.div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-2">
          <motion.h1 
            variants={itemVariants}
            className="text-white text-2xl font-bold tracking-tight drop-shadow-md"
          >
            Ask My Policy
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-white/80 text-sm font-medium tracking-wide"
          >
            Smart Insurance Solutions
          </motion.p>
        </div>

        {/* Progress Bar Section */}
        <motion.div 
          variants={itemVariants}
          className="w-48 h-1.5 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm"
        >
          <motion.div 
            className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }} // Smooth updates
          />
        </motion.div>

      </motion.div>
    </div>
  );
}