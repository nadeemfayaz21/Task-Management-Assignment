'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100';
  const widthStyles = fullWidth ? 'w-full' : '';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl disabled:from-blue-300 disabled:to-blue-300 disabled:cursor-not-allowed',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl disabled:from-red-300 disabled:to-red-300 disabled:cursor-not-allowed',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${widthStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
}
