import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  Menu,
  Home,
  LogIn,
  LogOut,
  X,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Search,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessionalHeaderProps {
  userName: string;
  onOpenMenu: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

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
  onLogout,
  isLoggedIn = false,
  title = "Dashboard",
  breadcrumbs = []
}: ProfessionalHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const [scrolled, setScrolled] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-white/50 backdrop-blur-sm border-b border-transparent'
        }`}
    >
      <div className="px-4 md:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between max-w-[1920px] mx-auto">

        {/* Left Section: Mobile Menu & Breadcrumbs */}
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onOpenMenu}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 active:bg-gray-200/80 transition-all duration-200 text-gray-700"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col justify-center">
            {/* Title - Always visible */}
            <motion.h1
              key={title}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl font-bold text-gray-900 leading-tight truncate max-w-[200px] md:max-w-md"
            >
              {title}
            </motion.h1>

            {/* Breadcrumbs - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-gray-500 mt-0.5">
              <Home size={12} className="text-gray-400" />
              <ChevronRight size={10} className="text-gray-300" />
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5 text-xs">
                  <span className="hover:text-primary cursor-pointer transition-colors">
                    {item.label}
                  </span>
                  {(index < breadcrumbs.length - 1 || title) && (
                    <ChevronRight size={10} className="text-gray-300" />
                  )}
                </div>
              ))}
              <span>{title}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center space-x-2 md:space-x-4 sm:flex-shrink-0">

          {/* Search - Desktop Only (Optional) */}
          <div className="hidden xl:flex items-center bg-gray-100/50 rounded-full px-4 py-2 border border-gray-200/50 focus-within:border-primary/50 focus-within:bg-white transition-all w-64">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder:text-gray-400 text-gray-700"
            />
          </div>

          {/* Notification Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200 group"
            >
              <Bell size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
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
                  className="absolute right-0 top-full mt-4 w-[340px] md:w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-premium border border-gray-100 z-50 overflow-hidden"
                >
                  <div className="bg-white/50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 font-semibold text-sm">Notifications</h3>
                      <p className="text-gray-500 text-xs">{unreadCount} unread messages</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors font-medium hover:scale-105 active:scale-95"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {notificationList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                          <Bell size={20} className="opacity-50" />
                        </div>
                        <p className="text-sm">No new notifications</p>
                      </div>
                    ) : (
                      notificationList.map((notification, index) => {
                        const Icon = notification.icon;
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => markAsRead(notification.id)}
                            className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-colors relative group ${notification.unread ? 'bg-orange-50/30' : ''}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-xl flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                                <Icon size={16} />
                              </div>
                              <div className="flex-1 min-w-0 pr-6">
                                <h4 className={`text-sm font-medium mb-1 ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-gray-500 mb-1 leading-relaxed">{notification.message}</p>
                                <p className="text-[10px] text-gray-400">{notification.time}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="absolute right-2 top-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            {notification.unread && (
                              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                            )}
                          </motion.div>
                        );
                      })
                    )}
                  </div>

                  {notificationList.length > 0 && (
                    <div className="bg-gray-50/50 px-4 py-3 text-center border-t border-gray-100">
                      <button className="text-xs text-primary hover:text-primary-dark font-semibold transition-colors">
                        View all activity
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

          {/* User Profile */}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 md:space-x-3 pl-1 pr-2 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
                  <span className="text-white text-xs md:text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    {userName.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">Member</div>
                </div>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180 duration-300" />
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right p-1.5">
                <div className="px-3 py-2 border-b border-gray-50 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Home size={16} className="mr-2 text-gray-400" />
                  Dashboard
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Bell size={16} className="mr-2 text-gray-400" />
                  Notifications
                </button>
                <div className="h-[1px] bg-gray-100 my-1" />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  <LogOut size={16} className="mr-2 text-red-500" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-black transition-all shadow-lg shadow-gray-200 hover:shadow-gray-400"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}