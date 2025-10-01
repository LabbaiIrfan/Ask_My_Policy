import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { ProfessionalHeader } from './components/Header';
import { ProfessionalSidebar } from './components/SideBar';
import { PolicyCatalog } from './components/PolicyCatalog';
import { AIRecommendations } from './components/AIRecommendations';
import { MyPolicies } from './components/MyPolicies';
import { ComparisonScreen } from './components/ComparisonScreen';
import { ClaimsScreen } from './components/ClaimsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FloatingChatButton } from './components/FloatingChatButton';

type AppState = 'splash' | 'login' | 'catalog' | 'recommendations' | 'policies' | 'compare' | 'claims' | 'profile';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [userName] = useState('Arjun');

  const handleNavigate = (screen: string) => {
    setAppState(screen as AppState);
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    setAppState('login');
    setIsMobileSidebarOpen(false);
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
      case 'recommendations':
        return <AIRecommendations onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'policies':
        return <MyPolicies onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'compare':
        return <ComparisonScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'claims':
        return <ClaimsScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
      case 'profile':
        return <ProfileScreen onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} userName={userName} />;
      case 'catalog':
      default:
        return <PolicyCatalog onOpenMenu={openMobileMenu} onToggleSidebar={toggleDesktopSidebar} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Splash Screen */}
      {appState === 'splash' && (
        <SplashScreen onComplete={() => setAppState('login')} />
      )}

      {/* Login Screen */}
      {appState === 'login' && (
        <LoginScreen 
          onLogin={() => setAppState('catalog')}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {/* Main App */}
      {appState !== 'splash' && appState !== 'login' && (
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
              currentScreen={appState}
              isDesktop={true}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header - Show on all pages */}
            <ProfessionalHeader
              userName={userName}
              onOpenMenu={() => setIsMobileSidebarOpen(true)}
              title={
                appState === 'catalog' ? 'Policy Catalog' :
                appState === 'policies' ? 'My Policies' :
                appState === 'claims' ? 'Claims' :
                appState === 'recommendations' ? 'AI Recommendations' :
                appState === 'compare' ? 'Policy Comparison' :
                appState === 'profile' ? 'Profile' :
                'Policy Catalog'
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
            currentScreen={appState}
            isDesktop={false}
          />

          {/* Floating Chat Button */}
          <FloatingChatButton />
        </div>
      )}
    </div>
  );
}