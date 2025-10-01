import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield,
  LogOut,
  X,
  ChevronLeft,
  AlertTriangle,
  User,
  Sparkles,
  GitCompare,
  Store
} from 'lucide-react';

interface ProfessionalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  currentScreen: string;
  isDesktop?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function ProfessionalSidebar({ 
  isOpen,
  onClose,
  onNavigate,
  onLogout,
  currentScreen,
  isDesktop = false,
  isCollapsed = false,
  onToggle
}: ProfessionalSidebarProps) {
  
  const menuItems = [
    { 
      icon: Store, 
      label: 'Policy Catalog', 
      screen: 'catalog',
      description: 'Browse policies'
    },
    { 
      icon: Shield, 
      label: 'My Policies', 
      screen: 'policies',
      description: 'Your active policies'
    },
    { 
      icon: Sparkles, 
      label: 'AI Recommendations', 
      screen: 'recommendations',
      description: 'Smart suggestions'
    },
    { 
      icon: GitCompare, 
      label: 'Compare Policies', 
      screen: 'compare',
      description: 'Policy comparison'
    },
    { 
      icon: AlertTriangle, 
      label: 'Claims', 
      screen: 'claims',
      description: 'Manage claims'
    },
    { 
      icon: User, 
      label: 'Profile', 
      screen: 'profile',
      description: 'Account settings'
    }
  ];

  const handleItemClick = (screen: string) => {
    onNavigate(screen);
    if (!isDesktop) {
      onClose();
    }
  };

  if (isDesktop) {
    return (
      <div className="relative">
        <motion.div 
          animate={{ width: isCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white border-r border-gray-200 flex flex-col h-full relative"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <motion.div 
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-bold text-gray-900">Ask My Policy</h2>
                      <p className="text-sm text-gray-500">Smart Insurance</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft size={18} className="text-gray-400" />
                </motion.div>
              </button>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.screen}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleItemClick(item.screen)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  currentScreen === item.screen 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`flex-shrink-0 ${
                    currentScreen === item.screen ? 'text-primary' : 'text-gray-500'
                  }`} 
                />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {currentScreen === item.screen && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={onLogout}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isCollapsed ? 'justify-center' : ''
              } text-red-600 hover:bg-red-50`}
            >
              <LogOut size={20} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Ask My Policy</h2>
                    <p className="text-sm text-gray-500">Smart Insurance</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.screen}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleItemClick(item.screen)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                    currentScreen === item.screen 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    size={20} 
                    className={`flex-shrink-0 ${
                      currentScreen === item.screen ? 'text-primary' : 'text-gray-500'
                    }`} 
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                  </div>
                  
                  {currentScreen === item.screen && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}