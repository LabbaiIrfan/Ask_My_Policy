import { useState } from 'react';
import { motion } from 'motion/react';
import { ButtonPrimary } from './ButtonPrimary';
import { InputField } from './InputField';
import { Card } from './Card';
import { Mail, Lock, Zap, Shield, Star, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleQuickLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-orange-vertical"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute top-1/3 right-8 w-16 h-16 bg-pink-400/20 rounded-full blur-md"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <div className="w-20 h-20 mx-auto mb-4 gradient-orange rounded-3xl flex items-center justify-center shadow-2xl">
                <Shield size={40} className="text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-orange-600" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ask My Policy</h1>
            <p className="text-white/80 text-lg">Your intelligent insurance companion</p>
          </motion.div>

          {/* Quick Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <Card variant="glass" className="p-6 border-white/20 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Zap size={20} />
                  <span className="font-semibold">Quick Demo Access</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Experience the full power of AI-driven insurance
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleQuickLogin}
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Zap size={20} />
                      <span>Enter Demo Dashboard</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </Card>
          </motion.div>

          {/* Main Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card variant="glass" className="p-8 border-white/20 shadow-2xl">
              {/* Header */}
              <div className="text-center space-y-3 mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground">
                  Sign in to your premium account
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={20} />}
                  error={emailError}
                />

                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={20} />}
                  error={passwordError}
                />

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <ButtonPrimary
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="h-14 text-lg"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In Securely'}
                  </ButtonPrimary>
                </motion.div>
              </div>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-6 text-muted-foreground font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center h-14 bg-white/90 border border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center h-14 bg-white/90 border border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5Z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Footer */}
              <div className="text-center mt-8">
                <button
                  onClick={onForgotPassword}
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium underline decoration-2 underline-offset-4"
                >
                  Forgot Password?
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center space-x-6 text-white/70">
              <div className="flex items-center space-x-1">
                <Shield size={16} />
                <span className="text-sm">Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star size={16} />
                <span className="text-sm">5-Star Rated</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}