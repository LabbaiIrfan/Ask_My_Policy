import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'Please agree to terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Mock authentication - simulate API call delay
    setTimeout(() => {
      try {
        // Check for existing user in localStorage (mock database)
        const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
        
        if (isSignUp) {
          // Check if user already exists
          const userExists = existingUsers.find((user: any) => user.email === formData.email);
          
          if (userExists) {
            setErrors({ submit: 'User already exists with this email' });
            setIsLoading(false);
            return;
          }
          
          // Create new user
          const newUser = {
            id: `user_${Date.now()}`,
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password, // In real app, this would be hashed
            profileCompleted: false,
            profileData: {
              personal: {},
              financial: {},
              lifestyle: {},
              health: {},
              policyPreferences: {}
            },
            createdAt: new Date().toISOString()
          };
          
          // Save to mock database
          existingUsers.push(newUser);
          localStorage.setItem('mock_users', JSON.stringify(existingUsers));
          
          // Create mock session
          const session = {
            access_token: `token_${newUser.id}`,
            user: newUser,
            expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
          };
          localStorage.setItem('mock_session', JSON.stringify(session));
          
          const userData = {
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
            isNewUser: true,
            profileCompleted: false,
            profileData: null
          };
          
          onLogin(userData);
        } else {
          // Sign in existing user
          const user = existingUsers.find((u: any) => 
            u.email === formData.email && u.password === formData.password
          );
          
          if (!user) {
            setErrors({ submit: 'Invalid email or password' });
            setIsLoading(false);
            return;
          }
          
          // Create mock session
          const session = {
            access_token: `token_${user.id}`,
            user: user,
            expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
          };
          localStorage.setItem('mock_session', JSON.stringify(session));
          
          const userData = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            isNewUser: false,
            profileCompleted: user.profileCompleted || false,
            profileData: user.profileData || null
          };
          
          onLogin(userData);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error('Authentication error:', error);
        setErrors({ submit: 'Authentication failed. Please try again.' });
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay
  };

  const handleDemo = () => {
    setIsLoading(true);
    // create a quick demo session and call onLogin
    const demoUser = {
      id: `demo_user_${isSignUp ? 'new' : 'existing'}`,
      email: isSignUp ? 'demo-new@askmypolicy.local' : 'demo@askmypolicy.local',
      fullName: isSignUp ? 'Demo New User' : 'Demo User',
      // If demo is triggered while on Sign Up flow, treat as a new user who needs to complete profile
      isNewUser: !!isSignUp,
      profileCompleted: !!(!isSignUp),
      profileData: null
    } as any;

    const session = {
      access_token: `demo_token_${demoUser.id}`,
      user: demoUser,
      expires_at: Date.now() + (24 * 60 * 60 * 1000)
    };
    try {
      localStorage.setItem('mock_session', JSON.stringify(session));
    } catch (err) {
      // ignore storage errors
    }

    // small delay to show loading state
    setTimeout(() => {
      setIsLoading(false);
      // Pass demo user to onLogin; App will route to profile setup when profileCompleted is false
      onLogin(demoUser);
    }, 300);
  };

  const benefits = [
    'AI-powered insurance recommendations',
    'Compare policies from 50+ providers',
    'Smart claims management',
    'Personalized coverage insights',
    '24/7 expert support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">InsureAI Pro</h1>
                <p className="text-orange-100">Smart Insurance Solutions</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Your Perfect Insurance Match Awaits
            </h2>
            
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join thousands of smart consumers who trust our AI to find the best insurance coverage at unbeatable prices.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-orange-100">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-500 mt-2">
                {isSignUp 
                  ? 'Join InsureAI Pro for smarter insurance decisions'
                  : 'Sign in to your InsureAI Pro account'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`pl-10 h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                        I agree to the <span className="text-orange-600 hover:underline cursor-pointer">Terms of Service</span> and{' '}
                        <span className="text-orange-600 hover:underline cursor-pointer">Privacy Policy</span>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleDemo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  Try Demo
                </button>
              </div>

              {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-orange-600 hover:text-orange-500 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-center text-xs text-gray-500">
                <div className="flex items-center justify-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Trusted by 10M+</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}