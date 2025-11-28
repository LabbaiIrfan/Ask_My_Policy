import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  ChevronDown,
  Menu,
  Home,
  LogIn,
  Globe,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface ProfessionalHeaderProps {
  userName: string;
  onOpenMenu: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const indianLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृत' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' }
];

const notifications = [
  {
    id: 1,
    type: 'success',
    icon: CheckCircle,
    title: 'Policy Renewed Successfully',
    message: 'Your HealthGuard Premium policy has been renewed for next year.',
    time: '5 min ago',
    unread: true
  },
  {
    id: 2,
    type: 'info',
    icon: TrendingUp,
    title: 'New AI Recommendation Available',
    message: 'Based on your profile, we found 3 better policy options for you.',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'warning',
    icon: Calendar,
    title: 'Premium Due Reminder',
    message: 'Your MediSecure Plus premium is due in 5 days.',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 4,
    type: 'info',
    icon: Bell,
    title: 'Claim Status Updated',
    message: 'Your claim #CLM-2024-1234 has been approved.',
    time: '3 hours ago',
    unread: false
  },
  {
    id: 5,
    type: 'alert',
    icon: AlertCircle,
    title: 'Document Upload Required',
    message: 'Please upload medical reports for claim processing.',
    time: '1 day ago',
    unread: false
  }
];

export function ProfessionalHeader({ 
  userName, 
  onOpenMenu,
  onLogin,
  isLoggedIn = false,
  title = "Dashboard",
  breadcrumbs = []
}: ProfessionalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(indianLanguages[0]);
  const [notificationList, setNotificationList] = useState(notifications);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notificationList.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-50';
      case 'warning': return 'text-yellow-500 bg-yellow-50';
      case 'alert': return 'text-red-500 bg-red-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative z-10">
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center space-x-2 text-sm">
          <Home size={16} className="text-gray-400" />
          <span className="text-gray-400">/</span>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                {item.label}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="text-gray-400">/</span>
              )}
            </div>
          ))}
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{title}</span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search policies, recommendations, claims..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-300 focus:ring-orange-100"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Notification Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <Bell size={20} className="text-gray-600 group-hover:text-gray-900" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Notifications</h3>
                    <p className="text-orange-100 text-xs">{unreadCount} unread messages</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notificationList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Bell size={48} className="mb-3 opacity-30" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notificationList.map((notification, index) => {
                      const Icon = notification.icon;
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => markAsRead(notification.id)}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-orange-50/30' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">
                                  {notification.title}
                                  {notification.unread && (
                                    <span className="ml-2 inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                                  )}
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {notificationList.length > 0 && (
                  <div className="bg-gray-50 px-4 py-3 text-center">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Selector */}
        <div className="relative" ref={languageRef}>
          <button 
            onClick={() => setShowLanguages(!showLanguages)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors group flex items-center space-x-1"
          >
            <Globe size={20} className="text-gray-600 group-hover:text-gray-900" />
            <span className="hidden md:block text-xs text-gray-600 group-hover:text-gray-900">
              {selectedLanguage.code.toUpperCase()}
            </span>
          </button>

          <AnimatePresence>
            {showLanguages && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <Globe size={18} />
                    <span>Select Language</span>
                  </h3>
                  <p className="text-orange-100 text-xs">Choose your preferred language</p>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {indianLanguages.map((language, index) => (
                    <motion.button
                      key={language.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setShowLanguages(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center justify-between border-b border-gray-100 ${
                        selectedLanguage.code === language.code ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">{language.name}</div>
                        <div className="text-xs text-gray-500">{language.native}</div>
                      </div>
                      {selectedLanguage.code === language.code && (
                        <Check size={18} className="text-orange-600" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors group">
          <Settings size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>

        {isLoggedIn ? (
          <div className="relative group">
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User size={16} className="mr-3 text-gray-400" />
                  Profile Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings size={16} className="mr-3 text-gray-400" />
                  Account Settings
                </a>
                <hr className="my-2 border-gray-100" />
                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}