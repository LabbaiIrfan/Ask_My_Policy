import { forwardRef } from 'react';
import { cn } from '../ui/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white border border-border shadow-soft',
      glass: 'glass-card',
      elevated: 'bg-white shadow-lg border-0'
    };

    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200',
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';