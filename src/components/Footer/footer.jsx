import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo'; 

function Footer() {
  return (
    <footer className="w-full py-10 bg-gray-900 border-t-2 border-t-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-6">
          
          {/* Company / Brand Column */}
          <div className="p-6 w-full md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} BlogCraft. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Support Column */}
          <div className="p-6 w-full md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="p-6 w-full md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                Quick Links
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/all-posts">
                    All Posts
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/add-post">
                    Add Post
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals Column */}
          <div className="p-6 w-full md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-gray-400 hover:text-white transition-colors" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;