import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Blue Icon Box */}
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      </div>

      {/* Brand Text */}
      <span className="font-extrabold text-xl tracking-tight">
        <span style={{ color: 'var(--logo-color, currentColor)' }} className="text-slate-900 dark:text-white">
          Blog
        </span>
        <span style={{ color: '#38bdf8' }} className="ml-1">
          Craft
        </span>
      </span>
    </div>
  )
}

export default Logo