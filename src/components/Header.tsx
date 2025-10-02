import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  ChevronDown,
  Menu,
  Home,
  LogIn
} from 'lucide-react';
import { Input } from './ui/input';

interface ProfessionalHeaderProps {
  userName: string;
  onOpenMenu: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function ProfessionalHeader({ 
  userName, 
  onOpenMenu,
  onLogin,
  isLoggedIn = false,
  title = "Dashboard",
  breadcrumbs = []
}: ProfessionalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group">
          <Bell size={20} className="text-gray-600 group-hover:text-gray-900" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

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