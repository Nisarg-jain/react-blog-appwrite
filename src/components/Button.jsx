import React from 'react';

/**
 * Universal Button Component
 * 
 * @param {React.ReactNode} children - The text or elements inside the button
 * @param {string} type - Button type ('button', 'submit', 'reset')
 * @param {string} bgColor - Tailwind background color class
 * @param {string} textColor - Tailwind text color class
 * @param {string} className - Additional custom Tailwind classes passed from parent
 * @param {object} props - Catch-all for any other props (onClick, disabled, etc.)
 */
export default function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}