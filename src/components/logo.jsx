import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-blue-600">
      <svg
        className="w-7 h-7 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <span className="text-slate-900 font-extrabold">
        Blog<span className="text-blue-600">Craft</span>
      </span>
    </div>
  )
}

export default Logo