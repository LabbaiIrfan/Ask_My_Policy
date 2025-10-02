import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...rest }) => {
  const base = 'rounded-md font-medium inline-flex items-center justify-center';
  const sizeClasses = size === 'sm' ? 'px-3 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base';
  const styles = variant === 'primary'
    ? 'bg-orange-500 text-white hover:bg-orange-600'
    : variant === 'outline'
      ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
      : 'bg-transparent text-gray-700';

  return (
    <button className={`${base} ${sizeClasses} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
