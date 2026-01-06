import { LoginBanner } from './LoginBanner';
import { LoginForm } from './LoginForm';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex">
      {/* Left side (benefits) */}
      <LoginBanner />

      {/* Right side (form) */}
      <LoginForm onLogin={onLogin} onForgotPassword={onForgotPassword} />
    </div>
  );
}
