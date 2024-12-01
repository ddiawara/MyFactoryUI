import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover-lift relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:ring-2 hover:ring-violet-500 hover:ring-opacity-50',
    secondary: 'glass-card text-gray-700 hover:bg-white/90 hover:shadow-lg hover:ring-2 hover:ring-gray-200 hover:border-transparent',
    danger: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 hover:shadow-lg hover:ring-2 hover:ring-rose-500 hover:ring-opacity-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}>
      <div className="absolute inset-0 shimmer opacity-0 hover:opacity-10" />
      {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
      {children}
    </button>
  );
}