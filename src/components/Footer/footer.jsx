import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo.jsx'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  &copy; 2026 BlogCraft. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Support
              </h3>
              <ul className="space-y-3">
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'All Posts', 'Add Post'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Legals
              </h3>
              <ul className="space-y-3">
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer