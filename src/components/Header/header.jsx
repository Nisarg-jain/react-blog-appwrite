import React from 'react';
import { Logo, Container, LogoutBtn } from '../index'; // Capitalized component imports
import { Link, useNavigate } from 'react-router-dom';  // Capitalized Link
import { useSelector } from 'react-redux';

function Header() {
  // Access auth status from your Redux store
  const authStatus = useSelector((state) => state.auth.status); // or state.auth.isAuthenticated based on your slice
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus, // Shows only when user is logged out
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus, // Shows only when user is logged out
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,  // Shows only when user is logged in
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,  // Shows only when user is logged in
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto items-center">
            {/* Render navigation items based on active status */}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white hover:text-black font-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Show logout button if user is authenticated */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;