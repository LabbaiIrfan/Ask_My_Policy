  import React from 'react'; // ADDED: Explicit React import for hook usage
  import { motion, AnimatePresence } from 'framer-motion'; 
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
    MapPin
  } from 'lucide-react';

  // Define the interface for component props
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

  // Define custom Tailwind colors and styles for a professional look
  const tailwindStyles = `
    .glass-card {
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    .shadow-premium {
      box-shadow: 0 10px 20px rgba(255, 100, 50, 0.2), 0 3px 6px rgba(0, 0, 0, 0.05);
    }
    .shadow-soft {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }
    .gradient-orange {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
    }
    .text-sidebar-foreground { color: #1f2937; /* Dark Gray */ }
    .text-sidebar-primary { color: #f97316; /* Orange */ }
    .bg-sidebar-accent { background-color: #fff7ed; /* Very Light Orange */ }
    .text-sidebar-accent-foreground { color: #f97316; /* Orange */ }
    .border-sidebar-border { border-color: #f3f4f6; /* Light Gray */ }

    /* Apply Inter font globally */
    * {
      font-family: 'Inter', sans-serif;
    }
  `;

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
    
    // Menu items for guest users
    const guestMenuItems = [
      { 
        icon: Search, 
        label: 'Search & Filter', 
        screen: 'explore',
        description: 'Find plans that match your needs',
        available: true
      },
      { 
        icon: Store, 
        label: 'Browse Plans', 
        screen: 'catalog',
        description: 'Explore health insurance options',
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
        icon: MapPin, 
        label: 'Branch Locator', 
        screen: 'branch-locator',
        description: 'Find nearby branch offices',
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
      }
    ];

    // Menu items for logged-in members
    const memberMenuItems = [
      { 
        icon: Shield, 
        label: 'My Policies', 
        screen: 'policies',
        description: 'Your active health coverage',
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
        icon: Search, 
        label: 'Explore Plans', 
        screen: 'explore',
        description: 'AI-powered plan discovery',
        available: true
      },
      { 
        icon: Store, 
        label: 'Health Plans', 
        screen: 'catalog',
        description: 'Browse personalized recommendations',
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
        icon: MapPin, 
        label: 'Branch Locator', 
        screen: 'branch-locator',
        description: 'Find nearby branch offices',
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
      }
    ];

    const menuItems = isLoggedIn ? memberMenuItems : guestMenuItems;

    const handleItemClick = (screen: string) => {
      onNavigate(screen);
      // Close the sidebar on mobile after navigation
      if (!isDesktop) {
        onClose();
      }
    };

    // --- Desktop Sidebar Rendering ---
    if (isDesktop) {
      return (
        <>
          {/* Load custom styles */}
          <style>{tailwindStyles}</style>

          <div className={`transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'} glass-card border-r border-sidebar-border h-screen sticky top-0`}>
            <motion.div
              animate={{ width: isCollapsed ? 80 : 320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full flex flex-col"
            >
              {/* Header / Logo */}
              <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-3 overflow-hidden"
                      >
                        <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center shadow-premium">
                          <Heart className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">Ask My Policyyy</h2>
                          <p className="text-sm text-sidebar-foreground/70 whitespace-nowrap">Smart Health Insurance</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Collapse Button */}
                  <button
                    onClick={onToggle}
                    className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors flex-shrink-0"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 overflow-hidden"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sidebar-foreground truncate">Welcome back!</p>
                            <p className="text-sm text-sidebar-foreground/70 truncate">{userName}</p>
                          </div>
                          <Sparkles className="w-5 h-5 text-sidebar-primary flex-shrink-0" />
                        </div>
                      </motion.div>
                    )}
                    {isCollapsed && (
                      <div className="flex justify-center">
                        <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                ) : (
                  // Guest Login Prompt
                  <AnimatePresence initial={false}>
                    {!isCollapsed && onLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 overflow-hidden"
                      >
                        <div className="text-center">
                          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <p className="font-semibold text-gray-900 mb-2">Guest Mode</p>
                          <button
                            onClick={onLogin}
                            className="w-full bg-primary text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Sign In</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {isCollapsed && onLogin && (
                      <button
                        onClick={onLogin}
                        className="w-full flex justify-center py-2 px-1 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <LogIn size={20} />
                      </button>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.screen}
                    // Animations for staggered entry (only visible when uncollapsed)
                    initial={isCollapsed ? false : { opacity: 0, x: -20 }}
                    animate={isCollapsed ? false : { opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item.screen)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative ${
                      currentScreen === item.screen 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-soft' 
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    } ${isCollapsed ? 'justify-center py-3' : ''}`}
                  >
                    <item.icon 
                      size={22} 
                      className={`flex-shrink-0 transition-colors ${
                        currentScreen === item.screen ? 'text-sidebar-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-primary'
                      }`} 
                    />
                    
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 text-left overflow-hidden whitespace-nowrap"
                        >
                          <div className="font-semibold truncate">{item.label}</div>
                          <div className="text-xs text-sidebar-foreground/60 mt-1 truncate">{item.description}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {currentScreen === item.screen && (
                      // Active indicator (only visible when not collapsed to save space)
                      <motion.div
                        layoutId="desktopActiveIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-full"
                      />
                    )}

                    {!isCollapsed && (
                      <ChevronRight 
                        className={`w-4 h-4 text-sidebar-foreground/50 transition-all duration-300 ${
                          currentScreen === item.screen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`} 
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Footer / Sign Out */}
              <div className="p-4 border-t border-sidebar-border">
                {isLoggedIn ? (
                  <button
                    onClick={onLogout}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                      isCollapsed ? 'justify-center' : ''
                    } text-red-600 hover:bg-red-50`}
                  >
                    <LogOut size={20} />
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-semibold whitespace-nowrap overflow-hidden"
                        >
                          Sign Out
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center text-xs text-sidebar-foreground/60 overflow-hidden"
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
        </>
      );
    }

    // --- Mobile Sidebar Rendering ---
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Load custom styles */}
            <style>{tailwindStyles}</style>
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }} // Use -100% for full exit
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 glass-card z-50 flex flex-col shadow-premium"
            >
              {/* Header */}
              <div className="p-6 border-b border-sidebar-border flex-shrink-0">
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
                    aria-label="Close sidebar"
                  >
                    <X size={20} className="text-sidebar-foreground/70" />
                  </button>
                </div>
              </div>

              {/* User Status (Mobile) */}
              <div className="p-6 border-b border-sidebar-border flex-shrink-0">
                {isLoggedIn ? (
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 gradient-orange rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sidebar-foreground truncate">Welcome back!</p>
                        <p className="text-sm text-sidebar-foreground/70 truncate">{userName}</p>
                      </div>
                      <Sparkles className="w-6 h-6 text-sidebar-primary flex-shrink-0" />
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

              {/* Navigation (Mobile) */}
              <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.screen}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleItemClick(item.screen)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group text-left ${
                      currentScreen === item.screen 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-soft' 
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
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
                    <div className="flex-1">
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm opacity-70">{item.description}</p>
                    </div>
                    {currentScreen === item.screen && (
                      <ChevronRight className="w-5 h-5 text-sidebar-primary flex-shrink-0" />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Auth Section (Mobile Footer) */}
              <div className="p-6 border-t border-sidebar-border flex-shrink-0">
                {isLoggedIn ? (
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-semibold justify-center"
                  >
                    <LogOut className="w-6 h-6" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  // Sign In button is already visible in the User Status section for guests,
                  // so we just show the footer text here.
                  <div className="mt-4 text-center text-xs text-sidebar-foreground/60">
                    <p>© 2025 Ask My Policy</p>
                    <p>Secure • Trusted • AI-Powered</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Add an external stylesheet for the Inter font and custom scrollbar
  // Note: In a real environment, you'd link this in index.html
  /*
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  */

  // Minimal component to run the Sidebar, simulating app state
  export default function App() {
    const [currentScreen, setCurrentScreen] = React.useState('policies');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const userName = "Alice Johnson";

    // State to track desktop size
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

    React.useEffect(() => {
      const handleResize = () => {
        const isCurrentlyDesktop = window.innerWidth >= 1024;
        setIsDesktop(isCurrentlyDesktop);
        // If resizing to mobile, ensure the sidebar is controlled by the mobile state
        if (!isCurrentlyDesktop) {
          setIsDesktopCollapsed(false);
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentScreen('explore'); // Navigate to a public screen
    };

    const handleLogin = () => {
      setIsLoggedIn(true);
      setCurrentScreen('policies'); // Navigate to a member screen
      if (!isDesktop) setIsSidebarOpen(false); // Close mobile sidebar on login
    };

    const handleToggleCollapse = () => {
      setIsDesktopCollapsed(prev => !prev);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar - Desktop View */}
        {isDesktop && (
          <ProfessionalSidebar
            isOpen={true} // Always mounted on desktop
            onClose={() => {}} 
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
            onLogin={handleLogin}
            currentScreen={currentScreen}
            isDesktop={true}
            isCollapsed={isDesktopCollapsed}
            onToggle={handleToggleCollapse}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 p-8 transition-all duration-300 ${isDesktop && isDesktopCollapsed ? 'lg:ml-20' : 'lg:ml-0'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Mobile Header (Shows the menu button) */}
            {!isDesktop && (
              <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-soft">
                <h1 className="text-2xl font-bold text-gray-800">Ask My Policy</h1>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-3 bg-primary text-white rounded-xl shadow-soft hover:bg-primary/90"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h1 className="text-4xl font-extrabold text-sidebar-primary mb-4">
                Welcome{isLoggedIn ? `, ${userName.split(' ')[0]}` : ', Guest'}!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                You are currently viewing the: <span className="font-mono text-blue-600 px-2 py-1 bg-blue-50 rounded-lg">{currentScreen}</span> screen.
              </p>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Screen Details</h2>
                <p className="mb-2"><strong>Authentication Status:</strong> {isLoggedIn ? 'Logged In' : 'Guest'}</p>
                <p><strong>Sidebar Mode:</strong> {isDesktop ? `Desktop (${isDesktopCollapsed ? 'Collapsed' : 'Expanded'})` : 'Mobile'}</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Simulated Actions</h3>
                {!isLoggedIn ? (
                  <button
                    onClick={handleLogin}
                    className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-soft"
                  >
                    Simulate Sign In
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-soft"
                  >
                    Simulate Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
        
        {/* Sidebar - Mobile Overlay View */}
        {!isDesktop && (
          <ProfessionalSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
            onLogin={handleLogin}
            currentScreen={currentScreen}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        )}
      </div>
    );
  }
