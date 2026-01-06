import { motion } from 'framer-motion';
import {

    Shield,
    GitCompare,
    User,
    Menu,
    Store,
    Search
} from 'lucide-react';

interface BottomNavProps {
    currentScreen: string;
    onNavigate: (screen: string) => void;
    onOpenMenu: () => void;
    isLoggedIn: boolean;
}

export function BottomNav({
    currentScreen,
    onNavigate,
    onOpenMenu,
    isLoggedIn
}: BottomNavProps) {

    const navItems = [
        {
            id: 'home',
            label: 'Explore',
            icon: Search,
            screen: 'explore'
        },
        {
            id: 'policies',
            label: isLoggedIn ? 'My Policies' : 'Catalog',
            icon: isLoggedIn ? Shield : Store,
            screen: isLoggedIn ? 'policies' : 'catalog'
        },
        {
            id: 'compare',
            label: 'Compare',
            icon: GitCompare,
            screen: 'compare'
        },
        {
            id: 'profile',
            label: isLoggedIn ? 'Profile' : 'Sign In',
            icon: User,
            screen: isLoggedIn ? 'profile' : 'login'
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" />

            <div
                className="relative flex justify-around items-center px-2 py-2 pb-2"
                style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
            >
                {navItems.map((item) => {
                    const isActive = currentScreen === item.screen;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.screen)}
                            className="flex-1 flex flex-col items-center justify-center py-2 relative group"
                        >
                            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-orange-50' : 'group-hover:bg-gray-50'
                                }`}>
                                <item.icon
                                    size={24}
                                    className={`transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600'
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={`text-[10px] font-medium mt-1 transition-colors duration-300 leading-none ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`}>
                                {item.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-2 w-8 h-1 bg-orange-500 rounded-b-full"
                                />
                            )}
                        </button>
                    );
                })}

                {/* Menu Button - Always opens the main sidebar */}
                <button
                    onClick={onOpenMenu}
                    className="flex-1 flex flex-col items-center justify-center py-2 relative group"
                >
                    <div className="p-1.5 rounded-xl group-hover:bg-gray-50 transition-colors">
                        <Menu
                            size={24}
                            className="text-gray-400 group-hover:text-gray-600 transition-colors"
                            strokeWidth={2}
                        />
                    </div>
                    <span className="text-[10px] font-medium mt-1 text-gray-400 group-hover:text-gray-600 transition-colors leading-none">
                        Menu
                    </span>
                </button>
            </div>
        </div>
    );
}
