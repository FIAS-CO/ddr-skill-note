import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 w-full sm:w-auto text-left py-2 sm:py-4">
            <Link to="/" className="text-white font-bold text-xl hover:text-gray-300">
              DDR Score Manager
            </Link>
          </div>

          {/* Menu */}
          <div className="flex-grow overflow-x-auto overflow-y-hidden w-full sm:w-auto">
            <ul className="flex space-x-4 justify-end min-w-max px-2 py-2 sm:py-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Top
                </Link>
              </li>
              <li>
                <Link to="/song-ranking" className="text-white hover:text-gray-300 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Song Ranking
                </Link>
              </li>
              {/* <li>
                <Link to="/support-us" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Support Us
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;