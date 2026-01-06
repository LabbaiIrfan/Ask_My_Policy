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
import { CompanyAnalysis } from './components/CompanyAnalysis';
import { PolicyDetailScreen } from './components/PolicyDetailScreen';
import { BranchLocatorScreen } from './components/BranchLocatorScreen';
import { BuyPolicyScreen } from './components/BuyPolicyScreen';

import { useAuth } from './utils/supabase/auth';
import { supabase } from './utils/supabase/info';

type AppState =
  | 'splash'
  | 'login'
  | 'profile-setup'
  | 'catalog'
  | 'explore'
  | 'policies'
  | 'compare'
  | 'claims'
  | 'profile'
  | 'glossary'
  | 'analysis'
  | 'policy-detail'
  | 'branch-locator'
  | 'buy-policy';

interface UserPreferences {
  profileCompleted: boolean;
  personalInfo: Record<string, any>;
  insuranceHistory: Record<string, any>;
  preferences: Record<string, any>;
}

interface UserData {
  id?: string;
  fullName: string;
  email: string;
  profileCompleted: boolean;
  profileData: any;
  isNewUser?: boolean;
  preferences: UserPreferences;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [previousState, setPreviousState] = useState<AppState>('catalog');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyPolicyData, setBuyPolicyData] = useState<any>(null);
  const [comparisonPolicies, setComparisonPolicies] = useState<string[]>([]);
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

  const { signOutUser } = useAuth();

  // ✅ Unified login handler with proper typing
  const handleLogin = (
    loginUserData: Partial<UserData> & {
      isNewUser?: boolean;
      profileCompleted?: boolean;
    }
  ) => {
    const normalized: UserData = {
      id: loginUserData.id,
      fullName: loginUserData.fullName || '',
      email: loginUserData.email || '',
      profileCompleted: !!loginUserData.profileCompleted,
      profileData: loginUserData.profileData || null,
      isNewUser: loginUserData.isNewUser,
      preferences: loginUserData.preferences || {
        profileCompleted: !!loginUserData.profileCompleted,
        personalInfo: {},
        insuranceHistory: {},
        preferences: {}
      }
    };

    setUserData(normalized);
    setIsLoggedIn(true);

    if (loginUserData.isNewUser || !normalized.profileCompleted) {
      setAppState('profile-setup');
    } else {
      setAppState('catalog');
    }
  };

  const handleProfileSetupComplete = (profileData: any) => {
    setUserData(prev => ({
      ...prev,
      profileCompleted: true,
      profileData,
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

  // ✅ First try Supabase session, then fallback to mock_session + mock_users
  const checkSession = async () => {
    try {
      // 1️⃣ Try Supabase session
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (data.session?.user) {
        const supaUser = data.session.user;
        const restoredUserData: UserData = {
          id: supaUser.id,
          email: supaUser.email || '',
          fullName:
            (supaUser.user_metadata as any)?.full_name ||
            (supaUser.user_metadata as any)?.name ||
            '',
          profileCompleted: false, // can be updated later from DB
          profileData: null,
          isNewUser: false,
          preferences: {
            profileCompleted: false,
            personalInfo: {},
            insuranceHistory: {},
            preferences: {}
          }
        };

        setUserData(restoredUserData);
        setIsLoggedIn(true);
        setAppState('catalog');
        return;
      }

      // 2️⃣ Fallback: old mock_session logic
      const session = JSON.parse(localStorage.getItem('mock_session') || '{}');

      if (!session.access_token || !session.user) {
        setAppState('catalog');
        setIsLoggedIn(false);
        return;
      }

      if (session.expires_at && Date.now() > session.expires_at) {
        localStorage.removeItem('mock_session');
        setAppState('catalog');
        setIsLoggedIn(false);
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const currentUser = existingUsers.find((user: any) => user.id === session.user.id);

      if (currentUser) {
        const restoredUserData: UserData = {
          id: currentUser.id,
          email: currentUser.email,
          fullName: currentUser.fullName,
          profileCompleted: currentUser.profileCompleted || false,
          profileData: currentUser.profileData || null,
          isNewUser: false,
          preferences: {
            profileCompleted: currentUser.profileCompleted || false,
            personalInfo: currentUser.personalInfo || {},
            insuranceHistory: currentUser.insuranceHistory || {},
            preferences: currentUser.preferences || {}
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
    setPreviousState(appState);
    setAppState(screen as AppState);
    setIsMobileSidebarOpen(false);
  };

  const navigateToDetail = () => {
    setPreviousState(appState);
    setAppState('policy-detail');
  };

  const navigateToBuyPolicy = (
    policyData: any,
    selectedAddOns: string[] = [],
    selectedRiders: string[] = []
  ) => {
    setBuyPolicyData({
      policyData,
      selectedAddOns,
      selectedRiders
    });
    setPreviousState(appState);
    setAppState('buy-policy');
  };

  const navigateToComparison = (policies: string[]) => {
    setComparisonPolicies(policies);
    setPreviousState(appState);
    setAppState('compare');
  };

  const quickBuyPolicy = (policy: any) => {
    let description = 'Comprehensive health insurance coverage';

    if (policy.features) {
      if (Array.isArray(policy.features)) {
        description = policy.features.join(', ');
      } else if (typeof policy.features === 'object') {
        const featureEntries = Object.entries(policy.features).slice(0, 3);
        description = featureEntries
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      }
    }

    const policyData = {
      name: policy.name,
      company: policy.company,
      coverAmount: policy.coverage,
      premium: policy.premium,
      rating: policy.rating,
      reviews: policy.reviews,
      description
    };

    navigateToBuyPolicy(policyData, [], []);
  };

  const handleLogout = async () => {
    try {
      // Supabase logout
      await signOutUser();
      // Demo logout cleanup
      localStorage.removeItem('mock_session');

      setIsLoggedIn(false);
      setAppState('catalog');
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
        return (
          <ExploreScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            userData={isLoggedIn ? userData : null}
            onNavigateToDetail={navigateToDetail}
            onBuyPolicy={quickBuyPolicy}
            onComparePolicies={navigateToComparison}
          />
        );
      case 'policies':
        return isLoggedIn ? (
          <MyPolicies
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
          />
        ) : (
          <PolicyCatalog
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            onNavigateToDetail={navigateToDetail}
            onBuyPolicy={quickBuyPolicy}
            onComparePolicies={navigateToComparison}
          />
        );
      case 'compare':
        return (
          <ComparisonScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            initialSelectedPolicies={comparisonPolicies}
          />
        );
      case 'claims':
        return (
          <ClaimsScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
          />
        );
      case 'profile':
        return isLoggedIn ? (
          <ProfileScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            userName={userData.fullName}
          />
        ) : (
          <PolicyCatalog
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            onNavigateToDetail={navigateToDetail}
            onBuyPolicy={quickBuyPolicy}
            onComparePolicies={navigateToComparison}
          />
        );
      case 'glossary':
        return (
          <GlossaryScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
          />
        );
      case 'analysis':
        return (
          <CompanyAnalysis
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
          />
        );
      case 'policy-detail':
        return (
          <PolicyDetailScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            onBack={() => setAppState(previousState)}
            onBuyPolicy={navigateToBuyPolicy}
          />
        );
      case 'branch-locator':
        return (
          <BranchLocatorScreen
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
          />
        );
      case 'buy-policy':
        return buyPolicyData ? (
          <BuyPolicyScreen
            onBack={() => setAppState(previousState)}
            policyData={buyPolicyData.policyData}
            selectedAddOns={buyPolicyData.selectedAddOns}
            selectedRiders={buyPolicyData.selectedRiders}
            userData={isLoggedIn ? userData : undefined}
          />
        ) : null;
      case 'catalog':
      default:
        return (
          <PolicyCatalog
            onOpenMenu={openMobileMenu}
            onToggleSidebar={toggleDesktopSidebar}
            onNavigateToDetail={navigateToDetail}
            onBuyPolicy={quickBuyPolicy}
            onComparePolicies={navigateToComparison}
          />
        );
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
      {appState !== 'splash' &&
        appState !== 'login' &&
        appState !== 'profile-setup' && (
          <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <ProfessionalSidebar
                isOpen={true}
                isCollapsed={isDesktopSidebarCollapsed}
                onClose={() => { }}
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
              <ProfessionalHeader
                userName={isLoggedIn ? userData.fullName : ''}
                isLoggedIn={isLoggedIn}
                onOpenMenu={() => setIsMobileSidebarOpen(true)}
                onLogin={() => setAppState('login')}
                onLogout={handleLogout}
                title={
                  appState === 'catalog'
                    ? 'Health Insurance Plans'
                    : appState === 'policies'
                      ? isLoggedIn
                        ? 'My Health Policies'
                        : 'Health Insurance Plans'
                      : appState === 'claims'
                        ? 'Health Claims'
                        : appState === 'explore'
                          ? 'Explore Health Plans'
                          : appState === 'compare'
                            ? 'Plan Comparison'
                            : appState === 'profile'
                              ? 'Health Profile'
                              : appState === 'glossary'
                                ? 'Insurance Glossary'
                                : appState === 'analysis'
                                  ? 'Company Analysis'
                                  : appState === 'policy-detail'
                                    ? 'Policy Details'
                                    : appState === 'branch-locator'
                                      ? 'Branch Locator'
                                      : appState === 'buy-policy'
                                        ? 'Complete Purchase'
                                        : 'Health Insurance Plans'
                }
                breadcrumbs={[{ label: 'HealthInsureAI' }]}
              />

              {/* Content */}
              <div className="flex-1 overflow-auto">{renderCurrentScreen()}</div>
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
