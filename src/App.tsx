import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { ProfessionalHeader } from './components/Header';
import { ProfessionalSidebar } from './components/SideBar';
import { PolicyCatalog } from './components/PolicyCatalog';
import { ExploreScreen } from './components/ExploreScreen';
import { MyPolicies } from './components/MyPolicies';
import { ComparisonScreen } from './components/ComparisonScreen';
import { ClaimsScreen } from './components/ClaimsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProfileSetup } from './components/ProfileSetup';
import { FloatingChatButton } from './components/FloatingChatButton';
import { GlossaryScreen } from './components/GlossaryScreen';

type AppState = 'splash' | 'login' | 'profile-setup' | 'catalog' | 'explore' | 'policies' | 'compare' | 'claims' | 'profile' | 'glossary';

interface UserData {
  id?: string;
  fullName: string;
  email: string;
  profileCompleted: boolean;
  profileData: any;
  isNewUser?: boolean;
  preferences: {
    profileCompleted: boolean;
    personalInfo: Record<string, any>;
    insuranceHistory: Record<string, any>;
    preferences: Record<string, any>;
  };
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    profileCompleted: false,
    profileData: null,
    preferences: {
      profileCompleted: false,
      personalInfo: {},
      insuranceHistory: {},
      preferences: {}
    }
  });

  const handleLogin = (loginUserData: Partial<UserData> & { isNewUser?: boolean; profileCompleted?: boolean }) => {
    const normalized = {
      fullName: loginUserData.fullName || '',
      email: loginUserData.email || '',
      id: (loginUserData as any).id,
      profileCompleted: !!loginUserData.profileCompleted,
      profileData: (loginUserData as any).profileData || null,
      preferences: (loginUserData as any).preferences || userData.preferences
    } as UserData;

    setUserData(normalized);
    setIsLoggedIn(true);

    // If this is a new user or profile not completed, force profile setup
    if ((loginUserData as any).isNewUser || !normalized.profileCompleted) {
      setAppState('profile-setup');
    } else {
      setAppState('catalog');
    }
  };

  const handleProfileSetupComplete = (profileData: any) => {
    setUserData(prev => ({
      ...prev,
      profileCompleted: true,
      profileData: profileData,
      preferences: {
        ...prev.preferences,
        profileCompleted: true
      }
    }));
    setAppState('catalog');
  };

  const handleProfileSetupSkip = () => {
    setAppState('catalog');
  };

  const checkSession = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('mock_session') || '{}');
      
      if (!session.access_token || !session.user) {
        setAppState('catalog'); // Go to main app interface
        setIsLoggedIn(false);
        return;
      }

      // Check if session is expired
      if (session.expires_at && Date.now() > session.expires_at) {
        localStorage.removeItem('mock_session');
        setAppState('catalog');
        setIsLoggedIn(false);
        return;
      }

      // Get updated user data from mock database
      const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const currentUser = existingUsers.find((user: any) => user.id === session.user.id);
      
      if (currentUser) {
        const restoredUserData: UserData = {
          id: currentUser.id,
          email: currentUser.email,
          fullName: currentUser.fullName,
          isNewUser: false,
          profileCompleted: currentUser.profileCompleted || false,
          profileData: currentUser.profileData || null,
          preferences: currentUser.preferences || {
            profileCompleted: currentUser.profileCompleted || false,
            personalInfo: {},
            insuranceHistory: {},
            preferences: {}
          }
        };

        setUserData(restoredUserData);
        setIsLoggedIn(true);
        
        if (!restoredUserData.profileCompleted) {
          setAppState('profile-setup');
        } else {
          setAppState('catalog');
        }
      } else {
        localStorage.removeItem('mock_session');
        setAppState('catalog');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem('mock_session');
      setAppState('catalog');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (appState === 'splash') {
        checkSession();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [appState]);

  const handleNavigate = (screen: string) => {
    setAppState(screen as AppState);
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Clear mock session
      localStorage.removeItem('mock_session');
      
      setIsLoggedIn(false);
      setAppState('catalog'); // Stay in main app interface
      setIsMobileSidebarOpen(false);
      setUserData({
        fullName: '',
        email: '',
        profileCompleted: false,
        profileData: null,
        preferences: {
          profileCompleted: false,
          personalInfo: {},
          insuranceHistory: {},
          preferences: {}
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const renderCurrentScreen = () => {
    const openMobileMenu = () => setIsMobileSidebarOpen(true);
    
    switch (appState) {
      case 'explore':
        return <ExploreScreen />;
      case 'policies':
        return isLoggedIn ? <MyPolicies onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} /> : <PolicyCatalog onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'compare':
        return <ComparisonScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'claims':
        return <ClaimsScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'profile':
        return isLoggedIn ? <ProfileScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} userName={userData.fullName} /> : <PolicyCatalog onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'glossary':
        return <GlossaryScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'catalog':
      default:
        return <PolicyCatalog onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Splash Screen */}
      {appState === 'splash' && (
        <SplashScreen onComplete={() => setAppState('catalog')} />
      )}

      {/* Login Screen */}
      {appState === 'login' && (
        <LoginScreen 
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {/* Profile Setup */}
      {appState === 'profile-setup' && (
        <ProfileSetup 
          userData={userData}
          onComplete={handleProfileSetupComplete}
          onSkip={handleProfileSetupSkip}
        />
      )}

      {/* Main App */}
      {appState !== 'splash' && appState !== 'login' && appState !== 'profile-setup' && (
        <div className="flex h-screen bg-gray-50">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <ProfessionalSidebar
              isOpen={true}
              isCollapsed={isDesktopSidebarCollapsed}
              onClose={() => {}}
              onToggle={toggleDesktopSidebar}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              onLogin={() => setAppState('login')}
              currentScreen={appState}
              isDesktop={true}
              isLoggedIn={isLoggedIn}
              userName={userData.fullName}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header - Show on all pages */}
            <ProfessionalHeader
              userName={isLoggedIn ? userData.fullName : ''}
              isLoggedIn={isLoggedIn}
              onOpenMenu={() => setIsMobileSidebarOpen(true)}
              onLogin={() => setAppState('login')}
              title={
                appState === 'catalog' ? 'Health Insurance Plans' :
                appState === 'policies' ? (isLoggedIn ? 'My Health Policies' : 'Health Insurance Plans') :
                appState === 'claims' ? 'Health Claims' :
                appState === 'explore' ? 'Explore Health Plans' :
                appState === 'compare' ? 'Plan Comparison' :
                appState === 'profile' ? 'Health Profile' :
                appState === 'glossary' ? 'Insurance Glossary' :
                'Health Insurance Plans'
              }
              breadcrumbs={[
                { label: 'Ask My Policy' }
              ]}
            />

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {renderCurrentScreen()}
            </div>
          </div>

          {/* Mobile Sidebar */}
          <ProfessionalSidebar
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onLogin={() => setAppState('login')}
            currentScreen={appState}
            isDesktop={false}
            isLoggedIn={isLoggedIn}
            userName={userData.fullName}
          />

          {/* Floating Chat Button */}
          <FloatingChatButton />
        </div>
      )}
    </div>
  );
}