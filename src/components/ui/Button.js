import React from 'react';
import { Loader } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6'
  };

  const buttonClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    className
  ].join(' ');

  const iconClass = iconSizes[size];
  const spacing = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader className={`${iconClass} animate-spin ${children ? 'mr-2' : ''}`} />
      ) : (
        Icon && iconPosition === 'left' && (
          <Icon className={`${iconClass} ${spacing}`} />
        )
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`${iconClass} ${spacing}`} />
      )}
    </button>
  );
};

export default Button;
