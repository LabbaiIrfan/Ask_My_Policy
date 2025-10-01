import { forwardRef } from 'react';
import { cn } from './ui/utils';

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  ({ children, fullWidth = false, size = 'md', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'gradient-orange rounded-xl shadow-soft touch-target',
          'text-white font-semibold transition-all duration-200',
          'active:animate-bounce-soft hover:shadow-premium hover:scale-105',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-3 focus:ring-orange-200/50 focus:ring-offset-2',
          // Size variants
          sizeClasses[size],
          // Width variant
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonPrimary.displayName = 'ButtonPrimary';