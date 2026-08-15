import React, { useEffect, useState } from 'react'
import Container from '../container/container.jsx'
import LogoutBtn from './logoutBtn'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold text-xs flex items-center gap-1 cursor-pointer"
      title="Toggle Theme"
      type="button"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-2 font-bold tracking-tight text-xl select-none">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
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
                <span className="flex items-center font-extrabold text-xl tracking-tight">
                  <span className="text-slate-900 dark:!text-white transition-colors duration-200">
                    Blog
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 ml-1">
                    Craft
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      location.pathname === item.slug
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            <li className="ml-1 pl-1">
              <ThemeToggle />
            </li>

            {authStatus && (
              <li className="ml-2 pl-2 border-l border-slate-300 dark:border-slate-700">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header