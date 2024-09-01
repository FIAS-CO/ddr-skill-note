import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">DDR Score Manager</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Top</Link>
          </li>
          <li>
            <Link to="/personal-skill" className="text-white hover:text-gray-300">Song Ranking</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;