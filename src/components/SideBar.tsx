import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield,
  LogOut,
  LogIn,
  X,
  ChevronLeft,
  AlertTriangle,
  User,
  Search,
  GitCompare,
  Store,
  Heart,
  Sparkles,
  ChevronRight,
  BookOpen,
  BarChart3,
  MapPin // Added MapPin icon
} from 'lucide-react';

interface ProfessionalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onLogin?: () => void;
  currentScreen: string;
  isDesktop?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function ProfessionalSidebar({ 
  isOpen,
  onClose,
  onNavigate,
  onLogout,
  onLogin,
  currentScreen,
  isLoggedIn = false,
  isDesktop = false,
  isCollapsed = false,
  onToggle,
  userName = ''
}: ProfessionalSidebarProps) {
  
  const guestMenuItems = [
    { 
      icon: Store, 
      label: 'Browse Plans', 
      screen: 'catalog',
      description: 'Explore health insurance options',
      available: true
    },
    { 
      icon: Search, 
      label: 'Search & Filter', 
      screen: 'explore',
      description: 'Find plans that match your needs',
      available: true
    },
    { 
      icon: GitCompare, 
      label: 'Compare Plans', 
      screen: 'compare',
      description: 'Side-by-side plan comparison',
      available: true
    },
    { 
      icon: AlertTriangle, 
      label: 'Claims Guide', 
      screen: 'claims',
      description: 'Learn about the claims process',
      available: true
    },
    { 
      icon: BookOpen, 
      label: 'Insurance Terms', 
      screen: 'glossary',
      description: 'Understand insurance terminology',
      available: true
    },
    { 
      icon: BarChart3, 
      label: 'Company Analysis', 
      screen: 'analysis',
      description: 'Compare company metrics',
      available: true
    },
    { 
      icon: MapPin, // New Item
      label: 'Branch Locator', // New Item
      screen: 'branch-locator', // New Item
      description: 'Find nearby branch offices', // New Item
      available: true // New Item
    }
  ];

  const memberMenuItems = [
    { 
      icon: Store, 
      label: 'Health Plans', 
      screen: 'catalog',
      description: 'Browse personalized recommendations',
      available: true
    },
    { 
      icon: Shield, 
      label: 'My Policies', 
      screen: 'policies',
      description: 'Your active health coverage',
      available: true
    },
    { 
      icon: Search, 
      label: 'Explore Plans', 
      screen: 'explore',
      description: 'AI-powered plan discovery',
      available: true
    },
    { 
      icon: GitCompare, 
      label: 'Compare Plans', 
      screen: 'compare',
      description: 'Detailed plan comparison',
      available: true
    },
    { 
      icon: AlertTriangle, 
      label: 'Claims Center', 
      screen: 'claims',
      description: 'Manage your health claims',
      available: true
    },
    { 
      icon: User, 
      label: 'Health Profile', 
      screen: 'profile',
      description: 'Personal health & preferences',
      available: true
    },
    { 
      icon: BookOpen, 
      label: 'Insurance Terms', 
      screen: 'glossary',
      description: 'Understand insurance terminology',
      available: true
    },
    { 
      icon: BarChart3, 
      label: 'Company Analysis', 
      screen: 'analysis',
      description: 'Compare company metrics',
      available: true
    },
    { 
      icon: MapPin, // New Item
      label: 'Branch Locator', // New Item
      screen: 'branch-locator', // New Item
      description: 'Find nearby branch offices', // New Item
      available: true // New Item
    }
  ];

  const menuItems = isLoggedIn ? memberMenuItems : guestMenuItems;

  const handleItemClick = (screen: string) => {
    onNavigate(screen);
    if (!isDesktop) {
      onClose();
    }
  };

  // Desktop Sidebar
  if (isDesktop) {
    return (
      <div className={`transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'} glass-card border-r border-sidebar-border`}>
        <motion.div
          animate={{ width: isCollapsed ? 80 : 320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center shadow-premium">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-sidebar-foreground">Ask My Policy</h2>
                      <p className="text-sm text-sidebar-foreground/70">Smart Health Insurance</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={onToggle}
                className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors"
              >
                <ChevronLeft 
                  size={20} 
                  className={`text-sidebar-foreground/70 transition-transform duration-300 ${
                    isCollapsed ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            </div>
          </div>

          {/* User Status */}
          <div className="p-4 border-b border-sidebar-border">
            {isLoggedIn ? (
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sidebar-foreground">Welcome back!</p>
                        <p className="text-sm text-sidebar-foreground/70">{userName}</p>
                      </div>
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
                  >
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <p className="font-semibold text-gray-900 mb-2">Guest Mode</p>
                      <p className="text-sm text-gray-600 mb-3">Sign in for personalized recommendations</p>
                      <button
                        onClick={onLogin}
                        className="w-full bg-primary text-white py-2 px-4 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.screen}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleItemClick(item.screen)}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative ${
                  currentScreen === item.screen 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-soft' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon 
                  size={22} 
                  className={`flex-shrink-0 transition-colors ${
                    currentScreen === item.screen ? 'text-sidebar-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-primary'
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
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-sidebar-foreground/60 mt-1">{item.description}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {currentScreen === item.screen && (
                  <motion.div
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-full"
                  />
                )}

                {!isCollapsed && (
                  <ChevronRight 
                    className={`w-4 h-4 transition-all duration-300 ${
                      currentScreen === item.screen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} 
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
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
                      className="font-semibold"
                    >
                      Sign Out
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ) : (
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center text-xs text-sidebar-foreground/60"
                  >
                    <p>© 2024 Ask My Policy</p>
                    <p>Secure • Trusted • AI-Powered</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Mobile Sidebar
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 glass-card z-50 flex flex-col shadow-premium"
          >
            {/* Header */}
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center shadow-premium">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sidebar-foreground">Ask My Policy</h2>
                    <p className="text-sm text-sidebar-foreground/70">Smart Health Insurance</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors"
                >
                  <X size={20} className="text-sidebar-foreground/70" />
                </button>
              </div>
            </div>

            {/* User Status */}
            <div className="p-6 border-b border-sidebar-border">
              {isLoggedIn ? (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 gradient-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sidebar-foreground">Welcome back!</p>
                      <p className="text-sm text-sidebar-foreground/70">{userName}</p>
                    </div>
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Guest Mode</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore plans and learn about health insurance. Sign in for personalized AI recommendations.
                    </p>
                    <button
                      onClick={onLogin}
                      className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 shadow-soft"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In to Get Started</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.screen}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => handleItemClick(item.screen)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group ${
                    currentScreen === item.screen 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-soft' 
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    currentScreen === item.screen 
                      ? 'bg-sidebar-primary/20' 
                      : 'bg-sidebar-foreground/5 group-hover:bg-sidebar-primary/10'
                  }`}>
                    <item.icon 
                      size={20} 
                      className={`transition-colors ${
                        currentScreen === item.screen ? 'text-sidebar-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-primary'
                      }`} 
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm opacity-70">{item.description}</p>
                  </div>
                  {currentScreen === item.screen && (
                    <ChevronRight className="w-5 h-5 text-sidebar-primary" />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="p-6 border-t border-sidebar-border">
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-semibold"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  className="w-full flex items-center space-x-3 px-4 py-4 bg-primary text-white rounded-2xl hover:shadow-premium transition-all duration-300 font-semibold shadow-soft"
                >
                  <LogIn className="w-6 h-6" />
                  <span>Sign In to Your Account</span>
                </button>
              )}
              <div className="mt-4 text-center text-xs text-sidebar-foreground/60">
                <p>© 2025 Ask My Policy</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}